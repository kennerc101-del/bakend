import express from "express";
import empleadosController from "../controllers/empleados.controller.js";
const router = express.Router();

/* GET listar todos */
router.get('/todos', async function(req, res, next) {
    try {
        const response = await empleadosController.listarTodos();
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
    }
});

/* GET listar uno por ID */
router.get('/uno/:id', async function(req, res, next) {
    try {
        const response = await empleadosController.listarUno(req.params.id);
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
    }
});

/* POST agregar empleado */
router.post('/agregar', async function(req, res, next) {
    try {
        const response = await empleadosController.crearUno(req.body);
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
    }
});

/* PUT actualizar empleado */
router.put('/actualizar/:id', async function(req, res, next) {
    try {
        const response = await empleadosController.actualizarUno(req.body, req.params.id);
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
    }
});

/* DELETE eliminar empleado */
router.delete('/eliminar/:id', async function(req, res, next) {
    try {
        const response = await empleadosController.eliminarUno(req.params.id);
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
    }
});

export default router;