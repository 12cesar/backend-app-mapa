import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
const Usuario = require("../schemas/usuario");

export const getUsuarios = async(req:Request, res:Response)=>{
    const {unblock} = req.query;
    const usuario = await Usuario.find({estado:unblock})
    res.json({
        ok:true,
        msg:'Usuarios mostrado con exito',
        usuario,
    })
}
export const getUsuario = async(req:Request, res:Response)=>{
    const {id} = req.params;
    const usuario = await Usuario.findById(id);
    res.json({
        ok:true,
        msg:'Usuario mostrado con exito',
        usuario
    })
}
export const postUsuario = async(req:Request, res:Response)=>{
    const {nombre, password, ...data} = req.body;
    data.nombre= nombre.toUpperCase();
    const salt = bcryptjs.genSaltSync();
    const usuario = new Usuario(data);
    usuario.password = bcryptjs.hashSync(password, salt)
    await usuario.save();
    res.json({
        ok:true,
        msg:'Usuario creado con exito',
        usuario
    })
}
export const putUsuario = async(req:Request, res:Response)=>{
    const {id} = req.params;
    const {password, ...data} = req.body;
    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }
    if(password){
        const salt = bcryptjs.genSaltSync();
        data.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, data, {new:true});
    res.json({
        ok:true,
        msg:'Usuario editado con exito',
        usuario
    })

}
export const unblockUsuario = async(req:Request, res:Response)=>{
    const {id} = req.params;
    const {unblock} = req.query;
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: unblock}, {new:true})
    res.json({
        ok:true,
        msg:usuario.estado ? 'Usuario desbloqueado con exito' : 'Usuario bloqueado con exito',
        usuario
    })
}