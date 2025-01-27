import { Socket } from "socket.io";
import { UserRepository } from "../database/user.database";

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
    private readonly _userRepository: UserRepository,
  ) { }

  public handle(command: JoinRoomCommand): JoinRoomResult {
    console.log('JoinRoomHandler', command)
    if (!command.username || !command.room) {
      return { success: false };
    }

    const user = this._userRepository.getUsers().find((user) => user.username === command.username);
    if (!user) {
      return { success: false };
    }

    try {
      this._socket.join(command.room)
      console.log('User joined room', command.room)

      this._socket.to(command.room).emit('NEW_MESSAGES', {message: 'User has joined the room', username: command.username})
      return { success: false };
    } catch (error) {
      console.error(error);
      return { success: false };
    }


  }
}
