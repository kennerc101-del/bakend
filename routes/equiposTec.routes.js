import express from "express";
import equiposTecController from "../controllers/equiposTec.controller.js";
const router = express.Router();

/* GET listar todos los equipos tecnológicos */
router.get('/todos', async function(req, res, next) {
    try {
        const response = await equiposTecController.listarTodos();
        res.status(200).json({
            status: 200,
            data: response,
            message: response.length === 0 ? "no hay equipos" : "equipos listados correctamente"
        });
    } catch (error) {
        res.status(500).json({ status: 500, data: null, message: error.message });
    }
});

/* GET listar un equipo tecnológico por su ID */
router.get('/uno/:id', async function(req, res, next) {
    try {
        const response = await equiposTecController.listarPorId(req.params.id);
        const status = response ? 200 : 400;
        res.status(status).json({
            status: status,
            data: response,
            message: response ? "equipo listado correctamente" : "no se encontró el equipo"
        });
    } catch (error) {
        res.status(500).json({ status: 500, data: null, message: error.message });
    }
});

/* GET listar equipos tecnológicos asociados a un proveedor específico */
router.get('/equipoPorProvedor/:idProvedor', async function(req, res, next) {
    try {
        const response = await equiposTecController.listarPorProveedor(req.params.idProvedor);
        res.status(200).json({
            status: 200,
            data: response,
            message: response.length === 0 ? "no hay equipos para este proveedor" : "equipos por proveedor listados correctamente"
        });
    } catch (error) {
        res.status(500).json({ status: 500, data: null, message: error.message });
    }
});

/* POST agregar un equipo tecnológico asignado a un proveedor */
router.post('/agregar/:idProvedor', async function(req, res, next) {
    try {
        const response = await equiposTecController.crear(req.body, req.params.idProvedor);
        res.status(200).json({
            status: 200,
            data: response,
            message: "equipo añadido correctamente"
        });
    } catch (error) {
        res.status(500).json({ status: 500, data: null, message: error.message });
    }
});

/* PUT actualizar un equipo tecnológico por su ID */
router.put('/actualizar/:id', async function(req, res, next) {
    try {
        const response = await equiposTecController.actualizar(req.params.id, req.body);
        const status = response ? 200 : 400;
        res.status(status).json({
            status: status,
            data: response,
            message: response ? "equipo actualizado correctamente" : "no se encontró el equipo"
        });
    } catch (error) {
        res.status(500).json({ status: 500, data: null, message: error.message });
    }
});

/* DELETE eliminar un equipo tecnológico por su ID */
router.delete('/eliminar/:id', async function(req, res, next) {
    try {
        const response = await equiposTecController.eliminar(req.params.id);
        const status = response ? 200 : 400;
        res.status(status).json({
            status: status,
            data: response,
            message: response ? "equipo eliminado correctamente" : "no se encontró el equipo"
        });
    } catch (error) {
        res.status(500).json({ status: 500, data: null, message: error.message });
    }
});

export default router;