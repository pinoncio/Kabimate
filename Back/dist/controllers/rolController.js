"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRol = exports.deleteRol = exports.updateRol = exports.newRol = exports.getRoles = void 0;
const rol_1 = require("../models/rol");
const getRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield rol_1.Rol.findAll({ attributes: ['ID_ROL', 'NOMBRE_ROL'] });
        res.json(roles);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la lista de roles.' });
    }
});
exports.getRoles = getRoles;
const newRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_rol } = req.body;
    try {
        yield rol_1.Rol.create({
            "NOMBRE_ROL": nombre_rol
        });
        return res.status(201).json({
            msg: 'Rol creado correctamente'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un error al crear el rol',
            error
        });
    }
});
exports.newRol = newRol;
const updateRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_rol } = req.params;
    const { nombre_rol } = req.body;
    const rol = yield rol_1.Rol.findOne({ where: { ID_ROL: id_rol } });
    if (!rol) {
        return res.status(404).json({
            msg: "no existe un rol con id: " + id_rol
        });
    }
    try {
        yield rol_1.Rol.update({
            NOMBRE_ROL: nombre_rol
        }, { where: { ID_ROL: id_rol } });
        return res.json({
            msg: 'Rol ' + id_rol + ' actualizado correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar el rol: ' + id_rol,
            error
        });
    }
});
exports.updateRol = updateRol;
const deleteRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_rol } = req.params;
    const rol = yield rol_1.Rol.findOne({ where: { ID_ROL: id_rol } });
    if (!rol) {
        return res.status(404).json({
            msg: "El rol con id: " + id_rol + " no existe"
        });
    }
    try {
        yield rol_1.Rol.destroy({ where: { ID_ROL: id_rol } });
        return res.json({
            msg: 'Rol con id ' + id_rol + ' borrado correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al borrar el rol con id: ' + id_rol,
            error
        });
    }
});
exports.deleteRol = deleteRol;
const getRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_rol } = req.params;
    try {
        const rol = yield rol_1.Rol.findOne({ where: { ID_ROL: id_rol } });
        if (!rol) {
            return res.status(404).json({
                msg: "El rol con id: " + id_rol + " no existe"
            });
        }
        res.json(rol);
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al encontrar el rol con id: ' + id_rol,
            error
        });
    }
});
exports.getRol = getRol;
