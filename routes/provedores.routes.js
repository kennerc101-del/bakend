import express from "express";
import provedoresController from "../controllers/provedores.controller.js";
const router = express.Router();

router.get('/todos', function(req, res, next) {
  const response = provedoresController.listarTodos();
  res.status(response.status).json({
    status: response.status,
    data: response.data,
    message: response.message
  });
});

router.get('/uno/:id', function(req, res, next) {
  const response = provedoresController.listarUno(req.params.id);
  res.status(response.status).json({
    status: response.status,
    data: response.data,
    message: response.message
  });
});

router.post('/agregar', function(req, res, next) {
  const response = provedoresController.crearUno(req.body);
  res.status(response.status).json({
    status: response.status,
    data: response.data,
    message: response.message
  });
});

router.put('/actualizar/:id', function(req, res, next) {
  const response = provedoresController.actualizarUno(req.body, req.params.id);
  res.status(response.status).json({
    status: response.status,
    data: response.data,
    message: response.message
  });
});

router.delete('/eliminar/:id', function(req, res, next) {
  const response = provedoresController.eliminarUno(req.params.id);
  res.status(response.status).json({
    status: response.status,
    data: response.data,
    message: response.message
  });
});

export default router;
