"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usuarioController_1 = require("../controllers/usuarioController");
const usuarioRoutes_1 = require("./usuarioRoutes");
usuarioRoutes_1.router.post('/', usuarioController_1.newUsuario);
