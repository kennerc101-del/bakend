import express from "express";
import provedoresController from "../controllers/provedores.controller.js";
const router = express.Router();

router.get('/todos', async function(req, res, next) {
    try {
        const response = await provedoresController.listarTodos();
        res.status(200).json({
            status: 200,
            data: response,
            message: response.length === 0 ? "no hay proveedores" : "proveedores listados correctamente"
        });
    } catch (error) {
        res.status(500).json({ status: 500, data: null, message: error.message });
    }
});

router.get('/uno/:id', async function(req, res, next) {
    try {
        const response = await provedoresController.listarPorId(req.params.id);
        const status = response ? 200 : 400;
        res.status(status).json({
            status: status,
            data: response,
            message: response ? "proveedor listado correctamente" : "no se encontró el proveedor"
        });
    } catch (error) {
        res.status(500).json({ status: 500, data: null, message: error.message });
    }
});

router.post('/agregar', async function(req, res, next) {
    try {
        const response = await provedoresController.crear(req.body);
        res.status(200).json({
            status: 200,
            data: response,
            message: "proveedor añadido correctamente"
        });
    } catch (error) {
        res.status(500).json({ status: 500, data: null, message: error.message });
    }
});

router.put('/actualizar/:id', async function(req, res, next) {
    try {
        const response = await provedoresController.actualizar(req.params.id, req.body);
        const status = response ? 200 : 400;
        res.status(status).json({
            status: status,
            data: response,
            message: response ? "proveedor actualizado correctamente" : "no se encontró el proveedor"
        });
    } catch (error) {
        res.status(500).json({ status: 500, data: null, message: error.message });
    }
});

router.delete('/eliminar/:id', async function(req, res, next) {
    try {
        const response = await provedoresController.eliminar(req.params.id);
        const status = response ? 200 : 400;
        res.status(status).json({
            status: status,
            data: response,
            message: response ? "proveedor eliminado correctamente" : "no se encontró el proveedor"
        });
    } catch (error) {
        res.status(500).json({ status: 500, data: null, message: error.message });
    }
});

export default router;