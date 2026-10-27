import { v4 as uuidv4 } from 'uuid';
import pool from '../db/connection.js';

class EquiposController {
    
    async listarTodos() {
        try {
            const [rows] = await pool.query('SELECT * FROM equipos_tec');
            
            return ({
                status: rows.length === 0 ? 400 : 200,
                equipos: rows.length === 0 ? null : rows,
                message: rows.length === 0 ? "no hay equipos" : "equipos listados correctamente",
            });
        } catch (error) {
            return ({
                status: 500,
                error: error.message,
                message: "fallo al listar los equipos"
            });
        }
    }

    async listarUno(idEquipo) {
        try {
            const [rows] = await pool.query('SELECT * FROM equipos_tec WHERE id = ?', [idEquipo]);
            
            return ({
                status: rows.length === 0 ? 400 : 200,
                equipo: rows.length === 0 ? null : rows[0],
                message: rows.length === 0 ? "no se encontró el equipo" : "equipo listado correctamente",
            });
        } catch (error) {
            return ({
                status: 500,
                error: error.message,
                message: "fallo al buscar el equipo"
            });
        }
    }

    async listarPorProveedor(idProvedor) {
        try {
            const [rows] = await pool.query('SELECT * FROM equipos_tec WHERE idProvedor = ?', [idProvedor]);
            
            return ({
                status: rows.length === 0 ? 400 : 200,
                equipos: rows.length === 0 ? null : rows,
                message: rows.length === 0 ? "no hay equipos para este proveedor" : "equipos por proveedor listados correctamente",
            });
        } catch (error) {
            return ({
                status: 500,
                error: error.message,
                message: "fallo al buscar equipos por proveedor"
            });
        }
    }

    async crearUno(nuevoEquipo, idProvedor) {
        if (!nuevoEquipo.nombre || !nuevoEquipo.precio || !nuevoEquipo.modelo || !idProvedor) {
            return ({
                status: 400,
                equipo: null,
                message: "faltan datos necesarios",
            });
        } 

        try {
            const id = uuidv4();

            const [result] = await pool.query(
                'INSERT INTO equipos_tec (id, idProvedor, nombre, precio, modelo) VALUES (?, ?, ?, ?, ?)',
                [
                    id, 
                    idProvedor, 
                    nuevoEquipo.nombre, 
                    nuevoEquipo.precio, 
                    nuevoEquipo.modelo
                ]
            );

            if (result.affectedRows === 0) {
                return ({
                    status: 400,
                    equipo: null,
                    message: "no se pudo registrar el equipo",
                });
            }

            const [rows] = await pool.query('SELECT * FROM equipos_tec WHERE id = ?', [id]);
            
            return ({
                status: 200,
                nuevoEquipo: rows[0],
                message: "equipo añadido correctamente"
            });

        } catch (error) {
            return ({
                status: 500,
                error: error.message,
                message: "fallo al insertar el equipo"
            });
        }
    }

    async actualizarUno(nuevoEquipo, idEquipo) {
        try {
            const [rows] = await pool.query('SELECT * FROM equipos_tec WHERE id = ?', [idEquipo]);
            if (rows.length === 0) {
                return ({
                    status: 400,
                    equipo: null,
                    message: "no se encontró el equipo",
                });
            }

            const nombre = nuevoEquipo.nombre || rows[0].nombre;
            const precio = nuevoEquipo.precio || rows[0].precio;
            const modelo = nuevoEquipo.modelo || rows[0].modelo;

            await pool.query(
                'UPDATE equipos_tec SET nombre = ?, precio = ?, modelo = ? WHERE id = ?',
                [nombre, precio, modelo, idEquipo]
            );

            const [rowsActualizados] = await pool.query('SELECT * FROM equipos_tec WHERE id = ?', [idEquipo]);

            return ({
                status: 200,
                equipoActualizado: rowsActualizados[0],
                message: "equipo actualizado correctamente",
            });
        } catch (error) {
            return ({
                status: 500,
                error: error.message,
                message: "fallo al actualizar el equipo"
            });
        }
    }

    async eliminarUno(idEquipo) {
        try {
            const [rows] = await pool.query('SELECT * FROM equipos_tec WHERE id = ?', [idEquipo]);
            if (rows.length === 0) {
                return ({
                    status: 400,
                    equipo: null,
                    message: "no se encontró el equipo",
                });
            }

            await pool.query('DELETE FROM equipos_tec WHERE id = ?', [idEquipo]);

            return ({
                status: 200,
                equipoEliminado: rows[0],
                message: "equipo eliminado correctamente",
            });
        } catch (error) {
            return ({
                status: 500,
                error: error.message,
                message: "fallo al eliminar el equipo"
            });
        }
    }
}

const equiposController = new EquiposController();
export default equiposController;