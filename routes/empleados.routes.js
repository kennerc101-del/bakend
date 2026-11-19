import express from "express";
import empleadosController from "../controllers/empleados.controller.js";
import { verifyToken } from "../middlewares/auth.js";
const router = express.Router();

router.get('/todos', function(req, res, next) {
    if (verifyToken(req.headers['authorization'], ["root", "admin", "supervisor"])) next();
    else res.status(403).json({ message: "Advertencia: Acceso denegado a información privada de empleados" });
}, async function(req, res) {
    try {
        const response = await empleadosController.listarTodos();
        res.status(200).json({ data: response.data, message: response.message });
    } catch (error) { res.status(400).json({ message: error.message }); }
});

router.get('/uno/:id', function(req, res, next) {
    if (verifyToken(req.headers['authorization'], ["root", "admin", "supervisor"])) next();
    else res.status(403).json({ message: "Advertencia: Acceso denegado a información privada de empleados" });
}, async function(req, res) {
    try {
        const response = await empleadosController.listarUno(req.params.id);
        res.status(200).json({ data: response.data, message: response.message });
    } catch (error) { res.status(400).json({ message: error.message }); }
});

router.post('/agregar', function(req, res, next) {
    if (verifyToken(req.headers['authorization'], ["root", "admin", "supervisor"])) next();
    else res.status(403).json({ message: "Advertencia: Tu rol no tiene permiso para agregar empleados" });
}, async function(req, res) {
    try {
        const response = await empleadosController.crearUno(req.body);
        res.status(201).json({ data: response.data, message: response.message });
    } catch (error) { res.status(400).json({ message: error.message }); }
});

router.put('/actualizar/:id', function(req, res, next) {
    if (verifyToken(req.headers['authorization'], ["root", "admin", "supervisor"])) next();
    else res.status(403).json({ message: "Advertencia: Tu rol no tiene permiso para actualizar empleados" });
}, async function(req, res) {
    try {
        const response = await empleadosController.atualizarUno(req.body, req.params.id);
        res.status(200).json({ data: response.data, message: response.message });
    } catch (error) { res.status(400).json({ message: error.message }); }
});

// Exclusivo de ROOT
router.delete('/eliminar/:id', function(req, res, next) {
    if (verifyToken(req.headers['authorization'], ["root"])) next();
    else res.status(403).json({ message: "Advertencia: Solo el superusuario root puede eliminar empleados" });
}, async function(req, res) {
    try {
        const response = await empleadosController.eliminarUno(req.params.id);
        res.status(200).json({ data: response.data, message: response.message });
    } catch (error) { res.status(400).json({ message: error.message }); }
});

export default router;