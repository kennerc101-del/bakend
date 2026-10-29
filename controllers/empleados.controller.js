import { empleados } from "../db/db.js"
import { v4 as uuidv4 } from 'uuid';

class EmpleadosController {
    
listarTodos() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await empleadosModel.allEmpleados();
                return resolve({
                    data: response.rows,
                    message: "empleados listados de la base de datos"
                });
            } catch (error) {
                return reject({ data: null, message: error.message });
            }
        });
    }

    listarUno(idEmpleado) {
        const empleadoSeleccionado = empleados.filter(empleado => empleado.id === idEmpleado)
        return ({
            status: empleadoSeleccionado.length === 0 ? 400 : 200,
            data: empleadoSeleccionado.length === 0 ? null : empleadoSeleccionado,
            message: empleadoSeleccionado.length === 0 ? "no hay empleados" : "empleado listado",
        })
    }

    crearUno(nuevoEmpleado) {
        if (!nuevoEmpleado.cedula || !nuevoEmpleado.nombre || !nuevoEmpleado.edad || !nuevoEmpleado.pagoPorDia) {
            return ({
                status: 400,
                data: null,
                message: "faltan datos necesarios",
            })
        } 

        const empleadoAgregar = {
            id: uuidv4(),
            cedula: nuevoEmpleado.cedula,
            nombre: nuevoEmpleado.nombre,
            edad: nuevoEmpleado.edad,
            pagoPorDia: nuevoEmpleado.pagoPorDia,
        }
        
        empleados.push(empleadoAgregar)
        
        return ({
            status: 200,
            data: {
                empleadoAgregar,
                empleados
            },
            message: "empleados agregados correctamente",
        })
    }

    atualizarUno(nuevoEmpleado, idEmpleado) {
        for (let i = 0; i < empleados.length; i++) {
            if (empleados[i].id === idEmpleado) {
                empleados[i].cedula = !nuevoEmpleado.cedula ? empleados[i].cedula : nuevoEmpleado.cedula;
                empleados[i].nombre = !nuevoEmpleado.nombre ? empleados[i].nombre : nuevoEmpleado.nombre;
                empleados[i].edad = !nuevoEmpleado.edad ? empleados[i].edad : nuevoEmpleado.edad;
                empleados[i].pagoPorDia = !nuevoEmpleado.pagoPorDia ? empleados[i].pagoPorDia : nuevoEmpleado.pagoPorDia;
                
                return ({
                    status: 200,
                    data: {
                        empleadoActualizado: empleados[i],
                        empleados
                    },
                    message: "empleado actualizado correctamente",
                })
            }
        }
        
        return ({
            status: 400,
            data: null,
            message: "no se encontro el empleado",
        })
    }

    eliminarUno(idEmpleado) {
        for (let i = 0; i < empleados.length; i++) {
            if (empleados[i].id === idEmpleado) {
                empleados.splice(i, 1)
                return ({
                    status: 200,
                    data: {
                        empleados
                    },
                    message: "empleado eliminado correctamente",
                })
            }
        }
        
        return ({
            status: 400,
            data: null,
            message: "no se encontro el empleado",
        })
    }
}

const empleadosController = new EmpleadosController();
export default empleadosController;