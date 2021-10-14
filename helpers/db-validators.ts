const Usuario = require('../schemas/usuario');
const Role = require('../schemas/role');



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