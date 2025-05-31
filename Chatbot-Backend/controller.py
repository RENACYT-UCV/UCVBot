import json
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import admin.admin_service as admin_service
import chat.chat_service as chat_service
import level.level_service as level_service
import message.message_service as message_service
import student.student_service as student_service
from ia.chatbot import process_message
import os
from Lista import lista_usuarios

app = Flask(__name__)
cors = CORS(
    app,
    origins=["http://localhost:4200", "http://localhost:5200"],
    supports_credentials=True,
)


@app.route("/chats", methods=["POST"])
def saveChatAndMessage():
    """Endpoint para chatear con el bot"""
    item = request.get_json()  # Obtener el item del cuerpo de la solicitud
    if item:
        print("Este es el message del frontend", item["statement"])
        statement = item["statement"]
        role = item["role"]
        unixTime = item["unixTime"]
        userUID = item["student"]["userUID"]

        print("Este es el user UID: ", userUID)

        response, chatTitle = process_message(statement)

        # Obtener el estudiante completo del backend Java
        student_response = student_service.getStudentByUserUID(userUID)
        if student_response.status_code == 200:
            student = student_response.json()
        else:
            return jsonify({"error": "No se pudo obtener el estudiante"}), 500

        chat = {"title": chatTitle, "student": student}

        message = {
            "statement": statement,
            "role": role,
            "unixTime": unixTime,
            "student": {"userUID": userUID},
        }

        # Crea un nuevo chat
        savedChat = chat_service.saveChat(chat=chat).json()
        print("se guardó el chat")
        # Se obtiene el id del chat creado
        idChat = savedChat.get("id") or savedChat.get("v_id")
        if not idChat:
            return jsonify({"error": "No se pudo obtener el id del chat"}), 500
        # Añade un nuevo mensaje del usuario al chat según el id del chat
        message_service.saveMessage(message=message, idChat=idChat)
        print("se guardó el mensaje del user-> saveChatAndMessage()")

        # Construye un message del bot
        bot_message = {
            "statement": "",
            "role": "bot",
            "unixTime": message_service.getCurrentTimeInMilis(),
            "student": {"userUID": userUID},
        }

        # Cuando el mensaje es un ejercicio
        if "statement" in response:
            bot_message["statement"] = response["statement"]
            bot_message["alternatives"] = response["alternatives"]
            bot_message["answer"] = response["answer"]
            bot_message["answered"] = False
        else:
            bot_message["statement"] = response

        # Añade un nuevo mensaje del bot al chat según el id del chat
        botMessage = message_service.saveMessage(
            message=bot_message, idChat=idChat
        ).json()

        # Luego de guardar el mensaje, añade el idChat para mandarlo al cliente
        message["idChat"] = idChat
        message["chatTitle"] = chatTitle
        message["student"]["userUID"] = userUID

        # Manda el id del mensaje solo cuando son ejercicios
        if "statement" in response:
            message["id"] = botMessage["id"]
            message["alternatives"] = response["alternatives"]
            message["answer"] = response["answer"]
            message["answered"] = False

        print("se guardó el mensaje del bot-> saveChatAndMessage()")

        return jsonify(message), 200
    else:
        return jsonify({"error": "Request body must be JSON"}), 400


@app.route("/messages/chat/<int:id>", methods=["POST"])
def addMessage(id):
    """Endpoint para chatear con el bot"""
    item = request.get_json()  # Obtener el item del cuerpo de la solicitud
    if item:
        print("Este es el message del frontend", item["statement"])
        statement = item["statement"]
        role = item["role"]
        unixTime = item["unixTime"]
        response, chatTitle = process_message(statement)

        message = {"statement": statement, "role": role, "unixTime": unixTime}

        # Añade un nuevo mensaje del usuario al chat según su id
        message_service.saveMessage(message=message, idChat=id)

        print("se guardó el mensaje del user-> saveMessage()")

        # Construye un message del bot
        message["role"] = "bot"
        message["unixTime"] = message_service.getCurrentTimeInMilis()

        # Cuando el mensaje es un ejercicio
        if "statement" in response:
            message["statement"] = response["statement"]
            message["alternatives"] = response["alternatives"]
            message["answer"] = response["answer"]
            message["answered"] = False
        else:
            message["statement"] = response

        # Añade un nuevo mensaje del bot al chat según su id
        botMessage = message_service.saveMessage(message=message, idChat=id).json()

        # # Manda el id del mensaje solo cuando son ejercicios
        # if "statement" in response:
        message["id"] = botMessage["id"]

        print("se guardó el mensaje del bot-> saveMessage()")

        return jsonify(message), 200
    else:
        return jsonify({"error": "Request body must be JSON"}), 400


