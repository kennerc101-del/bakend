import express from "express";
import equiposTecController from "../controllers/equiposTec.controller.js";
const router = express.Router();

router.get('/todos', async function(req, res, next) {
    try {
        const response = await equiposTecController.listarTodos();
        res.status(200).json({ data: response.data, message: response.message });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/uno/:id', async function(req, res, next) {
    try {
        const response = await equiposTecController.listarUno(req.params.id);
        res.status(200).json({ data: response.data, message: response.message });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/equipoPorProvedor/:idProvedor', async function(req, res, next) {
    try {
        const response = await equiposTecController.listarEquiposTecProvedor(req.params.idProvedor);
        res.status(200).json({ data: response.data, message: response.message });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/agregar/:idProvedor', async function(req, res, next) {
    try {
        const response = await equiposTecController.crearUno(req.body, req.params.idProvedor);
        res.status(201).json({ data: response.data, message: response.message });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/actualizar/:id', async function(req, res, next) {
    try {
        const response = await equiposTecController.actualizarUno(req.body, req.params.id);
        res.status(200).json({ data: response.data, message: response.message });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/eliminar/:id', async function(req, res, next) {
    try {
        const response = await equiposTecController.eliminarUno(req.params.id);
        res.status(200).json({ data: response.data, message: response.message });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;