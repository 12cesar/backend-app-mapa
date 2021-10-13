import { model, Schema } from 'mongoose';

const MensajeSchema = new Schema({
    descripcion:{
        type: String,
        required:[true, 'La descripcion es obligatoria']
    },
    fecha:{
        type: String,
        required: true
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
});
MensajeSchema.methods.toJSON = function(){
    const {__v, ...mensaje}= this.toObject();
    return mensaje;
}


module.exports = model('Mensaje', MensajeSchema)