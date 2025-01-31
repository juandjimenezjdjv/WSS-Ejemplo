import { UserRepository } from './database/user.database';
import { RoomRepository } from "./database/room.repository";
import { MessageType } from "./domain/message/messageType.enum";

export function Startup() {
  const roomsRepository = new RoomRepository();
  roomsRepository.addRoom({
    messageHistory: [
      {
        content: 'Grupo A creado',
        messageType: MessageType.notification,
        sent: new Date(),
      }
    ],
    name: 'A',
    numberOfParticipants: 0,
  });

  roomsRepository.addRoom({
    name: 'B',
    numberOfParticipants: 0,
    messageHistory: [
      {
        content: 'Grupo B creado',
        messageType: MessageType.notification,
        sent: new Date(),
      }
    ],
  });

  roomsRepository.addRoom({
    name: 'C',
    numberOfParticipants: 0,
    messageHistory: [
      {
        content: 'Grupo C creado',
        messageType: MessageType.notification,
        sent: new Date(),
      }
    ],
  });

  roomsRepository.addRoom({
    name: 'D',
    numberOfParticipants: 0,
    messageHistory: [
      {
        content: 'Grupo D creado',
        messageType: MessageType.notification,
        sent: new Date(),
      }
    ],
  });

  const userRepository = new UserRepository()
  userRepository.addUser({
    socketId: 'user 1 socket id',
    username: 'user 1',
    // currentRoom: 'A'
  })

};
