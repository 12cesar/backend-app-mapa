import { Request, Response } from 'express';
import { obtenerDni } from '../middlewares/validar-dni';


export const getClientes = async(req:Request,res:Response)=>{
    res.json({
        ok:true
    })
}
export const getCliente = async(req:Request,res:Response)=>{
    
    res.json({
        ok:true
    })
}
export const postCliente = async(req:Request,res:Response)=>{
    const data = await obtenerDni('75770204');
    res.json({
        ok:true,
        data
    })
}
export const putCliente = async(req:Request,res:Response)=>{
    res.json({
        ok:true
    })
}
export const unblockCliente = async(req:Request,res:Response)=>{
    res.json({
        ok:true
    })
}