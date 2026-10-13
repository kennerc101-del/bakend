import { provedores } from "../db/db.js"
import { v4 as uuidv4 } from 'uuid';

class ProvedoresController {
listarTodos(){
return({
    status: provedores.length === 0 ? 400 : 200,
    data: provedores.length === 0 ? null : provedores,
    message: provedores.length === 0 ? "no hay provedores" : "provedores listados",
})
}
listarUno(idProvedor){
    const provedorSeleccionado = provedores.filter(provedor => provedor.id === idProvedor)
return({
    status: provedorSeleccionado.length === 0 ? 400 : 200,
    data: provedorSeleccionado.length === 0 ? null : provedorSeleccionado,
    message: provedorSeleccionado.length === 0 ? "no hay provedores" : "provedor listado",
})
}
crearUno(nuevoProvedor){
    if (!nuevoProvedor.nombre || !nuevoProvedor.lugar || !nuevoProvedor.dueño) {
        return({
    data: 400 ,
    data: null ,
    message: "faltan datos necesarios",
})
    } 

    const provedorAgregar = {
        id: uuidv4(),
        nombre: nuevoProvedor.nombre,
        lugar: nuevoProvedor.lugar,
        dueño: nuevoProvedor.dueño,

    }
    provedores.push(provedorAgregar)
    return({
   status: 200,
    data: {
        provedorAgregar,
        provedores
    },
    message: "provedores agregados correctamente",
    })

}

atualizarUno(nuevoProvedor, idProvedor){
    for (let i = 0; i < provedores.length; i++) {
      if (provedores[i].id === idProvedor){
        provedores[i].nombre = !nuevoProvedor.nombre ? provedores[i].nombre : nuevoProvedor.nombre,
        provedores[i].lugar = !nuevoProvedor.lugar ? provedores[i].lugar : nuevoProvedor.lugar,
        provedores[i].dueño = !nuevoProvedor.dueño ? provedores[i].dueño : nuevoProvedor.dueño
        return({
   status: 200,
    data: {
        provedorActualizado : provedores[i],
        provedores
    },
    message: "provedor actualizado correctamente",
    })

      }
        
    }
     return({
   status: 400,
    data: null,
    message: "no se encontro el provedor",
    })
}

eliminarUno(idProvedor){
    for (let i = 0; i < provedores.length; i++) {
  
        if (provedores[i].id === idProvedor){
            provedores.splice(i, 1)
            return({
   status: 200,
    data: {
        provedores
    },
    message: "provedor eliminado correctamente",
    })

        }
        
    }
    return({
   status: 400,
    data: null,
    message: "no se encontro el provedor",
    })
}
}



const provedoresController = new ProvedoresController
export default provedoresController