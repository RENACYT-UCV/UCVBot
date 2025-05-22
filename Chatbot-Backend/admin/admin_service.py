import requests
import json

SERVER_URL = "http://localhost:8080/admins"

headers = {"Content-Type": "application/json"}


def login(admin):
    return requests.post(SERVER_URL + "/login", data=json.dumps(admin), headers=headers)


def resetPassword(admin):
    return requests.post(
        SERVER_URL + "/reset-password", data=json.dumps(admin), headers=headers
    )
