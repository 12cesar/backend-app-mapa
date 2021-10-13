const fileGetContents = require('file-get-contents')

const obtenerDni = (dnis = '') => {
    const data = `https://consulta.api-peru.com/api/dni/${dnis}/6547df5c36085a97a79e4256b6b5ae49`;
   return new Promise((resolve, reject)=>{
      fileGetContents(data)
      .then((json:any) => {
        const data = JSON.parse(json);
        resolve(data);
      })
      .catch((err:any) => {
        reject(err.message)
      });
   })
  };
  
  module.exports = {
      obtenerDni
  };