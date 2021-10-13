import mongoose from 'mongoose';
import { MONGODB_CN } from '../global/enviroment';

const dbConnection = async()=>{
    try {
        await mongoose.connect(MONGODB_CN);
        console.log('Base de datos online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la bse de datos')
    }
}

export default dbConnection;