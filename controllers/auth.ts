import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { generarJWT } from '../helpers/generar-jwt';
const Usuario = require('../schemas/usuario');


export const postLogin =async(req:Request,res:Response)=>{
    const {usuario, password} = req.body;
    const user = await Usuario.findOne({usuario});
    if (!user) {
        return res.json({
            ok:false,
            msg:'Usuario no existe, converse con el administrador',
            user:null,
            token:null
        })
    }
    if (!user.estado) {
        return res.json({
            ok:false,
            msg:'Usuario bloqueado, converse con el administrador',
            user:null,
            token:null
        })
    }
    const validarPassword = bcryptjs.compareSync(password, user.password)
    if (!validarPassword) {
        return res.json({
            ok:false,
            msg:'Contraseña no valida',
            user:null,
            token:null
        })
        
    }
    const token = await generarJWT(user._id);
    res.json({
        ok:true,
        msg:'Login correcto',
        user,
        token
    })
}