import { Socket } from "socket.io";
import { UserRepository } from "../database/user.database";

export class CreateUserHandler {
  public constructor(
    private readonly _socket: Socket,
    private readonly _userRepository: UserRepository,
  ) { }

  public handle(): unknown {
    return {};
  }
}