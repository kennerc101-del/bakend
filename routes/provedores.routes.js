import express from "express";
import provedoresController from "../controllers/provedores.controller.js";
const router = express.Router();

router.get('/todos', async function(req, res, next) {
    try {
        const response = await provedoresController.listarTodos();
        res.status(200).json({ data: response.data, message: response.message });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/uno/:id', async function(req, res, next) {
    try {
        const response = await provedoresController.listarUno(req.params.id);
        res.status(200).json({ data: response.data, message: response.message });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/agregar', async function(req, res, next) {
    try {
        const response = await provedoresController.crearUno(req.body);
        res.status(201).json({ data: response.data, message: response.message });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/actualizar/:id', async function(req, res, next) {
    try {
        const response = await provedoresController.atualizarUno(req.body, req.params.id);
        res.status(200).json({ data: response.data, message: response.message });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/eliminar/:id', async function(req, res, next) {
    try {
        const response = await provedoresController.eliminarUno(req.params.id);
        res.status(200).json({ data: response.data, message: response.message });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;