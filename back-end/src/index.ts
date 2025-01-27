import express, { Express } from 'express';
import { createServer } from 'http';
import { Socket, Server } from 'socket.io';
import { cors } from './httpServer/cors.function';
import { UserRepository } from './database/user.database';
import { RoomRepository } from './database/room.repository';
import { Startup } from './loadInitialData';
import { SendMessageUseCase } from './businessLogic/SendMessage.useCase';
import { JoinRoomHandler } from './businessLogic/JoinRoom.useCase';
import { LeaveRoomHandler } from './businessLogic/LeaveRoom.useCase';
import { CreateRoomHandler } from './businessLogic/CreateRoom.useCase';
import { RequestsTopics } from './constants';
import { PictochatUser } from './domain/user/user.model';

const PORT = 8080;
// const origin:

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors);

// Startup
Startup();

// Setup http server
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    methods: ["GET", "POST"],
    allowedHeaders: ["*"],
    credentials: true
  }
});
io.on('connection', (socket: Socket) => {
  const { id } = socket;

  console.log(`Connected ${id}`);
  socket.join('GeneralNotifications');


  socket.on(RequestsTopics.ASSIGN_USER, (createUserRequest) => {
    const userRepository = new UserRepository();
    const user: PictochatUser = {
      socketId: socket.id,
      username: JSON.parse(createUserRequest).username
    };
    userRepository.addUser(user);
  });

  socket.on(RequestsTopics.CREATE_ROOM, (createRoomRequest) => {
    const roomRepository = new RoomRepository();
    const createRoomHandler = new CreateRoomHandler(socket, roomRepository);

    createRoomHandler.handle({ name: JSON.parse(createRoomRequest).name });
  });

  socket.on(RequestsTopics.JOIN_ROOM, (roomRequest) => {
    const userRepository = new UserRepository();
    const joinRoomHandler = new JoinRoomHandler(socket, userRepository);
    
    joinRoomHandler.handle({ room: roomRequest.room, username: roomRequest.username });
  });

  socket.on(RequestsTopics.LEAVE_ROOM, (leaveRequest) => {
    const userRepository = new UserRepository();
    const leaveRoomHandler = new LeaveRoomHandler(socket, userRepository);

    leaveRoomHandler.handle({ username: leaveRequest.username });
  });

  socket.on(RequestsTopics.NEW_MESSAGE, (newMessage) => {
    const userRepository = new UserRepository();
    const newMessageUseCase: SendMessageUseCase = new SendMessageUseCase(
      socket,
      userRepository
    );

    newMessageUseCase.handle({
      content: newMessage.content,
      username: newMessage.userId
    });
  });
});

httpServer.listen(PORT, () => {
  console.log(`Socket.IO server is running on http://localhost:${PORT}`);
});
