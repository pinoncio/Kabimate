import {Request, Response} from 'express';
import { Usuario } from '../models/usuario';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Rol } from '../models/rol';
import { Institucion } from '../models/institucion';

export const newUsuario = async(req: Request, res: Response) => {
    const {email,rut_usuario, contrasenia, nombre1_usuario, nombre2_usuario, apellido1_usuario, apellido2_usuario} = req.body;
    const usuarioCorreo = await Usuario.findOne({where: {EMAIL_USUARIO: email}});
    const usuarioRut = await Usuario.findOne({where: {RUT_USUARIO: rut_usuario}});
    const institucion = await Institucion.findOne({where: {ID_INSTITUCION: 1}});
    const rol = await Rol.findOne({where: {ID_ROL: 1}});
    if(usuarioCorreo) {
        return res.status(400).json({
            msg: 'Ya existe una cuenta con el email ingresado'
        })
    }
    if(usuarioRut) {
        return res.status(400).json({
            msg: 'Ya existe un usuario con el rut ingresado'
        })
    }
    if(!institucion){
        try{
            await Institucion.create({
                "NOMBRE_INSTITUCION": "NO INSTITUCION",
                "TIPO_INSTITUCION": "NO APLICA"
            });

        }catch(error){
            res.status(400).json({
                msg: 'Ha ocurrido un error institucion',
                error
            })
        }
    }
    if(!rol){
        try{
            await Rol.create({
                "NOMBRE_ROL": "ADMINISTRADOR"
            });

        }catch(error){
            res.status(400).json({
                msg: 'Ha ocurrido un error rol',
                error
            })
        }
    }
    const hashedpassword = await bcrypt.hash(contrasenia, 10);
    try{
        await Usuario.create({
            "RUT_USUARIO": rut_usuario,
            "CONTRASENIA_USUARIO": hashedpassword,
            "NOMBRE1_USUARIO": nombre1_usuario,
            "NOMBRE2_USUARIO": nombre2_usuario,
            "APELLIDO1_USUARIO": apellido1_usuario,
            "APELLIDO2_USUARIO": apellido2_usuario,
            "EMAIL_USUARIO": email,
            "ESTADO_CUENTA": true,
            "ID_INSTITUCION_USUARIO": 1,
            "ID_ROL_USUARIO": 1
        })
        return res.status(201).json({
            msg: 'Usuario creado correctamente'
            
        })
    }catch(error){
        res.status(400).json({
            msg: 'Ha ocurrido un error al crear una cuenta',
            error
        })
    }
};

export const desactivarUsuario = async (req:Request, res: Response) =>{
    const {id_usuario} = req.params;
    const usuario = await Usuario.findOne({where: {ID_USUARIO:id_usuario}});
    if(!usuario){
        return res.status(404).json({
            msg: "El usuario ingresado no existe"
        })
    }
    try{
        await Usuario.update({
            ESTADO_CUENTA: false
        },{where: {ID_USUARIO: id_usuario}});
        return res.json({
            msg: "Se ha desactivado la cuenta del usuario "+id_usuario+" correctamente"
        })

    }catch(error){
        return res.status(400).json({
            msg: "Ha ocurrido un error al desactivar la cuenta : "+id_usuario,
            error
        })

    }
};

export const activarUsuario = async (req:Request, res: Response) =>{
    const {id_usuario} = req.params;
    const usuario = await Usuario.findOne({where: {ID_USUARIO:id_usuario}});
    if(!usuario){
        return res.status(404).json({
            msg: "El usuario ingresado no existe"
        })
    }
    try{
        await Usuario.update({
            ESTADO_CUENTA: true
        },{where: {ID_USUARIO: id_usuario}});
        return res.json({
            msg: "Se ha activado la cuenta del usuario "+id_usuario+" correctamente"
        })

    }catch(error){
        return res.status(400).json({
            msg: "Ha ocurrido un error al activar la cuenta : "+id_usuario,
            error
        })

    }
};

export const updateUsuario = async (req: Request, res: Response)=> {
    const {id_usuario} = req.params;
    const {email,rut_usuario, contrasenia, nombre1_usuario, nombre2_usuario, apellido1_usuario, apellido2_usuario} = req.body;

    const usuario = await Usuario.findOne({where: {ID_USUARIO: id_usuario}});

    if(!usuario){
        return res.status(404).json({
            msg: "El usuario ingresado no existe"
        })

    }
    
    console.log(nombre1_usuario)
    try{
        if(contrasenia || contrasenia != null){
            const hashedpassword = await bcrypt.hash(contrasenia, 10);
            await Usuario.update({
                RUT_USUARIO: rut_usuario,
                CONTRASENIA_USUARIO: hashedpassword,
                NOMBRE1_USUARIO: nombre1_usuario,
                NOMBRE2_USUARIO: nombre2_usuario,
                APELLIDO1_USUARIO: apellido1_usuario,
                APELLIDO2_USUARIO: apellido2_usuario,
                EMAIL_USUARIO: email,
                
            },{where: {ID_USUARIO: id_usuario}});
            return res.json({
                msg: "Se ha actualizado la informacion de la cuenta del usuario "+id_usuario+" correctamente"
            })
        }else{
            await Usuario.update({
                RUT_USUARIO: rut_usuario,
                NOMBRE1_USUARIO: nombre1_usuario,
                NOMBRE2_USUARIO: nombre2_usuario,
                APELLIDO1_USUARIO: apellido1_usuario,
                APELLIDO2_USUARIO: apellido2_usuario,
                EMAIL_USUARIO: email,
                
            },{where: {ID_USUARIO: id_usuario}});
            return res.json({
                msg: "Se ha actualizado la informacion de la cuenta del usuario "+id_usuario+" correctamente"
            })
            }

    }catch(error){
        return res.status(400).json({
            msg: "Ha ocurrido un error al actualizar la informacion de la cuenta : "+id_usuario,
            error
        })

    }
};

export const loginUser = async(req: Request, res: Response) =>{

    const { email, contrasenia } = req.body;
    const usuario: any = await Usuario.findOne({where: {EMAIL_USUARIO: email}})
    if(!usuario) {
        return res.status(401).json({
            msg: 'El email ingresado no es valido'
        })
    }
    const password = await bcrypt.compare(contrasenia, usuario.CONTRASENIA_USUARIO)
    if(!password) {
        return res.status(401).json({
            msg: 'Contraseña Incorrecta'
        })
    }
    const usuarioRol = usuario.dataValues.ID_ROL_USUARIO
    const usuarioId = usuario.dataValues.ID_USUARIO
    const token = jwt.sign({
        email: email,
        rol: usuarioRol
    }, process.env.SECRET_KEY || 'PRUEBA1'); // , {expiresIn: '10000'} como tercer parametro para timepo de expiracion del token
    res.json({token, rol: usuarioRol, idUsuario: usuarioId});
};

export const getUsuario = async(req: Request, res: Response)=> {
    const { id_usuario } = req.params;
    try{
        const usuario = await Usuario.findOne({where: {ID_USUARIO: id_usuario}})
        if (!usuario) {
            return res.status(404).json({
                msg: "El usuario con id: " + id_usuario + " no existe"
            })
        }
        res.json(usuario)
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al encontrar el usuario con id: '+id_usuario,
                error
            })
        }
};

export const getUsuarios = async(req: Request, res: Response)=> {
    try{
        const usuarios = await Usuario.findAll()
        res.json(usuarios)
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al obtener la lista de usuarios',
                error
            })
        }
};