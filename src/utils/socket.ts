// import * as socketio from "socket.io";
import { Server, Socket } from "socket.io";
import http from "http"; // SocketIoServer accepts a type of http.Server


interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
}


interface ClientToServerEvents {
    hello: () => void;
}

interface InterServerEvents {
    ping: () => void;
}

interface SocketData {
    name: string;
    age: number;
}

class SocketIoServer extends Server {

    constructor(httpServer: http.Server, config: any) {
        console.log("SocketIoServer constructor")
        super(httpServer, config);

        const that = this; // this = new Server(server, {<config>})
        
        that.on('connection', (socket: Socket) => {

            console.log("incoming socket connection, id:", socket.id);

            socket.on('user-name', (name) => {
                console.log("user ", name, "joined chat !");
            });



            // The user requests to join a certain room
            socket.on('join-chat-room', (room_id) => {
                console.log("user", socket.handshake.auth.name, "joined chatroom:", room_id);

                // NOTE Call socket.join() function to put the clients in the same room
                socket.join(room_id);

                socket.on('room-chat-message', (message) => {
                    console.log("user", socket.handshake.auth.name, "sent room-chat-message:", message)

                    that.to(room_id).emit("room-chat-message", {
                        name: socket.handshake.auth.name,
                        message
                    });
                })

            });


            // The chat message will be sent to every one in the room
            socket.on('public-chat-msg', (msg) => {
                console.log("public-chat-msg", msg);
                console.log("user ", JSON.parse(msg).name, "said:", JSON.parse(msg).message);
                that.sockets.emit('public-chat-msg', msg);
            });

        });
    }
}


export {
    ServerToClientEvents,
    ClientToServerEvents,
    InterServerEvents,
    SocketData,
    SocketIoServer,
    Socket
}

