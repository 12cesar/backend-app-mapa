export const SERVER_PORT: number = Number(process.env.PORT) || 5000;
export const MONGODB_CN: string = process.env.MONGODB ||  'mongodb://127.0.0.1:27017/serviciopublico';
export const SECRETORPRIVATEKEY:string = process.env.SECRETORPRIVATEKEY || 'ResiduosMunicipal#*417@913'