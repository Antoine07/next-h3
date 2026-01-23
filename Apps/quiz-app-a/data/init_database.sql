SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP DATABASE IF EXISTS quiz_app;

CREATE DATABASE quiz_app
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE quiz_app;

CREATE TABLE quiz (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT, -- peut etre nul
  title VARCHAR(255) NOT NULL,
  description TEXT
);

CREATE TABLE question (
  id INT AUTO_INCREMENT PRIMARY KEY,
  quiz_id INT NOT NULL,
  label TEXT NOT NULL,
  FOREIGN KEY (quiz_id)
    REFERENCES quiz(id)
    ON DELETE CASCADE
);

CREATE TABLE choice (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question_id INT, 
  label TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (question_id) REFERENCES question(id)
    ON DELETE CASCADE
);

ALTER TABLE choice 
MODIFY question_id INT NOT NULL;

-- donnee d'exemple

INSERT INTO quiz (id, title) VALUES
(1, 'Quiz Jazz'),
(2, 'Quiz Électro'),
(3, 'Quiz Fusion Jazz & Électro');

INSERT INTO question (id, quiz_id, label) VALUES
-- Quiz Jazz
(1, 1, 'Qui est considéré comme un pionnier du jazz ?'),
(2, 1, 'Quel instrument est emblématique du jazz ?'),
(3, 1, 'Dans quelle ville le jazz est-il né ?'),

-- Quiz Électro
(4, 2, 'Quel pays est à l’origine de la techno ?'),
(5, 2, 'Quel artiste est associé à la French Touch ?'),
(6, 2, 'Quel équipement est central dans la musique électro ?'),

-- Quiz Fusion
(7, 3, 'Quel élément est commun au jazz et à l’électro ?'),
(8, 3, 'Quel style mélange jazz et musiques électroniques ?'),
(9, 3, 'Quel musicien est connu pour fusionner jazz et électro ?');


INSERT INTO choice (question_id, label, is_correct) VALUES
-- Q1
(1, 'Louis Armstrong', TRUE),
(1, 'Elvis Presley', FALSE),
(1, 'Bob Dylan', FALSE),

-- Q2
(2, 'Saxophone', TRUE),
(2, 'Violon', FALSE),
(2, 'Harpe', FALSE),

-- Q3
(3, 'New Orleans', TRUE),
(3, 'Chicago', FALSE),
(3, 'New York', FALSE),

-- Q4
(4, 'Allemagne', TRUE),
(4, 'France', FALSE),
(4, 'États-Unis', FALSE),

-- Q5
(5, 'Daft Punk', TRUE),
(5, 'Aphex Twin', FALSE),
(5, 'Deadmau5', FALSE),

-- Q6
(6, 'Synthétiseur', TRUE),
(6, 'Piano acoustique', FALSE),
(6, 'Saxophone', FALSE),

-- Q7
(7, 'Improvisation', TRUE),
(7, 'Partition classique stricte', FALSE),
(7, 'Absence de rythme', FALSE),

-- Q8
(8, 'Nu Jazz', TRUE),
(8, 'Heavy Metal', FALSE),
(8, 'Baroque', FALSE),

-- Q9
(9, 'St Germain', TRUE),
(9, 'Mozart', FALSE),
(9, 'Johnny Hallyday', FALSE);


--

CREATE TABLE score (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  quiz_id INT NOT NULL,
  user_id INT NULL,
  score INT NOT NULL,
  total INT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_score_quiz
    FOREIGN KEY (quiz_id)
    REFERENCES quiz(id)
    ON DELETE CASCADE
);


-- ici on le met en open pour commencer les quizzes

ALTER TABLE quiz
ADD status ENUM('draft', 'open', 'closed')
NOT NULL DEFAULT 'open';