import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: process.env.DB_HOST, // accède au variable d'environnement de l'application qui sont dans .env
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
