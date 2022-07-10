# DevNotes

# July 10, 2022:
## CORS

In order to get rid of COS errors we need to include the `cors` library and set it up with express

```typescript
const allowedOrigins = ['*'];
const options: cors.CorsOptions = {
    origin: allowedOrigins
};
```

```typescript
this.server = express().use(cors(options)); 
```

## Socket.Io
In the App class we have already got an express member called `server`.

In order to establish connection with our frontend, we are going to create a socket.io Server instance. The socket server will be listening on the same port as the express server


`SocketIoServer` is a type we defined, it's originally called `Server` in `socket.io` library. We don't want a name that is ambiguous and can easily be confused with other names, therefore I decided to change the name to `SocketIoServer`.

`SocketIoServer` receives `http.Server` as the first parameter, therefore I will be throwing the express server instance into the `http.Server()` constructor and make it a type of `http.Server`; 


The import of the http pacakge is like this:

```javascript
import http from "http"; // SocketIoServer accepts a type of http.Server
```


Socket Server accepts http.Server as the first param.

```typescript
// instantiate the socket server upon express server
this.socketServer = new SocketIoServer(new http.Server(this.server),{
            cors: {
                origin : "*",
                methods :["GET","POST"]
            }
        });
```

However, as I was testing the server, the socketServer was not receiving anything.
I looked at the code and then realized that the server started by `http` should be the one who's listening, so I modified the member fields as follows:  

```javascript
    private expressServer; // http server that handles the api endpoints.
    private socketServer;  // socket.io server that lives on top of express server
    public server;         // http server that accepted the express object, which would host both express apis and the socket.io utilities.
```

I made the `http server` to accept `expressServer`. 

```javascript
        this.server = new http.Server(this.expressServer)
```

And then I made the `socketServer` accept the `http server` object:

```typescript
        // instantiate the socket server upon express server
        this.socketServer = new SocketIoServer(this.server, {
            cors: {
                origin : "*",
                methods :["GET","POST"]
            }
        });
```

## Next Steps

In order to record the game histories, Judao would like to introduce mongoDB for data storage.

Things to do:

- Start a mongo.ts file in utils folder,
- Start a free mongoDB cloud instance.




