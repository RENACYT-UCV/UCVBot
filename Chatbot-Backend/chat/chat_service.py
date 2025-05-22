import requests
import json

SERVER_URL = "http://localhost:8080/chats"

headers = {"Content-Type": "application/json"}


def saveChat(chat):
    return requests.post(SERVER_URL, data=json.dumps(chat), headers=headers)


def getAllChats():
    return requests.get(SERVER_URL)


def getAllChatsByUserUID(userUID):
    return requests.get(SERVER_URL + "/chatSummary/" + userUID)


def userWithTheMostChats():
    response = requests.get(SERVER_URL + "/userWithTheMostChats")
    if response.status_code == 200:
        return response.text
    else:
        return "Error: No se pudo obtener la respuesta del servidor"


def findMostFrequentTitlesWithPercentage():
    return requests.get(SERVER_URL + "/mostFrequentTitles").json()


def numberOfMessagesPerUsers():
    return requests.get(SERVER_URL + "/numberOfMessagesPerUsers").json()


def numberOfChats():
    return requests.get(SERVER_URL + "/numberOfChats").text


def averageResponseTime():
    return requests.get(SERVER_URL + "/averageResponseTime").text


def longerTalkTime():
    return requests.get(SERVER_URL + "/longerTalkTime").text
