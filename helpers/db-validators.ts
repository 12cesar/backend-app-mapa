const Usuario = require('../schemas/usuario');
const Role = require('../schemas/role');
const Mensaje = require('../schemas/mensaje');
const Comunicado = require('../schemas/comunicado');

export const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
}
export const esUsuarioIDValido = async(id:any) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
       throw new Error(`El id ${id} no existe en la base de datos`);
    }
}
export const esNombreUsuarioValido = async(nombre='')=>{
    const name = nombre.toUpperCase();
    const existeUsuario = await Usuario.findOne({nombre:name});
    if (existeUsuario) {
        throw new Error(`El usuario ${name} ya existe en la base de datos`);
    } 
}
export const esUsuarioValidoUser = async(usuario='')=>{
    const existeUsuario = await Usuario.findOne({usuario});
    if (existeUsuario) {
        throw new Error(`El usuario ${usuario} ya existe en la base de datos`);
    } 
}
export const esMensajeIDValido = async(id:any) => {
    const existeMensaje = await Mensaje.findById(id);
    if (!existeMensaje) {
       throw new Error(`El id ${id} no existe en la base de datos`);
    }
}
export const esComunicadoIDValido = async(id:any) => {
    const existeComunicado = await Comunicado.findById(id);
    if (!existeComunicado) {
       throw new Error(`El id ${id} no existe en la base de datos`);
    }
}