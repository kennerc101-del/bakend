import provedoresModel from "../models/provedores.model.js";

class ProvedoresController {
    listarTodos() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await provedoresModel.allProvedores();
                return resolve({ data: response.rows, message: "proveedores listados de la base de datos" });
            } catch (error) {
                return reject({ data: null, message: error.message });
            }
        });
    }

    listarUno(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const prov = await provedoresModel.oneProvedor(id);
                if (prov.rows.length === 0) {
                    return reject({ data: null, message: "No se encontró el proveedor" });
                }
                return resolve({ data: prov.rows, message: "Proveedor encontrado con éxito" });
            } catch (error) {
                return reject({ data: null, message: error.message });
            }
        });
    }

    crearUno(nuevo) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!nuevo.nombre || !nuevo.lugar || !nuevo.dueño) {
                    return reject({ data: null, message: "Faltan datos indispensables" });
                }
                const dbRes = await provedoresModel.addProvedor(nuevo);
                const creado = await this.listarUno(dbRes[0].insertId);
                return resolve({ data: creado.data, message: "Se agregó el proveedor" });
            } catch (error) {
                return reject({ data: null, message: error.message });
            }
        });
    }

    atualizarUno(updateData, id) {
        return new Promise(async (resolve, reject) => {
            try {
                const actual = await this.listarUno(id);
                const prov = actual.data[0];

                prov.nombre = !updateData.nombre ? prov.nombre : updateData.nombre;
                prov.lugar = !updateData.lugar ? prov.lugar : updateData.lugar;
                prov.dueño = !updateData.dueño ? prov.dueño : updateData.dueño;

                await provedoresModel.updateProvedor(prov, id);
                return resolve({ data: { provedorActualizado: prov }, message: "Proveedor actualizado correctamente" });
            } catch (error) {
                return reject({ data: null, message: error.message });
            }
        });
    }

    eliminarUno(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const seleccionado = await this.listarUno(id);
                await provedoresModel.deleteProvedor(id);
                return resolve({ data: { provedorEliminado: seleccionado.data[0] }, message: "Proveedor eliminado exitosamente" });
            } catch (error) {
                return reject({ data: null, message: error.message });
            }
        });
    }
}

export default new ProvedoresController();