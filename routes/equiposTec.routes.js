import express from "express";
import equiposTecController from "../controllers/equiposTec.controller.js";
import { verifyToken } from "../middlewares/auth.js";
const router = express.Router();

// PÚBLICO (Sin Login)
router.get('/todos', async function(req, res) {
    try {
        const response = await equiposTecController.listarTodos();
        res.status(200).json({ data: response.data, message: response.message });
    } catch (error) { res.status(400).json({ message: error.message }); }
});

router.get('/uno/:id', function(req, res, next) {
    if (verifyToken(req.headers['authorization'], ["root", "admin", "supervisor", "user"])) next();
    else res.status(403).json({ message: "Advertencia: Debes iniciar sesión" });
}, async function(req, res) {
    try {
        const response = await equiposTecController.listarUno(req.params.id);
        res.status(200).json({ data: response.data, message: response.message });
    } catch (error) { res.status(400).json({ message: error.message }); }
});

router.post('/agregar', function(req, res, next) {
    if (verifyToken(req.headers['authorization'], ["root", "admin", "supervisor", "user"])) next();
    else res.status(403).json({ message: "Advertencia: Rol no autorizado para registrar equipos" });
}, async function(req, res) {
    try {
        const response = await equiposTecController.crearUno(req.body);
        res.status(201).json({ data: response.data, message: response.message });
    } catch (error) { res.status(400).json({ message: error.message }); }
});

router.put('/actualizar/:id', function(req, res, next) {
    if (verifyToken(req.headers['authorization'], ["root", "admin", "supervisor"])) next();
    else res.status(403).json({ message: "Advertencia: Un usuario normal no puede modificar equipos" });
}, async function(req, res) {
    try {
        const response = await equiposTecController.atualizarUno(req.body, req.params.id);
        res.status(200).json({ data: response.data, message: response.message });
    } catch (error) { res.status(400).json({ message: error.message }); }
});

router.delete('/eliminar/:id', function(req, res, next) {
    if (verifyToken(req.headers['authorization'], ["root", "admin"])) next();
    else res.status(403).json({ message: "Advertencia: Solo root o admin pueden eliminar equipos" });
}, async function(req, res) {
    try {
        const response = await equiposTecController.eliminarUno(req.params.id);
        res.status(200).json({ data: response.data, message: response.message });
    } catch (error) { res.status(400).json({ message: error.message }); }
});

export default router;