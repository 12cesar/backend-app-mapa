import jwt from 'jsonwebtoken';
import { SECRETORPRIVATEKEY } from '../global/enviroment';
const generarJWT = (id = '') =>{
    return new Promise((resolve, reject)=> {
        const payload = {id};
        jwt.sign(payload, SECRETORPRIVATEKEY, {
            expiresIn: '9h'
        }, (err, token)=>{
            if (err) {
                console.log(err);
                reject('No se pudo generar el token')
            }else{
                resolve(token);
            }
        })
    })
}

module.exports = {
    generarJWT
}