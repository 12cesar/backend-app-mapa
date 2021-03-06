// Generated by https://quicktype.io

export interface ResultDniCliente {
    dnis: Dnis;
}

export interface Dnis {
    success?: boolean;
    msg?: string;
    origen?:  number;
    data?:    Data;
}

export interface Data {
    numero:              string;
    nombres:             string;
    apellido_paterno:    string;
    apellido_materno:    string;
    sexo:                string;
    fecha_nacimiento:    string;
    codigo_verificacion: string;
    nombre_completo:     string;
}
