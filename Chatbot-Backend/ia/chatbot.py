import numpy as np
import json
import pickle
import spacy
from keras.models import load_model
import unidecode
from fuzzywuzzy import fuzz
from fuzzywuzzy import process

nlp = spacy.load("es_core_news_sm")


words_patterns = pickle.load(open("data/words_patterns.pkl", "rb"))
classes_classes = pickle.load(open("data/classes.pkl", "rb"))
model = load_model("data/chatbot_model.keras")


invalid_sentence_responses = [
    "Lo siento, no entendí. ¿Puedes ser más específico?",
    "No comprendo. ¿Puedes reformular tu pregunta?",
]

ignore_letters = [
    "?",
    "!",
    ".",
    ",",
    "-",
    "a",
    "e",
    "i",
    "o",
    "u",
    "'",
    "¿",
    "¡",
    "en",
    "(",
    ")",
    "/",
    "\\",
    ":",
]


def normalize_text(text):
    normalize = unidecode.unidecode(text).lower()
    print("normalize_text() ==> [ ", normalize, " ]")
    return unidecode.unidecode(text).lower()


# Lista de palabras que deben mantenerse como están
keep_as_is = {"dame", "gustaria"}


def clean_up_sentence(sentence):
    print("Original Sentence: ", sentence)
    normalized_sentence = normalize_text(sentence)
    print("Normalized Sentence: ", normalized_sentence)

    doc = nlp(normalized_sentence)

    print(
        "Tokens: ", [token.text for token in doc]
    )  # Imprime los tokens antes de filtrar
    print(
        "Lemmas: ",
        [token.lemma_ if token.text not in keep_as_is else token.text for token in doc],
    )  # Imprime las lemas de los tokens

    # Aplicar el filtro considerando la lista ignore_letters
    sentence_words = [
        token.text if token.text in keep_as_is else token.lemma_
        for token in doc
        if not token.is_stop and token.text not in ignore_letters
    ]

    print("Filtered Sentence Words: ", sentence_words)  # Imprime las palabras filtradas

    corrected_words = []
    low_confidence = False

    word_matches = {
        word: process.extract(word, words_patterns, limit=10, scorer=fuzz.token_sort_ratio)
        for word in sentence_words
    }
    for word in sentence_words:
        best_match, best_score = (
            word_matches[word][0] if word_matches[word] else (None, 0)
        )
        print("Best Match and Score: ", best_match, best_score)
        if best_score > 75:
            corrected_words.append(best_match)
            print("asdadsad", corrected_words)
        else:
            corrected_words.append(word)
            print("asdadsad", corrected_words)
            low_confidence = True

    print("Corrected Words: ", corrected_words)  # Imprime las palabras corregidas
    return corrected_words, low_confidence


def predict_class(sentence):
    sentence_words, low_confidence = clean_up_sentence(sentence)
    print(sentence_words, low_confidence)

    unknown_words = sum(1 for word in sentence_words if word not in words_patterns)
    total_words = len(sentence_words)
    if total_words == 0:
        return "mensaje_ininteligible"  # Si no hay palabras en la oración, se devuelve mensaje ininteligible

    percentage_unknown = unknown_words / total_words
    print("Percentage of Unknown Words: ", percentage_unknown)

    if percentage_unknown > 0.5:
        # Si más del 50% de las palabras son desconocidas, se retorna un error
        return "mensaje_ininteligible"

    # Continuar con la creación del 'bag of words_patterns' y la predicción
    bag = [1 if word in sentence_words else 0 for word in words_patterns]
    res = model.predict(np.array([bag]), verbose=0)[0]
    max_index = np.argmax(res)
    print("predict_class() ==> [ ", classes_classes[max_index], " ]")
    return classes_classes[max_index]


def get_response(tag):
    if tag == "mensaje_ininteligible":
        return np.random.choice(invalid_sentence_responses)

    with open("data/intents.json", encoding="utf-8") as file:
        intents = json.load(file)

    # Buscar el tag correspondiente
    for intent in intents["intents"]:
        if intent["tag"] == tag:
            # Elegir una respuesta al azar
            response = np.random.choice(intent["responses"])
            # Imprimir la respuesta para otros tags
            print("get_response() ==> [ ", response, " ]")
            return response

    # Respuesta por defecto si el tag es desconocido
    random = np.random.choice(invalid_sentence_responses)
    print("get_response() ==> [ ", random, " ]")
    return random


def process_message(message):
    tag = predict_class(message)
    response = get_response(tag)
    print("Este es el Tag")
    print(tag)
    print("Process message()")
    print(response)
    return response, tag
