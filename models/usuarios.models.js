import { pool } from "../config/connection.js";

class UsuariosModels {
    addUser(newUser) {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'INSERT INTO `usuarios` (`username`, `password`, `role`) VALUES (?, ?, ?)';
                const response = await pool.query(sql, [newUser.username, newUser.password, newUser.role]);
                return resolve({ data: response });
            } catch (err) {
                return reject({ error: err });
            }
        });
    }

    searchUser(username) {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'SELECT * FROM `usuarios` WHERE username = ?';
                const [rows, fields] = await pool.query(sql, [username]);
                return resolve({ rows: rows, fields: fields });
            } catch (err) {
                return reject({ error: err });
            }
        });
    }
}

const usuariosModels = new UsuariosModels();
export default usuariosModels;