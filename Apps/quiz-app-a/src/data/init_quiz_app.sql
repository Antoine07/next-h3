/* =========================================================
   INIT QUIZ APP – SCRIPT SQL UNIQUE (UTF8 SAFE)
   ========================================================= */

-- ---------------------------------------------------------
-- ENCODAGE (CRUCIAL)
-- ---------------------------------------------------------
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- ---------------------------------------------------------
-- RESET (pour rejouer le script sans erreur)
-- ---------------------------------------------------------
DROP TABLE IF EXISTS quiz_tags;
DROP TABLE IF EXISTS feedbacks;
DROP TABLE IF EXISTS choices;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS quizzes;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS users;

-- ---------------------------------------------------------
-- USERS
-- ---------------------------------------------------------
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- ---------------------------------------------------------
-- QUIZZES (chaque quiz appartient à un user)
-- ---------------------------------------------------------
CREATE TABLE quizzes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- ---------------------------------------------------------
-- QUESTIONS (1 quiz -> N questions)
-- ---------------------------------------------------------
CREATE TABLE questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  quiz_id INT,
  label TEXT NOT NULL,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- ---------------------------------------------------------
-- CHOICES (QCM, 1 question -> N choix)
-- ---------------------------------------------------------
CREATE TABLE choices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question_id INT,
  label TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (question_id) REFERENCES questions(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- ---------------------------------------------------------
-- FEEDBACKS (retours utilisateurs)
-- ---------------------------------------------------------
CREATE TABLE feedbacks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  quiz_id INT,
  comment TEXT NOT NULL,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- ---------------------------------------------------------
-- TAGS
-- ---------------------------------------------------------
CREATE TABLE tags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- ---------------------------------------------------------
-- RELATION N-N : QUIZZES ↔ TAGS
-- ---------------------------------------------------------
CREATE TABLE quiz_tags (
  quiz_id INT NOT NULL,
  tag_id INT NOT NULL,
  PRIMARY KEY (quiz_id, tag_id),
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id),
  FOREIGN KEY (tag_id) REFERENCES tags(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- =========================================================
-- INSERTION DES DONNÉES
-- =========================================================

-- USERS
INSERT INTO users (name, email) VALUES
('Alice', 'alice@mail.com'),
('Bob', 'bob@mail.com');

-- QUIZZES
INSERT INTO quizzes (user_id, title, description) VALUES
(1, 'Quiz JavaScript', 'Bases du langage JavaScript'),
(1, 'Quiz React', 'Fondamentaux de React'),
(2, 'Quiz Next.js', 'Introduction à Next.js'),
(2, 'Quiz Python', 'Introduction à Python');

-- QUESTIONS
INSERT INTO questions (quiz_id, label) VALUES
(1, 'Quels mots-clés permettent de déclarer une variable ?'),
(1, 'JavaScript est-il typé statiquement ?'),
(2, 'À quoi sert useState ?'),
(3, 'Next.js permet-il le rendu serveur (SSR) ?'),
(4, 'Python est-il un langage interprété ?');

-- CHOICES
INSERT INTO choices (question_id, label, is_correct) VALUES
-- Quiz JavaScript
(1, 'var', true),
(1, 'let', true),
(1, 'const', true),
(1, 'define', false),

(2, 'Oui', false),
(2, 'Non', true),

-- Quiz React
(3, 'Gérer un état local', true),
(3, 'Créer des composants', false),
(3, 'Manipuler le DOM directement', false),

-- Quiz Next.js
(4, 'Oui', true),
(4, 'Non', false),

-- Quiz Python
(5, 'Oui', true),
(5, 'Non', false);

-- TAGS
INSERT INTO tags (name) VALUES
('frontend'),
('backend'),
('javascript'),
('framework'),
('python'),
('web');

-- ASSOCIATION QUIZZES ↔ TAGS
INSERT INTO quiz_tags (quiz_id, tag_id) VALUES
(1, 1), (1, 3), (1, 6),
(2, 1), (2, 3), (2, 4),
(3, 1), (3, 3), (3, 4), (3, 6),
(4, 2), (4, 5);

-- FEEDBACKS
INSERT INTO feedbacks (quiz_id, comment, rating) VALUES
(1, 'Très bon quiz pour débuter', 5),
(1, 'Clair et efficace', 4),
(2, 'Bon rappel des bases', 4),
(3, 'Parfait pour comprendre le SSR', 5),
(4, 'Très accessible pour les débutants', 5);
