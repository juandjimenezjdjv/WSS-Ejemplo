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
    // Implement

    return { success: false };
  }
}
