import empleadosModel from "../models/empleados.model.js";

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

    listarUno(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const empleado = await empleadosModel.oneEmpleado(id);
                if (empleado.rows.length === 0) {
                    return reject({ data: null, message: "No se encontró el empleado" });
                }
                return resolve({ data: empleado.rows, message: "Empleado encontrado con éxito" });
            } catch (error) {
                return reject({ data: null, message: error.message });
            }
        });
    }

    crearUno(nuevo) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!nuevo.cedula || !nuevo.nombre || !nuevo.edad || !nuevo.pagoPorDia) {
                    return reject({ data: null, message: "Faltan datos indispensables" });
                }
                const dbRes = await empleadosModel.addEmpleado(nuevo);
                const creado = await this.listarUno(dbRes[0].insertId);
                return resolve({ data: creado.data, message: "Se agregó el empleado" });
            } catch (error) {
                return reject({ data: null, message: error.message });
            }
        });
    }

    atualizarUno(updateData, id) {
        return new Promise(async (resolve, reject) => {
            try {
                const actual = await this.listarUno(id);
                const emp = actual.data[0];

                emp.cedula = !updateData.cedula ? emp.cedula : updateData.cedula;
                emp.nombre = !updateData.nombre ? emp.nombre : updateData.nombre;
                emp.edad = !updateData.edad ? emp.edad : updateData.edad;
                emp.pagoPorDia = !updateData.pagoPorDia ? emp.pagoPorDia : updateData.pagoPorDia;

                await empleadosModel.updateEmpleado(emp, id);
                return resolve({ data: { empleadoActualizado: emp }, message: "Empleado actualizado correctamente" });
            } catch (error) {
                return reject({ data: null, message: error.message });
            }
        });
    }

    eliminarUno(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const seleccionado = await this.listarUno(id);
                await empleadosModel.deleteEmpleado(id);
                return resolve({ data: { empleadoEliminado: seleccionado.data[0] }, message: "Empleado eliminado exitosamente" });
            } catch (error) {
                return reject({ data: null, message: error.message });
            }
        });
    }
}

export default new EmpleadosController();