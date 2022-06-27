import express from 'express'
import routes from './routes';

/*
Dummy App right now for the chess backend
**/
class App {
    public server;

    constructor () {
        this.server = express();

        this.middlewares();
        this.routes();
    }

    middlewares () {
        this.server.use(express.json());
    }

    routes () {
        this.server.use(routes)
    }
}


export default new App().server;