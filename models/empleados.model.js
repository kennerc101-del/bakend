import { pool } from "../config/connection.js";

class EmpleadosModel {
    async allEmpleados() {
        try {
            const sql = 'SELECT * FROM `empleados`';
            const [rows, fields] = await pool.query(sql);
            return { rows, fields };
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async oneEmpleado(id) {
        try {
            const sql = 'SELECT * FROM `empleados` WHERE id = ?';
            const [rows, fields] = await pool.query(sql, [id]);
            return { rows, fields };
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async addEmpleado(nuevo) {
        try {
            const sql = 'INSERT INTO `empleados` (`cedula`, `nombre`, `edad`, `pagoPorDia`) VALUES (?, ?, ?, ?)';
            const response = await pool.query(sql, [nuevo.cedula, nuevo.nombre, nuevo.edad, nuevo.pagoPorDia]);
            return response;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async updateEmpleado(empleado, id) {
        try {
            const sql = 'UPDATE `empleados` SET cedula = ?, nombre = ?, edad = ?, pagoPorDia = ? WHERE id = ?';
            const response = await pool.query(sql, [empleado.cedula, empleado.nombre, empleado.edad, empleado.pagoPorDia, id]);
            return response;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async deleteEmpleado(id) {
        try {
            const sql = 'DELETE FROM `empleados` WHERE id = ?';
            const response = await pool.query(sql, [id]);
            return response;
        } catch (err) {
            throw new Error(err.message);
        }
    }
}

export default new EmpleadosModel();