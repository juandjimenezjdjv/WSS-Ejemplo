import { Socket } from "socket.io";
import { UserRepository } from "../database/user.database";
import { RoomRepository } from "../database/room.repository";
import { PictochatMessage } from "../domain/message/message.model";
import { MessageType } from "../domain/message/messageType.enum";

export type LeaveRoomCommand = {
  username: string;
};

export type LeaveRoomResult = {
  success: boolean;
};

export class LeaveRoomHandler {
  public constructor(
    private readonly _socket: Socket,
    private readonly _userRepository: UserRepository,
    private readonly _roomRepository: RoomRepository,
  ) {
  }

  public handle(command: LeaveRoomCommand): LeaveRoomResult {
    
    //Obtener usuario
    const user = this._userRepository.getUsers().find((user) => user.username === command.username);
    if (!user) {
      return { success: false };
    }

    if (!user.currentRoom){ 
      return { success: false };
    }

    //Obtener la sala
    const room = this._roomRepository.getRoomByName(user.currentRoom!);

    // Validar que la room exista
    if (!room){
      return { success: false };
    }
    
    // Quitarle un participante a la sala
    room.numberOfParticipants -= 1;
    
    //implementar la logica de salir de la sala
    this._socket.leave(user.currentRoom!);

    //Actualizar el usuario
    user.currentRoom = undefined;

    const message: PictochatMessage = {
      messageType: MessageType.notification,
      content: `${user.username} ha salido de la sala`,
      sent: new Date()
    };

    room.messageHistory.push(message)

    //Mandar el mensaje de que alguien un usuario ha salido
    this._socket.broadcast.emit('USER_LEFT', {message: `Un usuario ha salido de la sala ${room}: `, username: user.username});
    this._socket.emit('USER_LEFT', {message: `Un usuario ha salido de la sala ${room}: `, username: user.username});
    console.log('User left room', room)
    return { success: true };
  }
}
