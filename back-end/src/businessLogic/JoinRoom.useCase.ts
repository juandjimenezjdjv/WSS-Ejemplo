import { Socket } from "socket.io";
import { UserRepository } from "../database/user.database";
import { RequestsTopics } from "../constants";
import { RoomRepository } from "../database/room.repository";
import { PictochatMessage } from "../domain/message/message.model";
import { MessageType } from "../domain/message/messageType.enum";

export type JoinRoomCommand = {
  username: string;
  room: string;
};

export type JoinRoomResult = {
  success: boolean;
};

export class JoinRoomHandler {
  public constructor(
    private readonly _socket: Socket,
    private readonly _userRepository: UserRepository
  ) { }

  public handle(command: JoinRoomCommand): JoinRoomResult {
    // console.log('JoinRoomHandler', command)
    if (!command.username || !command.room) {
      return { success: false };
    }

    try {
    
      const room = new RoomRepository().getRoomByName(command.room);
      if (!room){
        return { success: false };
      }

      const user = new UserRepository().getUsers().find((user) => user.username === command.username);
      if (!user) {
        return { success: false };
      }
      if (user.currentRoom === room.name) {
        return { success: false };
      }

      this._socket.join(command.room)
      //this._socket.to(command.room).emit(RequestsTopics.NEW_MESSAGE, {message: 'Un usuario se ha unido a la sala: ', username: command.username})

      user.currentRoom = room.name
      room!.numberOfParticipants += 1;

      const message: PictochatMessage = {
        messageType: MessageType.notification,
        content: `${user.username} se ha unido a la sala`,
        sent: new Date()
      };

      room.messageHistory.push(message)
      this._socket.broadcast.emit('USER_JOINED', {message: `Un usuario se ha unido a la sala ${command.room}: `, username: command.username});
      this._socket.emit('USER_JOINED', {message: `Un usuario se ha unido a la sala ${command.room}: `, username: command.username});

      console.log('User joined room', command.room)
      return { success: true };
      
    } catch (error) {
      console.error(error);
      return { success: false };
    }


  }
}
