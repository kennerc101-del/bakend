import express from "express";
import equiposTecController from "../controllers/equiposTec.controller.js";
const router = express.Router();

/* GET listar todos los equipos tecnológicos */
router.get('/todos', function(req, res, next) {
  const response = equiposTecController.listarTodos();
  res.status(response.status).json({
    status: response.status,
    data: response.data,
    message: response.message
  });
});

/* GET listar un equipo tecnológico por su ID */
router.get('/uno/:id', function(req, res, next) {
  const response = equiposTecController.listarUno(req.params.id);
  res.status(response.status).json({
    status: response.status,
    data: response.data,
    message: response.message
  });
});

/* GET listar equipos tecnológicos asociados a un proveedor específico */
router.get('/equipoPorProvedor/:idProvedor', function(req, res, next) {
  const response = equiposTecController.listarEquiposTecProvedor(req.params.idProvedor);
  res.status(response.status).json({
    status: response.status,
    data: response.data,
    message: response.message
  });
});

/* POST agregar un equipo tecnológico asignado a un proveedor */
router.post('/agregar/:idProvedor', function(req, res, next) {
  const response = equiposTecController.crearUno(req.body, req.params.idProvedor);
  res.status(response.status).json({
    status: response.status,
    data: response.data,
    message: response.message
  });
});

/* PUT actualizar un equipo tecnológico por su ID */
router.put('/actualizar/:id', function(req, res, next) {
  const response = equiposTecController.actualizarUno(req.body, req.params.id);
  res.status(response.status).json({
    status: response.status,
    data: response.data,
    message: response.message
  });
});

/* DELETE eliminar un equipo tecnológico por su ID */
router.delete('/eliminar/:id', function(req, res, next) {
  const response = equiposTecController.eliminarUno(req.params.id);
  res.status(response.status).json({
    status: response.status,
    data: response.data,
    message: response.message
  });
});

export default router;