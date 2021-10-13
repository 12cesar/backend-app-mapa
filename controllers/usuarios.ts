import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { validarJWT } from '../middlewares/validar-jwt';

import { SECRETORPRIVATEKEY } from '../global/enviroment';


export const getUsuarios = async(req:Request, res:Response)=>{
    res.json({
        ok:true
    })
}
export const getUsuario = async(req:Request, res:Response)=>{
    res.json({
        ok:true
    })
}
export const postUsuario = async(req:Request, res:Response)=>{
    res.json({
        ok:true
    })
    
}
export const putUsuario = async(req:Request, res:Response)=>{
    res.json({
        ok:true
    })
}
export const unblockUsuario = async(req:Request, res:Response)=>{
    res.json({
        ok:true
    })
}

/* jwt.sign({
    data: 'foobar'
  }, 'secret', { expiresIn: 60 * 60 }); */