import { model, Schema } from "mongoose";

const UsuarioSchema = new Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    usuario:{
        type:String,
        required:[true, 'El usuario es obligatorio']
    },
    password:{
        type: String,
        required:[true, 'El password es obligatorio']
    },
    img:{
        type:String
    },
    rol:{
        type:String,
        required:true,
        default: 'CHOFER_ROLE',
        enum: ['ADMIN_ROLE', 'CHOFER_ROLE']
    },
    estado:{
        type: Boolean,
        default: true
    }
});

UsuarioSchema.methods.toJSON = function(){
    const {__v, password, ...usuario}= this.toObject();
    return usuario;
}


module.exports = model('Usuario', UsuarioSchema);