@app.route("/messages/<int:id>", methods=["PUT"])
def updateBotMessage(id):
    """Endpoint para chatear con el bot"""
    item = request.get_json()  # Obtener el item del cuerpo de la solicitud
    if item:
        message = {}

        # Construye un message del bot
        message["role"] = item["role"]  # bot
        message["unixTime"] = item["unixTime"]
        message["statement"] = item["statement"]
        message["alternatives"] = item["alternatives"]
        message["answer"] = item["answer"]
        message["answered"] = item["answered"]

        # Añade un nuevo mensaje del bot al chat según su id
        message_service.updateMessage(message=message, idMessage=id)

        print("Este es el mensaje actualizado")
        print(message)

        print("se ACTUALIZÓ el mensaje del bot-> saveMessage()")

        return jsonify(message), 200
    else:
        return jsonify({"error": "Request body must be JSON"}), 400


@app.route("/chats", methods=["GET"])
def getAllChats():
    response = chat_service.getAllChats().json()
    return response, 200


@app.route("/chats/chatSummary/<userUID>", methods=["GET"])
def getAllChatsByUserUID(userUID):
    response = chat_service.getAllChatsByUserUID(userUID=userUID).json()
    return response, 200


@app.route("/messages/chat/<int:chatId>", methods=["GET"])
def getMessagesByChatId(chatId):
    response = message_service.getMessagesByChatId(chatId).json()
    return response, 200


@app.route("/add_intent", methods=["POST"])
def add_intent():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Request body must be JSON"}), 400

        tag = data.get("tag")
        patterns = data.get("patterns")
        responses = data.get("responses")

        if not tag or not isinstance(patterns, list) or not isinstance(responses, list):
            return (
                jsonify(
                    {"error": "Tag, patterns (list), and responses (list) are required"}
                ),
                400,
            )

        with open("intents.json", "r+", encoding="utf-8") as file:
            intents = json.load(file)
            intents["intents"].append(
                {"tag": tag, "patterns": patterns, "responses": responses}
            )
            file.seek(0)
            json.dump(intents, file, indent=4, ensure_ascii=False)
            file.truncate()

        # Re-train the model
        result = os.system("python training.py")
        if result != 0:
            return jsonify({"error": "Model re-training failed"}), 500

        return (
            jsonify({"success": True, "message": "Intent added and model re-trained"}),
            200,
        )

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# INICIO  (PRUEBA 1)
# Endpoint para obtener datos de muestra para el dashboard
@app.route("/api/dashboard-data", methods=["GET"])
def get_dashboard_data():

    # Construir los feeds con los títulos más frecuentes y sus porcentajes
    feeds = []
    for title, percentage in chat_service.findMostFrequentTitlesWithPercentage():
        feeds.append(
            {
                "class": "bg-primary",
                "icon": "bi bi-list-check",
                "task": title,
                "time": f"{percentage}%",
            }
        )
    sales_summary = []
    for user_name, statement in chat_service.numberOfMessagesPerUsers():
        sales_summary.append(
            {
                "class": "bg-secondary",
                "icon": "bi bi-graph-up",
                "task": user_name,
                "time": f"{statement}",
            }
        )
    data = {
        "sales_summary": sales_summary,
        "feeds": feeds,
        "top_cards": [
            {
                "bgcolor": "success",
                "title": f"{chat_service.userWithTheMostChats()}",
                "subtitle": "USER CON MAS CHAT",
            },
            {
                "bgcolor": "info",
                "title": f"{chat_service.numberOfChats()}",
                "subtitle": "N° CHATS",
            },
            {
                "bgcolor": "success",
                "title": f"{chat_service.averageResponseTime()} ms",
                "subtitle": "TIEMPO PROMEDIO DE RESPUESTA DEL BOT",
            },
            {
                "bgcolor": "warning",
                "title": f"{chat_service.longerTalkTime()} ms",
                "subtitle": "CONVERSACIÓN MÁS LARGA",
            },
            # Agrega más tarjetas según sea necesario
        ],
        "top_selling": lista_usuarios,  # Agregar la lista de usuarios aquí
    }
    return jsonify(data)


@app.route("/levels", methods=["GET"])
def getAllLevels():
    response = level_service.getAllChats().json()
    return response, 200


