import requests
import json

SERVER_URL = "http://localhost:8080/levels"

headers = {"Content-Type": "application/json"}


def saveLevel(level):
    return requests.post(SERVER_URL, data=json.dumps(level), headers=headers)


def getAllChats():
    return requests.get(SERVER_URL)
