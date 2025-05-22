import requests
import json

SERVER_URL = "http://localhost:8080/students"

headers = {"Content-Type": "application/json"}


def saveStudent(student):
    return requests.post(SERVER_URL, data=json.dumps(student), headers=headers)


def updateStudent(student, userUID):
    return requests.put(
        SERVER_URL + "/" + userUID,
        data=json.dumps(student),
        headers=headers,
    )


def getAllStudents():
    return requests.get(SERVER_URL)


def getStudentByUserUID(userUID):
    return requests.get(SERVER_URL + "/" + userUID)