@app.route("/students", methods=["POST"])
def saveStudent():
    item = request.get_json()  # Obtener el item del cuerpo de la solicitud
    if item:
        userUID = item["userUID"]
        userName = item["userName"]
        email = item["email"]
        photoURL = item["photoURL"]
        id = item["level"]["id"]
        correctExercises = item["correctExercises"]
        incorrectExercises = item["incorrectExercises"]
        score = item["score"]

        student = {
            "userUID": userUID,
            "userName": userName,
            "email": email,
            "photoURL": photoURL,
            "level": {"id": id},
            "correctExercises": correctExercises,
            "incorrectExercises": incorrectExercises,
            "score": score,
        }

        # Crea un nuevo student
        # saveStudent y student en teoría son lo mismo
        # Se usa el saveStudent por cuestiones de orden
        saveStudent = student_service.saveStudent(student=student).json()

        return jsonify(saveStudent), 200
    else:
        return jsonify({"error": "Request body must be JSON"}), 400


@app.route("/students/<userUID>", methods=["PUT"])
def updateStudent(userUID):
    item = request.get_json()  # Obtener el item del cuerpo de la solicitud
    if item:
        userName = item["userName"]
        email = item["email"]
        photoURL = item["photoURL"]
        id = item["level"]["id"]
        correctExercises = item["correctExercises"]
        incorrectExercises = item["incorrectExercises"]
        score = item["score"]

        student = {
            "userName": userName,
            "email": email,
            "photoURL": photoURL,
            "level": {"id": id},
            "correctExercises": correctExercises,
            "incorrectExercises": incorrectExercises,
            "score": score,
        }

        # Crea un nuevo student
        updatedStudent = student_service.updateStudent(
            student=student, userUID=userUID
        ).json()

        return jsonify(updatedStudent), 200
    else:
        return jsonify({"error": "Request body must be JSON"}), 400


@app.route("/students", methods=["GET"])
def getAllStudents():
    response = student_service.getAllStudents().json()
    return response, 200


# Al iniciar sesión
@app.route("/students/<userUID>", methods=["GET"])
def getStudentByUserUID(userUID):
    response = student_service.getStudentByUserUID(userUID).json()
    return response, 200


@app.route("/admins/login", methods=["POST"])
def adminLogin():
    item = request.get_json()
    if item:
        response = admin_service.login(admin=item)

        if response.status_code == 200:
            adminLoggedIn = response.json()
            return jsonify(adminLoggedIn), 200
        elif response.status_code == 401:
            return jsonify({"error": "Invalid credentials"}), 401
        else:
            return (
                jsonify({"error": "An unexpected error occurred"}),
                response.status_code,
            )
    else:
        return jsonify({"error": "Request body must be JSON"}), 400


@app.route("/admins/reset-password", methods=["POST"])
def adminResetPassword():
    item = request.get_json()
    if item:

        success = admin_service.resetPassword(admin=item).json()

        return success, 200
    else:
        return jsonify({"error": "Request body must be JSON"}), 400


@app.route("/testChat", methods=["POST"])
def testChat():
    """Endpoint para chatear con el bot"""
    item = request.get_json()  # Obtener el item del cuerpo de la solicitud
    if item:
        print("Este es el message del frontend", item["content"])
        content = item["content"]
        response, chatTitle = process_message(content)

        if "statement" in response:
            print("El bot tiene respuesta de ejercicio")

        return response, 200


@app.route("/exercises/basic", methods=["GET"])
def getBasicExercises():
    """Endpoint para chatear con el bot"""
    with open("data/intents.json", encoding="utf-8") as file:
        intents = json.load(file)

    # Buscar el tag correspondiente
    for intent in intents["intents"]:
        if intent["tag"] == "exercise_basic_java":
            # Elegir una respuesta al azar
            response = intent["responses"]
            # Imprimir la respuesta para otros tags
            print("get_response() ==> [ ", response, " ]")
    return response, 200


@app.route("/exercises/intermediate", methods=["GET"])
def getIntermediateExercises():
    """Endpoint para chatear con el bot"""
    with open("data/intents.json", encoding="utf-8") as file:
        intents = json.load(file)

    # Buscar el tag correspondiente
    for intent in intents["intents"]:
        if intent["tag"] == "exercise_intermediate_java":
            # Elegir una respuesta al azar
            response = intent["responses"]
            # Imprimir la respuesta para otros tags
            print("get_response() ==> [ ", response, " ]")
    return response, 200


@app.route("/exercises/advanced", methods=["GET"])
def getAdvancedExercises():
    """Endpoint para chatear con el bot"""
    with open("data/intents.json", encoding="utf-8") as file:
        intents = json.load(file)

    # Buscar el tag correspondiente
    for intent in intents["intents"]:
        if intent["tag"] == "exercise_advanced_java":
            # Elegir una respuesta al azar
            response = intent["responses"]
            # Imprimir la respuesta para otros tags
            print("get_response() ==> [ ", response, " ]")
    return response, 200


if __name__ == "__main__":
    app.run(debug=True, port=5000)
