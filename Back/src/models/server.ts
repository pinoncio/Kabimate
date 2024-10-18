import express, {Application} from 'express';
import cors from 'cors';

//importar modelos
import { Rol } from './rol';
import { Institucion } from './institucion';
import { Usuario } from './usuario';
//importar rutas
import routesUsuario from '../routes/usuarioRoutes'

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app= express();
        this.port = '3001';

        this.midlewares();
        this.routes();
        this.listen();
        this.dbConnect();

    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Ejecutandoce en el puerto ' + this.port);
        })
    }
    routes() {
        this.app.use('/api/usuarios', routesUsuario);
    }
    midlewares(){
        this.app.use(express.json());
        this.app.use(cors());
    }

    async dbConnect(){
        try {
            await Rol.sync();
            await Institucion.sync();
            await Usuario.sync();


        } catch (error){
            console.log('No se ha podido establecer conexion a la base de datos')
        }
    }
}
export default Server;