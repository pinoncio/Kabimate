import express, {Application} from 'express';
import cors from 'cors';

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app= express();
        this.port = '3001';

        this.midlewares();
        this.listen();
        this.dbConnect();
        this.routes();
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Ejecutandoce en el puerto ' + this.port);
        })
    }
    routes() {
    }
    midlewares(){
        this.app.use(express.json());
        this.app.use(cors());
    }

    async dbConnect(){
        try {

        } catch (error){
            console.log('No se ha podido establecer conexion a la base de datos')
        }
    }
}
export default Server;