import { Request, Response } from 'express';
const Cliente = require('../schemas/cliente')

import { obtenerDni } from '../middlewares/validar-dni';
import { generarJWT } from '../helpers/generar-jwt';


export const getClientes = async(req:Request,res:Response)=>{
    const {unblock} = req.query;
    const cliente = await Cliente.find({estado:unblock});
    res.json({
        ok:true,
        msg:'Clientes mostrados con exito',
        cliente
    })
}
export const getCliente = async(req:Request,res:Response)=>{
    const {id} = req.params;
    const cliente = await Cliente.findById(id);
    res.json({
        ok:true,
        msg:'Cliente mostrado con exito',
        cliente
    })
}
export const postCliente = async(req:Request,res:Response)=>{
    const {dni, nombre, ...data} = req.body;
    
    const datos:any = await obtenerDni(dni);
    if (!datos.success && datos.msg === 'NÃºmero de documento invÃ¡lido') {
        return res.json({
            ok:false,
            msg: 'DNI no valido ingrese uno correcto',
            cliente:null,
            token:null
        })
    }
    if (!datos.success && datos.msg === 'DNI no existe o consulta directa no disponible') {
        return res.json({
            ok:false,
            msg: 'DNI no valido ingrese uno correcto',
            cliente:null,
            token:null
        })
    }
    if (!datos.success && datos.msg === 'Datos de menor de edad no disponibles en tu plan') {
        data.nombre = nombre;
        data.tipo = 'Menor'
        
    }
    if (datos.success) {
        data.nombre = datos.data.nombre_completo;
        data.tipo = 'Adulto'
    }
    data.dni = dni;
    const cliente = new Cliente(data);
    const token = await generarJWT(cliente._id);
    await cliente.save();
    res.json({
        ok:true,
        msg:'Cliente creado con exito',
        cliente,
        token
    })
}
export const putCliente = async(req:Request,res:Response)=>{
    res.json({
        ok:true
    })
}
export const unblockCliente = async(req:Request,res:Response)=>{
    const {unblock} = req.query;
    const {id} = req.params;
    const cliente = await Cliente.findByIdAndUpdate(id, {estado:unblock}, {new:true});
    res.json({
        ok:true,
        msg: cliente.estado ? 'Cliente desbloqueado con exito' : 'Cliente bloqueado con exito',
        cliente
    })
}