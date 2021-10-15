import { Data } from "../interfaces/cliente-dni-interface";

export class Cliente {

    success: boolean;
    msg?: string;
    origen?:  number;
    data?:    Data;

    constructor(success: boolean){
        this.success = success;
    }
}