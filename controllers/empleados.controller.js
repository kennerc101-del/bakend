import { v4 as uuidv4 } from 'uuid';
import pool from '../db/connection.js';

class EmpleadosController {
    
    async listarTodos() {
        try {
            const [rows] = await pool.query('SELECT * FROM empleados');
            
            return ({
                status: rows.length === 0 ? 400 : 200,
                empleados: rows.length === 0 ? null : rows,
                message: rows.length === 0 ? "no hay empleados" : "empleados listados correctamente",
            });
        } catch (error) {
            return ({
                status: 500,
                error: error.message,
                message: "fallo al listar los empleados"
            });
        }
    }

    async listarUno(idEmpleado) {
        try {
            const [rows] = await pool.query('SELECT * FROM empleados WHERE id = ?', [idEmpleado]);
            
            return ({
                status: rows.length === 0 ? 400 : 200,
                empleado: rows.length === 0 ? null : rows[0],
                message: rows.length === 0 ? "no se encontró el empleado" : "empleado listado correctamente",
            });
        } catch (error) {
            return ({
                status: 500,
                error: error.message,
                message: "fallo al buscar el empleado"
            });
        }
    }

    async crearUno(nuevoEmpleado) {
        if (!nuevoEmpleado.cedula || !nuevoEmpleado.nombre || !nuevoEmpleado.edad || !nuevoEmpleado.pagoPorDia) {
            return ({
                status: 400,
                empleado: null,
                message: "faltan datos necesarios",
            });
        } 

        try {
            const id = uuidv4();

            const [result] = await pool.query(
                'INSERT INTO empleados (id, cedula, nombre, edad, pagoPorDia) VALUES (?, ?, ?, ?, ?)',
                [
                    id, 
                    nuevoEmpleado.cedula, 
                    nuevoEmpleado.nombre, 
                    nuevoEmpleado.edad, 
                    nuevoEmpleado.pagoPorDia
                ]
            );

            if (result.affectedRows === 0) {
                return ({
                    status: 400,
                    empleado: null,
                    message: "no se pudo registrar el empleado",
                });
            }

            const [rows] = await pool.query('SELECT * FROM empleados WHERE id = ?', [id]);
            
            return ({
                status: 200,
                nuevoEmpleado: rows[0],
                message: "empleado añadido correctamente"
            });

        } catch (error) {
            return ({
                status: 500,
                error: error.message,
                message: "fallo al insertar el empleado"
            });
        }
    }

    async actualizarUno(nuevoEmpleado, idEmpleado) {
        try {
            const [rows] = await pool.query('SELECT * FROM empleados WHERE id = ?', [idEmpleado]);
            if (rows.length === 0) {
                return ({
                    status: 400,
                    empleado: null,
                    message: "no se encontró el empleado",
                });
            }

            const cedula = nuevoEmpleado.cedula || rows[0].cedula;
            const nombre = nuevoEmpleado.nombre || rows[0].nombre;
            const edad = nuevoEmpleado.edad || rows[0].edad;
            const pagoPorDia = nuevoEmpleado.pagoPorDia || rows[0].pagoPorDia;

            await pool.query(
                'UPDATE empleados SET cedula = ?, nombre = ?, edad = ?, pagoPorDia = ? WHERE id = ?',
                [cedula, nombre, edad, pagoPorDia, idEmpleado]
            );

            const [rowsActualizados] = await pool.query('SELECT * FROM empleados WHERE id = ?', [idEmpleado]);

            return ({
                status: 200,
                empleadoActualizado: rowsActualizados[0],
                message: "empleado actualizado correctamente",
            });
        } catch (error) {
            return ({
                status: 500,
                error: error.message,
                message: "fallo al actualizar el empleado"
            });
        }
    }

    async eliminarUno(idEmpleado) {
        try {
            const [rows] = await pool.query('SELECT * FROM empleados WHERE id = ?', [idEmpleado]);
            if (rows.length === 0) {
                return ({
                    status: 400,
                    empleado: null,
                    message: "no se encontró el empleado",
                });
            }

            await pool.query('DELETE FROM empleados WHERE id = ?', [idEmpleado]);

            return ({
                status: 200,
                empleadoEliminado: rows[0],
                message: "empleado eliminado correctamente",
            });
        } catch (error) {
            return ({
                status: 500,
                error: error.message,
                message: "fallo al eliminar el empleado"
            });
        }
    }
}

const empleadosController = new EmpleadosController();
export default empleadosController;