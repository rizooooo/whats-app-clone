import express, { Express, Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import   { Server } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

// app.use(cors())
const server = http.createServer(app);



const io = new Server(server, { 
   cors: { 
  origin: `http://127.0.0.1:5173`
   }
});

const port = process.env.PORT || 8000;

io.on('connection', (socket) => {
    console.log('a user connected');
   
    socket.on('message', value => {
      socket.emit('messages', value);
     socket.broadcast.emit('messages', value);
    //  socket.broadcast.emit('messages', value);
    })

  
});

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

server.listen(+port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});