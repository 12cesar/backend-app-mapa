import { model, Schema } from "mongoose";

const VehiculoSchema= new Schema({
    nombre:{
        type: String,
        required:true
    },
    modelo:{
        type:String,
        required: true
    },
    placa:{
        type:String
    },
    estado:{
        type: Boolean,
        default:true
    }
})

VehiculoSchema.methods.toJSON = function(){
    const {__v, ...vehiculo}= this.toObject();
    return vehiculo;
}

module.exports = model('Vehiculo', VehiculoSchema);