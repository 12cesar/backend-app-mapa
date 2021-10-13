import jwt from 'jsonwebtoken';
import { request, response } from 'express';
import { SECRETORPRIVATEKEY } from '../global/enviroment';
const Usuario = require('../schemas/usuario');

export const validarJWT = async (req:any = request, res:any=response, next:any)=>{ 
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {
        const {id}:any = jwt.verify(token, SECRETORPRIVATEKEY);

        // leer el usuario

        const usuario = await Usuario.findOne({_id: id});

        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en BD'
            })
        }
        
        // Verificar si el uid tiene estado en tru
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado : false'
            })
        }
        if (usuario.rol !== 'ADMIN_ROLE') {
            return res.status(401).json({
                msg: 'Token no valido - usuario no es administrador'
            })
        }
        req.usuarioToken = usuario;
        console.log(usuario); 
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
    
    
}