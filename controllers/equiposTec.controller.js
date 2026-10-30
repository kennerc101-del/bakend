import equiposTecModel from "../models/equiposTec.model.js";
import provedoresModel from "../models/provedores.model.js";

class EquiposTecController {
    listarTodos() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await equiposTecModel.allEquipos();
                return resolve({ data: response.rows, message: "equipos tecnológicos listados" });
            } catch (error) {
                return reject({ data: null, message: error.message });
            }
        });
    }

    listarUno(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const eq = await equiposTecModel.oneEquipo(id);
                if (eq.rows.length === 0) {
                    return reject({ data: null, message: "No se encontró el equipo tecnológico" });
                }
                return resolve({ data: eq.rows, message: "Equipo tecnológico encontrado" });
            } catch (error) {
                return reject({ data: null, message: error.message });
            }
        });
    }

    listarEquiposTecProvedor(idProvedor) {
        return new Promise(async (resolve, reject) => {
            try {
                const prov = await provedoresModel.oneProvedor(idProvedor);
                if (prov.rows.length === 0) {
                    return reject({ data: null, message: "Proveedor no encontrado" });
                }
                const equipos = await equiposTecModel.equiposPorProveedor(idProvedor);
                return resolve({
                    data: {
                        provedor: prov.rows[0],
                        equipoTec: equipos.rows
                    },
                    message: "Equipos por proveedor listados correctamente"
                });
            } catch (error) {
                return reject({ data: null, message: error.message });
            }
        });
    }

    crearUno(nuevo, idProvedor) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!nuevo.nombre || !nuevo.precio || !nuevo.modelo) {
                    return reject({ data: null, message: "Faltan datos necesarios" });
                }
                const prov = await provedoresModel.oneProvedor(idProvedor);
                if (prov.rows.length === 0) {
                    return reject({ data: null, message: "Proveedor no encontrado" });
                }

                const dbRes = await equiposTecModel.addEquipo(nuevo, idProvedor);
                const creado = await this.listarUno(dbRes[0].insertId);
                return resolve({ data: creado.data, message: "Equipo tecnológico agregado correctamente" });
            } catch (error) {
                return reject({ data: null, message: error.message });
            }
        });
    }

    actualizarUno(updateData, id) {
        return new Promise(async (resolve, reject) => {
            try {
                const actual = await this.listarUno(id);
                const eq = actual.data[0];

                eq.nombre = !updateData.nombre ? eq.nombre : updateData.nombre;
                eq.precio = !updateData.precio ? eq.precio : updateData.precio;
                eq.modelo = !updateData.modelo ? eq.modelo : updateData.modelo;

                await equiposTecModel.updateEquipo(eq, id);
                return resolve({ data: { equipoTecActualizado: eq }, message: "Equipo actualizado correctamente" });
            } catch (error) {
                return reject({ data: null, message: error.message });
            }
        });
    }

    eliminarUno(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const seleccionado = await this.listarUno(id);
                await equiposTecModel.deleteEquipo(id);
                return resolve({ data: { equipoTecEliminado: seleccionado.data[0] }, message: "Equipo eliminado exitosamente" });
            } catch (error) {
                return reject({ data: null, message: error.message });
            }
        });
    }
}

export default new EquiposTecController();