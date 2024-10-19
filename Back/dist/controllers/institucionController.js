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
exports.getInstitucion = exports.deleteInstitucion = exports.updateInstitucion = exports.newInstitucion = exports.getInstituciones = void 0;
const institucion_1 = require("../models/institucion");
const getInstituciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const instituciones = yield institucion_1.Institucion.findAll();
        res.json(instituciones);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la lista de instituciones.' });
    }
});
exports.getInstituciones = getInstituciones;
const newInstitucion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_institucion, tipo_institucion } = req.body;
    try {
        yield institucion_1.Institucion.create({
            "NOMBRE_INSTITUCION": nombre_institucion,
            "TIPO_INSTITUCION": tipo_institucion
        });
        return res.status(201).json({
            msg: 'Institucion creada correctamente'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un error al crear la institucion',
            error
        });
    }
});
exports.newInstitucion = newInstitucion;
const updateInstitucion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_institucion } = req.params;
    const { nombre_institucion, tipo_institucion } = req.body;
    const institucion = yield institucion_1.Institucion.findOne({ where: { ID_INSTITUCION: id_institucion } });
    if (!institucion) {
        return res.status(404).json({
            msg: "no existe una institucion con id: " + id_institucion
        });
    }
    try {
        yield institucion_1.Institucion.update({
            NOMBRE_INSTITUCION: nombre_institucion,
            TIPO_INSTITUCION: tipo_institucion
        }, { where: { ID_INSTITUCION: id_institucion } });
        return res.json({
            msg: 'Institucion con id: ' + id_institucion + ' actualizada correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar la institucion con id: ' + id_institucion,
            error
        });
    }
});
exports.updateInstitucion = updateInstitucion;
const deleteInstitucion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_institucion } = req.params;
    const institucion = yield institucion_1.Institucion.findOne({ where: { ID_INSTITUCION: id_institucion } });
    if (!institucion) {
        return res.status(404).json({
            msg: "La institucion con id: " + id_institucion + " no existe"
        });
    }
    try {
        yield institucion_1.Institucion.destroy({ where: { ID_INSTITUCION: id_institucion } });
        return res.json({
            msg: 'Institucion con id ' + id_institucion + ' borrada correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al borrar la institucion con id: ' + id_institucion,
            error
        });
    }
});
exports.deleteInstitucion = deleteInstitucion;
const getInstitucion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_institucion } = req.params;
    try {
        const institucion = yield institucion_1.Institucion.findOne({ where: { ID_INSTITUCION: id_institucion } });
        if (!institucion) {
            return res.status(404).json({
                msg: "La institucion con id: " + id_institucion + " no existe"
            });
        }
        res.json(institucion);
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al encontrar la institucion con id: ' + id_institucion,
            error
        });
    }
});
exports.getInstitucion = getInstitucion;
