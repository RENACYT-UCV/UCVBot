import random

lista_usuarios = []

# Definir los datos de cada usuario como diccionarios
usuario1 = {
    "image": "assets/images/users/user1.jpg",
    "uname": "Tadeo Portillo",
    "gmail": "tportillo@ucvvirtual.edu.pe",
    "productName": "Ejercicio Avanzado en Java",
    "status": "success",
    "weeks": str(random.randint(20, 100)),
    "budget": str(random.randint(0, 100)),
}

usuario2 = {
    "image": "assets/images/users/user1.jpg",
    "uname": "Cristhian Albites",
    "gmail": "calbites@ucvvirtual.edu.pe",
    "productName": "Ejercicio Intemedio en Java",
    "status": "success",
    "weeks": str(random.randint(20, 100)),
    "budget": str(random.randint(0, 100)),
}

usuario3 = {
    "image": "assets/images/users/user1.jpg",
    "uname": "Pablo Reynoso",
    "gmail": "preynosogu@ucvvirtual.edu.pe",
    "productName": "Ejercicio Básico en Java",
    "status": "danger",
    "weeks": str(random.randint(20, 100)),
    "budget": str(random.randint(0, 100)),
}
usuario4 = {
    "image": "assets/images/users/user1.jpg",
    "uname": "Ivette Matos",
    "gmail": "imattos@ucvvirtual.edu.pe",
    "productName": "Ejercicio Básico en Java",
    "status": "success",
    "weeks": str(random.randint(20, 100)),
    "budget": str(random.randint(0, 100)),
}

# Agregar cada usuario a la lista de usuarios
lista_usuarios.append(usuario1)
lista_usuarios.append(usuario2)
lista_usuarios.append(usuario3)
lista_usuarios.append(usuario4)
