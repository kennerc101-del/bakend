import express from "express";
import empleadosController from "../controllers/empleados.controller.js";
const router = express.Router();

/* GET home page. */
router.get('/todos', async function(req, res, next) {
    try {
        const response = await empleadosController.listarTodos();
        res.status(200).json({ data: response.data, message: response.message });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/uno/:id', function(req, res, next) {
  const response = empleadosController.listarUno(req.params.id);
  if (response.data === null){
    res.status(400).json({
      status: response.status,
      data: response.data,
      message: response.message
    })
  } else {
    res.status(200).json({
      status: response.status,
      data: response.data,
      message: response.message
    })
  }
});

router.post('/agregar', function(req, res, next) {
  const response = empleadosController.crearUno(req.body);
  if (response.data === null){
    res.status(400).json({
      status: response.status,
      data: response.data,
      message: response.message
    })
  } else {
    res.status(200).json({
      status: response.status,
      data: response.data,
      message: response.message
    })
  }
});

router.put('/actualizar/:id', function(req, res, next) {
  const response = empleadosController.actualizarUno(req.body, req.params.id);
  if (response.data === null){
    res.status(400).json({
      status: response.status,
      data: response.data,
      message: response.message
    })
  } else {
    res.status(200).json({
      status: response.status,
      data: response.data,
      message: response.message
    })
  }
});

router.delete('/eliminar/:id', function(req, res, next) {
  const response = empleadosController.eliminarUno(req.params.id);
  if (response.data === null){
    res.status(400).json({
      status: response.status,
      data: response.data,
      message: response.message
    })
  } else {
    res.status(200).json({
      status: response.status,
      data: response.data,
      message: response.message
    })
  }
});

export default router;