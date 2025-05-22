import requests
import json
import time

SERVER_URL = "http://localhost:8080/messages"

headers = {"Content-Type": "application/json"}


def saveMessage(message, idChat):
    return requests.post(
        SERVER_URL + "/chat/" + str(idChat),
        data=json.dumps(message),
        headers=headers,
    )


def updateMessage(message, idMessage):
    return requests.put(
        SERVER_URL + "/" + str(idMessage),
        data=json.dumps(message),
        headers=headers,
    )


def getMessagesByChatId(chatId):
    return requests.get(SERVER_URL + "/chat/" + str(chatId))


def getCurrentTimeInMilis():
    # Calculate the time in miliseconds
    return int(time.time() * 1000)
