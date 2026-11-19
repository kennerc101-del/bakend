import usuariosModels from "../models/usuarios.models.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../middlewares/auth.js";

class UsuariosControllers {
    verificarBody(body) {
        return new Promise((resolve, reject) => {
            if (!body.username || !body.password || !body.role) {
                return reject("Faltan Datos Indispensables (username, password, role)");
            }
            const rolesValidos = ["admin", "supervisor", "user"];
            if (!rolesValidos.includes(body.role)) {
                return reject("Rol inválido: debe ser admin, supervisor o user");
            }
            return resolve("Todo bien");
        });
    }

    agregar(newUser) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.verificarBody(newUser);
                const salt = bcrypt.genSaltSync(10);
                newUser.password = bcrypt.hashSync(newUser.password, salt);
                const response = await usuariosModels.addUser(newUser);
                return resolve({ data: response, message: "Usuario agregado exitosamente" });
            } catch (error) {
                return reject({ data: null, message: error.message || error });
            }
        });
    }

    login(user) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!user.username || !user.password) {
                    return reject({ data: null, message: "Faltan Datos Indispensables (username, password)" });
                }
                // Superusuario base ROOT desde .env
                if (user.username === "root" && user.password === process.env.ROOT_KEY) {
                    const token = generateToken({ username: "root", role: "root" });
                    return resolve({ data: { token: token }, message: "Iniciaste Sesion como ROOT" });
                }
                // Usuarios en base de datos (admin, supervisor, user)
                const usuarioEncontrado = await usuariosModels.searchUser(user.username);
                if (usuarioEncontrado.rows.length === 0) {
                    return reject({ data: null, message: "Usuario no encontrado" });
                }
                if (bcrypt.compareSync(user.password, usuarioEncontrado.rows[0].password)) {
                    const token = generateToken(usuarioEncontrado.rows[0]);
                    return resolve({ data: { token: token }, message: "Iniciaste Sesion" });
                } else {
                    return reject({ data: null, message: "Credenciales Invalidas" });
                }
            } catch (error) {
                return reject({ data: null, message: error.message || error });
            }
        });
    }
}

const usuariosControllers = new UsuariosControllers();
export default usuariosControllers;