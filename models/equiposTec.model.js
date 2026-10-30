import { pool } from "../config/connection.js";

class EquiposTecModel {
    async allEquipos() {
        try {
            const sql = 'SELECT * FROM `equipos_tec`';
            const [rows, fields] = await pool.query(sql);
            return { rows, fields };
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async oneEquipo(id) {
        try {
            const sql = 'SELECT * FROM `equipos_tec` WHERE id = ?';
            const [rows, fields] = await pool.query(sql, [id]);
            return { rows, fields };
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async equiposPorProveedor(idProvedor) {
        try {
            const sql = 'SELECT * FROM `equipos_tec` WHERE idProvedor = ?';
            const [rows, fields] = await pool.query(sql, [idProvedor]);
            return { rows, fields };
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async addEquipo(nuevo, idProvedor) {
        try {
            const sql = 'INSERT INTO `equipos_tec` (`idProvedor`, `nombre`, `precio`, `modelo`) VALUES (?, ?, ?, ?)';
            const response = await pool.query(sql, [idProvedor, nuevo.nombre, nuevo.precio, nuevo.modelo]);
            return response;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async updateEquipo(equipo, id) {
        try {
            const sql = 'UPDATE `equipos_tec` SET nombre = ?, precio = ?, modelo = ? WHERE id = ?';
            const response = await pool.query(sql, [equipo.nombre, equipo.precio, equipo.modelo, id]);
            return response;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async deleteEquipo(id) {
        try {
            const sql = 'DELETE FROM `equipos_tec` WHERE id = ?';
            const response = await pool.query(sql, [id]);
            return response;
        } catch (err) {
            throw new Error(err.message);
        }
    }
}

export default new EquiposTecModel();