-- Insertar nivel Básico si no existe
INSERT INTO Level (name)
SELECT 'Básico'
WHERE NOT EXISTS (SELECT 1 FROM Level WHERE name = 'Básico');

-- Insertar nivel Intermedio si no existe
INSERT INTO Level (name)
SELECT 'Intermedio'
WHERE NOT EXISTS (SELECT 1 FROM Level WHERE name = 'Intermedio');

-- Insertar nivel Avanzado si no existe
INSERT INTO Level (name)
SELECT 'Avanzado'
WHERE NOT EXISTS (SELECT 1 FROM Level WHERE name = 'Avanzado');

# INSERT INTO ucvbot.admin (id, email, password, user_name)
# VALUES ('1', 'admin@ucvvirtual.edu.pe', '12345678', 'admin');

INSERT INTO ucvbot.admin (id, email, password, user_name)
SELECT '1', 'admin@ucvvirtual.edu.pe', '12345678', 'admin'
WHERE NOT EXISTS (SELECT 1
                  FROM ucvbot.admin
                  WHERE email = 'admin@ucvvirtual.edu.pe');

