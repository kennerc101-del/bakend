import { v4 as uuidv4 } from 'uuid';
import pool from '../db/connection.js';

class ProvedoresController {
    
    async listarTodos() {
        try {
            const [rows] = await pool.query('SELECT * FROM provedores');
            
            return ({
                status: rows.length === 0 ? 400 : 200,
                provedores: rows.length === 0 ? null : rows,
                message: rows.length === 0 ? "no hay proveedores" : "proveedores listados correctamente",
            });
        } catch (error) {
            return ({
                status: 500,
                error: error.message,
                message: "fallo al listar los proveedores"
            });
        }
    }

    async listarUno(idProveedor) {
        try {
            const [rows] = await pool.query('SELECT * FROM provedores WHERE id = ?', [idProveedor]);
            
            return ({
                status: rows.length === 0 ? 400 : 200,
                proveedor: rows.length === 0 ? null : rows[0],
                message: rows.length === 0 ? "no se encontró el proveedor" : "proveedor listado correctamente",
            });
        } catch (error) {
            return ({
                status: 500,
                error: error.message,
                message: "fallo al buscar el proveedor"
            });
        }
    }

    async crearUno(nuevoProveedor) {
        if (!nuevoProveedor.nombre || !nuevoProveedor.lugar || !nuevoProveedor.dueño) {
            return ({
                status: 400,
                proveedor: null,
                message: "faltan datos necesarios",
            });
        } 

        try {
            const id = uuidv4();

            const [result] = await pool.query(
                'INSERT INTO provedores (id, nombre, lugar, dueño) VALUES (?, ?, ?, ?)',
                [
                    id, 
                    nuevoProveedor.nombre, 
                    nuevoProveedor.lugar, 
                    nuevoProveedor.dueño
                ]
            );

            if (result.affectedRows === 0) {
                return ({
                    status: 400,
                    proveedor: null,
                    message: "no se pudo registrar el proveedor",
                });
            }

            const [rows] = await pool.query('SELECT * FROM provedores WHERE id = ?', [id]);
            
            return ({
                status: 200,
                nuevoProveedor: rows[0],
                message: "proveedor añadido correctamente"
            });

        } catch (error) {
            return ({
                status: 500,
                error: error.message,
                message: "fallo al insertar el proveedor"
            });
        }
    }

    async actualizarUno(nuevoProveedor, idProveedor) {
        try {
            const [rows] = await pool.query('SELECT * FROM provedores WHERE id = ?', [idProveedor]);
            if (rows.length === 0) {
                return ({
                    status: 400,
                    proveedor: null,
                    message: "no se encontró el proveedor",
                });
            }

            const nombre = nuevoProveedor.nombre || rows[0].nombre;
            const lugar = nuevoProveedor.lugar || rows[0].lugar;
            const dueño = nuevoProveedor.dueño || rows[0].dueño;

            await pool.query(
                'UPDATE provedores SET nombre = ?, lugar = ?, dueño = ? WHERE id = ?',
                [nombre, lugar, dueño, idProveedor]
            );

            const [rowsActualizados] = await pool.query('SELECT * FROM provedores WHERE id = ?', [idProveedor]);

            return ({
                status: 200,
                proveedorActualizado: rowsActualizados[0],
                message: "proveedor actualizado correctamente",
            });
        } catch (error) {
            return ({
                status: 500,
                error: error.message,
                message: "fallo al actualizar el proveedor"
            });
        }
    }

    async eliminarUno(idProveedor) {
        try {
            const [rows] = await pool.query('SELECT * FROM provedores WHERE id = ?', [idProveedor]);
            if (rows.length === 0) {
                return ({
                    status: 400,
                    proveedor: null,
                    message: "no se encontró el proveedor",
                });
            }

            await pool.query('DELETE FROM provedores WHERE id = ?', [idProveedor]);

            return ({
                status: 200,
                proveedorEliminado: rows[0],
                message: "proveedor eliminado correctamente",
            });
        } catch (error) {
            return ({
                status: 500,
                error: error.message,
                message: "fallo al eliminar el proveedor"
            });
        }
    }
}

const provedoresController = new ProvedoresController();
export default provedoresController;