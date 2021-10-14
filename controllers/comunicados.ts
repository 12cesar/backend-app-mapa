import { request, Request, Response } from 'express';
const Comunicado = require('../schemas/comunicado');

export const getComunicados = async(req:Request, res:Response)=>{
    const {unblock} = req.query;
    const comunicado = await Comunicado.find({estado:unblock})
                                    .populate('usuario', 'nombre');
    res.json({
        ok:true,
        msg:'Comunicados mostrado con exito',
        comunicado
    })
}
export const getComunicado = async(req:Request, res:Response)=>{
    const {id} = req.params;
    const comunicado = await Comunicado.findById(id)
                                    .populate('usuario', 'nombre');
    res.json({
        ok:true,
        msg:'Comunicado mostrado con exito',
        comunicado
    })
}
export const postComunicado = async(req:any = request, res:Response)=>{
    const data = req.body;
    const user = req.usuarioToken;
    data.usuario = user._id;
    const comunicado = new Comunicado(data);
    await comunicado.save();
    res.json({
        ok:true,
        msg:'Comunicado creado con exito',
        comunicado
    })
}
export const putComunicado = async(req:any=request, res:Response)=>{
    const {id} = req.params;
    const {usuario,...data} = req.body;
    const user = req.usuarioToken;
    data.usuario = user._id;
    //const anuncio = await Comunicado.findByIdAndUpdate(id, data, {new:true});
    res.json({
        ok:true,
        msg:'Comunicado actualizado con exito',
        data
    })
}
export const unblockComunicado = async(req:Request, res:Response)=>{
    const {unblock} = req.query;
    const {id} = req.params;
    const comunicado = await Comunicado.findByIdAndUpdate(id, {estado:unblock}, {new:true});
    res.json({
        ok:true,
        msg: comunicado.estado ? 'Comunicado desbloqueado con exito' : 'Comunicado bloqueado con exito',
        comunicado
    })
}