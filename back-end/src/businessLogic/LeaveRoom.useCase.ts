import { Socket } from "socket.io";
import { UserRepository } from "../database/user.database";

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
  ) {
  }

  public handle(command: LeaveRoomCommand): LeaveRoomResult {
    // TODO: implement

    return { success: false };
  }
}
