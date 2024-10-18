"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const sequelize_1 = require("sequelize");
const dbConnection_1 = __importDefault(require("../db/dbConnection"));
const rol_1 = require("./rol");
const institucion_1 = require("./institucion");
exports.Usuario = dbConnection_1.default.define('usuario', {
    'ID_USUARIO': { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    'NOMBRE1_USUARIO': { type: sequelize_1.DataTypes.STRING },
    'NOMBRE2_USUARIO': { type: sequelize_1.DataTypes.STRING },
    'APELLIDO1_USUARIO': { type: sequelize_1.DataTypes.STRING },
    'APELLIDO2_USUARIO': { type: sequelize_1.DataTypes.STRING },
    'RUT_USUARIO': { type: sequelize_1.DataTypes.STRING },
    'CONTRASENIA_USUARIO': { type: sequelize_1.DataTypes.STRING },
    'EMAIL_USUARIO': { type: sequelize_1.DataTypes.STRING },
    'ESTADO_CUENTA': { type: sequelize_1.DataTypes.BOOLEAN },
    'ID_INSTITUCION_USUARIO': { type: sequelize_1.DataTypes.INTEGER, references: { model: institucion_1.Institucion, key: 'ID_INSTITUCION' } },
    'ID_ROL_USUARIO': { type: sequelize_1.DataTypes.INTEGER, references: { model: rol_1.Rol, key: 'ID_ROL' } },
}, {
    freezeTableName: true,
    timestamps: false
});
//asociaciones de la tabla usuario
exports.Usuario.belongsTo(rol_1.Rol, { foreignKey: 'ID_ROL_USUARIO', targetKey: 'ID_ROL', onDelete: 'SET NULL' });
exports.Usuario.belongsTo(institucion_1.Institucion, { foreignKey: 'ID_INSTITUCION_USUARIO', targetKey: 'ID_INSTITUCION', onDelete: 'SET NULL' });
rol_1.Rol.hasMany(exports.Usuario, { foreignKey: 'ID_ROL_USUARIO', sourceKey: 'ID_ROL', });
institucion_1.Institucion.hasMany(exports.Usuario, { foreignKey: 'ID_INSTITUCION_USUARIO', sourceKey: 'ID_INSTITUCION', });
