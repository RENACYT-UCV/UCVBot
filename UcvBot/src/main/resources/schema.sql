CREATE DATABASE IF NOT EXISTS ucvbot;
USE ucvbot;

DROP TABLE IF EXISTS admin;
DROP TABLE IF EXISTS Level;
DROP TABLE IF EXISTS alternative;
DROP TABLE IF EXISTS message;
DROP TABLE IF EXISTS chat;
DROP TABLE IF EXISTS student;

CREATE TABLE Level (
    v_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    v_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE admin (
    v_id VARCHAR(36) PRIMARY KEY,
    v_userName VARCHAR(20) NOT NULL UNIQUE,
    v_password VARCHAR(8) NOT NULL,
    v_email VARCHAR(100) NOT NULL UNIQUE,
    CONSTRAINT CK_Password_Admin CHECK (v_password REGEXP '^[0-9]{8}$')
);

CREATE TABLE student (
    v_userUID VARCHAR(100) PRIMARY KEY,
    v_userName VARCHAR(100) NOT NULL UNIQUE,
    v_email VARCHAR(100) NOT NULL UNIQUE,
    v_photoURL VARCHAR(200) NOT NULL UNIQUE,
    level_id BIGINT NOT NULL,
    v_correctExercises INT NOT NULL,
    v_incorrectExercises INT NOT NULL,
    v_score INT NOT NULL,
    CONSTRAINT FK_Student_Level FOREIGN KEY (level_id) REFERENCES Level(v_id)
);

CREATE TABLE chat (
    v_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    v_title VARCHAR(100) NOT NULL,
    student_id VARCHAR(100) NOT NULL,
    CONSTRAINT FK_Chat_Student FOREIGN KEY (student_id) REFERENCES student(v_userUID)
);

CREATE TABLE message (
    v_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    v_statement TEXT NOT NULL,
    v_role VARCHAR(10) NOT NULL,
    v_unixTime BIGINT NOT NULL,
    v_answer INT,
    v_answered BOOLEAN,
    chat_id BIGINT NOT NULL,
    CONSTRAINT FK_Message_Chat FOREIGN KEY (chat_id) REFERENCES chat(v_id)
);

CREATE TABLE alternative (
    v_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    v_content TEXT NOT NULL,
    v_numberIndex INT NOT NULL,
    message_id BIGINT NOT NULL,
    CONSTRAINT FK_Alternative_Message FOREIGN KEY (message_id) REFERENCES message(v_id)
); 