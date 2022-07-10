const { io, Socket } = require("socket.io-client");

const CHATBOX_SERVER = 'http://localhost:3333';

const socketIoClient = io(CHATBOX_SERVER, { autoConnect: false });


socketIoClient.auth = { name: "tester" };



socketIoClient.on("connect", () => {
    console.log("socketIoClient connected to server");
    console.log(socketIoClient.id);

    // logging data whenever the server receives a message one   
    socketIoClient.on("data", (data) => {
        console.log("data", data);
    })

    // Display handshake message    
    socketIoClient.on("handshake", (data) => {
        console.log("handshake", data);
    })

    //  room-chat-message
    socketIoClient.on("room-chat-message", (message) => {
        console.log("message", message)
    })

});



setTimeout(() => {
    socketIoClient.connect();


    console.log("connecting");


}, 1000);

setTimeout(() => {

    // sending info to server at  
    socketIoClient.emit("user-name", "tester");

    console.log("user-name");


    // sending info to server at  
    socketIoClient.emit("join-chat-room", "test channel");

    console.log("join-chat-room");


}, 2000);

