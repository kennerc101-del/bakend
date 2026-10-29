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


}

export default new EmpleadosModel();