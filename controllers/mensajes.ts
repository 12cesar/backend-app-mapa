import { request, Request, Response, response } from 'express';
const Mensaje = require('../schemas/mensaje');
export const getMensajes = async(req:Request,res:Response)=>{
    const {unblock} = req.query;
    const mensaje = await Mensaje.find({estado:unblock})
                                    .populate('usuario', 'nombre');
    res.json({
        ok:true,
        msg:'Mensajes mostrado con exito',
        mensaje
    })
}
export const getMensaje = async(req:Request,res:Response)=>{
    const {id} = req.params;
    const mensaje = await Mensaje.findById(id)
                                    .populate('usuario', 'nombre');
    res.json({
        ok:true,
        mensaje
    })
}
export const postMensaje = async(req:any=request,res:Response)=>{
    const data = req.body;
    const mensaje = new Mensaje(data);
    const user = req.usuarioToken;
    mensaje.usuario = user._id;
    await mensaje.save();
    res.json({
        ok:true,
        msg:'Mensaje creado con exito',
        mensaje
    })
}
export const putMensaje = async(req:any=request,res:Response)=>{
    const {id} = req.params;
    const {usuario,...data} = req.body;
    const user = req.usuarioToken;
    data.usuario = user._id;
    const mensaje = await Mensaje.findByIdAndUpdate(id, data, {new:true});
    res.json({
        ok:true,
        msg:'Mensaje editado con exito',
        mensaje
    })
}
export const unblockMensaje = async(req:Request,res:Response)=>{
    const {unblock} = req.query;
    const {id} = req.params;
    const mensaje = await Mensaje.findByIdAndUpdate(id, {estado:unblock}, {new:true});
    res.json({
        ok:true,
        msg: mensaje.estado ? 'Mensaje desbloqueado con exito' : 'Mensaje bloqueado con exito',
        mensaje
    })
}
