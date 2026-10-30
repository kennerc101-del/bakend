import { pool } from "../config/connection.js";

class ProvedoresModel {
    async allProvedores() {
        try {
            const sql = 'SELECT * FROM `provedores`';
            const [rows, fields] = await pool.query(sql);
            return { rows, fields };
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async oneProvedor(id) {
        try {
            const sql = 'SELECT * FROM `provedores` WHERE id = ?';
            const [rows, fields] = await pool.query(sql, [id]);
            return { rows, fields };
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async addProvedor(nuevo) {
        try {
            const sql = 'INSERT INTO `provedores` (`nombre`, `lugar`, `dueño`) VALUES (?, ?, ?)';
            const response = await pool.query(sql, [nuevo.nombre, nuevo.lugar, nuevo.dueño]);
            return response;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async updateProvedor(provedor, id) {
        try {
            const sql = 'UPDATE `provedores` SET nombre = ?, lugar = ?, dueño = ? WHERE id = ?';
            const response = await pool.query(sql, [provedor.nombre, provedor.lugar, provedor.dueño, id]);
            return response;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async deleteProvedor(id) {
        try {
            const sql = 'DELETE FROM `provedores` WHERE id = ?';
            const response = await pool.query(sql, [id]);
            return response;
        } catch (err) {
            throw new Error(err.message);
        }
    }
}

export default new ProvedoresModel();