import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import cors from 'cors';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/sockets';
import dbConnection from '../db/database';
import fileUpload from 'express-fileupload';


export default class Server {
    private static _intance: Server
    public app: express.Application;
    public port: number;
    public io: socketIO.Server;
    private httpServer: http.Server;
    public routerPath: string;
    public usuariosPath: string;
    public mensajesPath: string;
    public authPath: string;
    public comunicadoPath: string;
    public clientePath: string;


    private constructor() {
        
        this.app = express();
        this.port = SERVER_PORT;
        this.routerPath = '/api/routers';
        this.usuariosPath = '/api/usuarios';
        this.mensajesPath = '/api/mensajes';
        this.authPath ='/api/auth';
        this.comunicadoPath ='/api/comunicados';
        this.clientePath = '/api/clientes';
        this.httpServer = new http.Server(this.app);
        this.io = require('socket.io')(this.httpServer,{
            cors: {
                origin: true,
                credentials: true
              },            
          });
        this.conectarDB();
        this.escucharSockets();
        this.midlewares();
        this.routes();
        
        
    }

    public static get instance(){
        return this._intance || (this._intance=new this());
    }
    public async conectarDB(){
        await dbConnection();
    }
    private escucharSockets(){
        
        this.io.on('connection', cliente =>{
            //mostrar el id
            //console.log(cliente.id);
            //Conectar cliente
            socket.conectarCliente(cliente, this.io);
            //Configurar usaurio
            socket.configurarUsuario(cliente, this.io)
            // obtener usuarios activos
            socket.obtenerUsuarios(cliente, this.io)
            //mensajes
            socket.mensaje(cliente, this.io);
            // Desconectar
            socket.desconectar(cliente, this.io);
            
        });
    }

    midlewares() {
        this.app.use(
            fileUpload({
              useTempFiles: true,
              tempFileDir: "/tmp/",
              createParentPath: true,
            })
          );
        this.app.use(cors({origin:true, credentials:true}));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
    }
    routes(){
        this.app.use(this.routerPath, require('../routes/router'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.clientePath, require('../routes/clientes'));
        this.app.use(this.mensajesPath, require('../routes/mensajes'));
        this.app.use(this.comunicadoPath, require('../routes/comunicados'));
    }
    start(callback: () => void) {
        this.httpServer.listen(this.port, callback);
    }
}