import { provedores, equiposTec } from "../db/db.js"
import { v4 as uuidv4 } from 'uuid';

class EquiposTecController {
    listarTodos() {
        return ({
            status: equiposTec.length === 0 ? 400 : 200,
            data: equiposTec.length === 0 ? null : equiposTec,
            message: equiposTec.length === 0 ? "no hay equipos tecnológicos" : "equipos tecnológicos listados",
        })
    }

    listarUno(idEquipoTec) {
        const equipoTecSeleccionado = equiposTec.filter(equipoTec => equipoTec.id === idEquipoTec)
        return ({
            status: equipoTecSeleccionado.length === 0 ? 400 : 200,
            data: equipoTecSeleccionado.length === 0 ? null : equipoTecSeleccionado,
            message: equipoTecSeleccionado.length === 0 ? "no hay equipos tecnológicos" : "equipo tecnológico listado",
        })
    }

    listarEquiposTecProvedor(idProvedor) { 
        const equipoTecSeleccionados = equiposTec.filter(equipoTec => equipoTec.idProvedor === idProvedor)
        const provedoreSeleccionado = provedores.filter(provedor => provedor.id === idProvedor)
        return ({
            status: equipoTecSeleccionados.length === 0 ? 400 : 200,
            data: equipoTecSeleccionados.length === 0 ? null : {
                provedor: provedoreSeleccionado[0],
                equipoTec: equipoTecSeleccionados
            },
            message: equipoTecSeleccionados.length === 0 ? "no hay equipos tecnológicos de ese provedor" : "equipo tecnológico listado",
        })
    }

    crearUno(nuevoEquipoTec, idProvedor) {
        if (!nuevoEquipoTec.nombre || !nuevoEquipoTec.precio || !nuevoEquipoTec.modelo) {
            return ({
                status: 400,
                data: null,
                message: "faltan datos necesarios",
            })
        } 
        const existenciaProvedor = provedores.filter(provedor => provedor.id === idProvedor)
        if (existenciaProvedor.length === 0) {
            return ({
                status: 400,
                data: null,
                message: "provedor no encontrado",
            })
        }

        const equipoTecAgregar = {
            id: uuidv4(),
            idProvedor: idProvedor,
            nombre: nuevoEquipoTec.nombre,
            precio: nuevoEquipoTec.precio,
            modelo: nuevoEquipoTec.modelo,
        }

        equiposTec.push(equipoTecAgregar)

        return ({
            status: 200,
            data: {
                equipoTecAgregar,
                equiposTec
            },
            message: "equipos tecnológicos agregados correctamente",
        })
    }

    actualizarUno(nuevoEquipoTec, idEquipoTec) {
        for (let i = 0; i < equiposTec.length; i++) {
            if (equiposTec[i].id === idEquipoTec) {
                equiposTec[i].nombre = !nuevoEquipoTec.nombre ? equiposTec[i].nombre : nuevoEquipoTec.nombre;
                equiposTec[i].precio = !nuevoEquipoTec.precio ? equiposTec[i].precio : nuevoEquipoTec.precio;
                equiposTec[i].modelo = !nuevoEquipoTec.modelo ? equiposTec[i].modelo : nuevoEquipoTec.modelo;
                
                return ({
                    status: 200,
                    data: {
                        equipoTecActualizado: equiposTec[i],
                        equiposTec
                    },
                    message: "equipo tecnológico actualizado correctamente",
                })
            }
        }
        
        return ({
            status: 400,
            data: null,
            message: "no se encontró el equipo tecnológico",
        })
    }

    eliminarUno(idEquipoTec) {
        for (let i = 0; i < equiposTec.length; i++) {
            if (equiposTec[i].id === idEquipoTec) {
                equiposTec.splice(i, 1)
                return ({
                    status: 200,
                    data: {
                        equiposTec
                    },
                    message: "equipo tecnológico eliminado correctamente",
                })
            }
        }
        
        return ({
            status: 400,
            data: null,
            message: "no se encontró el equipo tecnológico",
        })
    }
}

const equiposTecController = new EquiposTecController();
export default equiposTecController;