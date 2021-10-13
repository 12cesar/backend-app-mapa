import { model, Schema } from 'mongoose';

const ComunicadoSchema = new Schema({
    titulo:{
        type:String,
        required: [true, 'El titulo es obligatorio']
    },
    descripcion:{
        type: String,
        required:[true, 'La descripcion es obligaotira']
    },
    fecha:{
        type:String,
        required:true
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    estado:{
        type:Boolean,
        default:true
    }
})
ComunicadoSchema.methods.toJSON = function(){
    const {__v, ...comunicado}= this.toObject();
    return comunicado;
}

module.exports = model('Comunicado', ComunicadoSchema)