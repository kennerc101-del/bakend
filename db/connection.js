import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST  ||  'localhost',
    user: process.env.DB_USER  ||  'root',
    password: process.env.DB_PASSWORD  ||  '',
    database: process.env.DB_NAME  ||  'bakend_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });


  try{
    const connection = await pool.getConnection();
    console.log('coneccion establecida con la base de MYsql exitosamente');
    connection.release();

  } catch (error) {
    console.error('error al conectar con la base de datos:', error.message);
  }

  export default pool;