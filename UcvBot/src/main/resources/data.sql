-- Insertar nivel Básico si no existe
INSERT INTO Level (v_name)
SELECT 'Básico'
WHERE NOT EXISTS (SELECT 1 FROM Level WHERE v_name = 'Básico');

-- Insertar nivel Intermedio si no existe
INSERT INTO Level (v_name)
SELECT 'Intermedio'
WHERE NOT EXISTS (SELECT 1 FROM Level WHERE v_name = 'Intermedio');

-- Insertar nivel Avanzado si no existe
INSERT INTO Level (v_name)
SELECT 'Avanzado'
WHERE NOT EXISTS (SELECT 1 FROM Level WHERE v_name = 'Avanzado');

# INSERT INTO ucvbot.admin (id, email, password, user_name)
# VALUES ('1', 'admin@ucvvirtual.edu.pe', '12345678', 'admin');

INSERT INTO admin (v_id, v_userName, v_password, v_email)
SELECT '00000000-0000-0000-0000-000000000001', 'admin', '12345678', 'admin@ucvvirtual.edu.pe'
WHERE NOT EXISTS (SELECT 1 FROM admin WHERE v_email = 'admin@ucvvirtual.edu.pe');

