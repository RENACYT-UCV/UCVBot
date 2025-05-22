import json
import pickle
import numpy as np
import spacy
import unidecode
from keras.api.models import Sequential
from keras.api.layers import Dense, Dropout
from keras.api.optimizers import SGD

import os
import json

# Imprimir el directorio actual
print("Current Directory:", os.getcwd())

# Cargar el modelo en español de spaCy
nlp = spacy.load("es_core_news_sm")

# Leer los models del archivo JSON
with open("data/models.json", encoding="utf-8") as file:
    models = json.load(file)

words_patterns = []
classes_patterns = []
documents = []
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

for model in models["models"]:
    for pattern in model["patterns"]:
        doc = nlp(pattern)
        word_list = [token.lemma_ for token in doc if token.text not in ignore_letters]
        word_list = [unidecode.unidecode(word).lower() for word in word_list]
        words_patterns.extend(word_list)
        documents.append((word_list, model["tag"]))
        if model["tag"] not in classes_patterns:
            classes_patterns.append(model["tag"])

words_patterns = sorted(set(words_patterns))
classes_patterns = sorted(set(classes_patterns))


pickle.dump(words_patterns, open("data/words_patterns.pkl", "wb"))
pickle.dump(classes_patterns, open("data/classes_patterns.pkl", "wb"))

training = []
output_empty = [0] * len(classes_patterns)

for doc in documents:
    bag = []
    pattern_words = doc[0]
    for word in words_patterns:
        bag.append(1 if word in pattern_words else 0)

    output_row = list(output_empty)
    output_row[classes_patterns.index(doc[1])] = 1
    training.append([np.array(bag), np.array(output_row)])

# Mezclar nuestros datos y convertirlos en array
np.random.shuffle(training)
training = np.array(training, dtype=object)

# Crear listas de entrenamiento
train_x = np.array(list(training[:, 0]))
train_y = np.array(list(training[:, 1]))

# Definir la estructura del modelo
model = Sequential(
    [
        Dense(128, input_shape=(len(train_x[0]),), activation="relu"),
        Dropout(0.5),
        Dense(64, activation="relu"),
        Dropout(0.5),
        Dense(len(train_y[0]), activation="softmax"),
    ]
)

# Compilar el modelo
sgd = SGD(learning_rate=0.01, decay=1e-6, momentum=0.9, nesterov=True)
model.compile(loss="categorical_crossentropy", optimizer=sgd, metrics=["accuracy"])

# Entrenar el modelo
model.fit(train_x, train_y, epochs=100, batch_size=5, verbose=1)

# Guardar el modelo
model.save("data/chatbot_model.keras")
