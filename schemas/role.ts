import { model, Schema } from 'mongoose';

const RolSchema = new Schema({
    rol:{
        type: String,
        required: [true, 'El rol es obligatorio']
    }
})

module.exports = model('Role', RolSchema)