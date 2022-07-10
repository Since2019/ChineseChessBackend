import express from 'express'
import routes from './routes';

import {
    SocketIoServer,
    Socket
} from "./utils/socket" 

import http from "http"; // SocketIoServer accepts a type of http.Server

import cors from 'cors' // to get rid of Cross-Origin-Not-Allowed issues    


// import { Server, Socket } from "socket.io";


const allowedOrigins = ['*'];
const options: cors.CorsOptions = {
    origin: allowedOrigins
};
    
 
class App {
    private expressServer; // http server that handles the api endpoints.
    private socketServer;  // socket.io server that lives on top of express server
    public server;         // http server that accepted the express object, which would host both express apis and the socket.io utilities.

    constructor () {
        // Express Server uses cors and will be wrapped by http.
        this.expressServer = express().use(cors(options)); 
        this.middlewares();
        this.routes();  

        this.server = new http.Server(this.expressServer)

        // instantiate the socket server upon express server
        this.socketServer = new SocketIoServer(this.server, {
            cors: {
                origin : "*",
                methods :["GET","POST"]
            }
        });



  
        
    }

    middlewares () {
        this.expressServer.use(express.json());
    }

    routes () {
        this.expressServer.use(routes)
    }
}


export default new App().server;