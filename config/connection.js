// config/connection.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    database: process.env.DB_NAME || 'bakend_db',
    port: process.env.DB_PORT || 3306,
    password: process.env.DB_PASSWORD || '',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
export async function migrar() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS \`usuarios\` (
                \`id\` INT AUTO_INCREMENT PRIMARY KEY,
                \`username\` VARCHAR(50) NOT NULL UNIQUE,
                \`password\` VARCHAR(255) NOT NULL,
                \`role\` VARCHAR(20) NOT NULL
            );
        `);
        await pool.query(`
            CREATE TABLE IF NOT EXISTS \`empleados\` (
                \`id\` INT AUTO_INCREMENT PRIMARY KEY,
                \`cedula\` VARCHAR(20) NOT NULL,
                \`nombre\` VARCHAR(100) NOT NULL,
                \`edad\` INT NOT NULL,
                \`pagoPorDia\` DECIMAL(10,2) NOT NULL
            );
        `);
        await pool.query(`
            CREATE TABLE IF NOT EXISTS \`provedores\` (
                \`id\` INT AUTO_INCREMENT PRIMARY KEY,
                \`nombre\` VARCHAR(100) NOT NULL,
                \`rif\` VARCHAR(30) NOT NULL,
                \`telefono\` VARCHAR(20) NOT NULL
            );
        `);
        await pool.query(`
            CREATE TABLE IF NOT EXISTS \`equipos_tec\` (
                \`id\` INT AUTO_INCREMENT PRIMARY KEY,
                \`nombreEquipo\` VARCHAR(100) NOT NULL,
                \`serial\` VARCHAR(50) NOT NULL,
                \`idProvedor\` INT NOT NULL,
                FOREIGN KEY (\`idProvedor\`) REFERENCES \`provedores\`(\`id\`) ON DELETE CASCADE ON UPDATE RESTRICT
            );
        `);
        await pool.query(`
            CREATE TABLE IF NOT EXISTS \`ventas\` (
                \`id\` INT AUTO_INCREMENT PRIMARY KEY,
                \`cliente\` VARCHAR(100) NOT NULL,
                \`monto\` DECIMAL(10,2) NOT NULL,
                \`fecha\` DATE NOT NULL,
                \`idEquipo\` INT NOT NULL,
                \`idEmpleado\` INT NOT NULL,
                FOREIGN KEY (\`idEquipo\`) REFERENCES \`equipos_tec\`(\`id\`) ON DELETE CASCADE ON UPDATE RESTRICT,
                FOREIGN KEY (\`idEmpleado\`) REFERENCES \`empleados\`(\`id\`) ON DELETE CASCADE ON UPDATE RESTRICT
            );
        `);
        console.log("Migración de las 5 tablas verificada con éxito.");
    } catch (error) {
        console.log("Error en migración:", error);
    }
}