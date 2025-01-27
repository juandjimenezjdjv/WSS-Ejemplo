import { Socket } from "socket.io";
import { UserRepository } from "../database/user.database";
import { PictochatMessage } from "../domain/message/message.model";

export type SendMessageCommand = {
  content: string;
  username: string;
};

export type SendMessageResult = {
  message?: PictochatMessage;
};

export class SendMessageUseCase {
  public constructor(
    private readonly _socket: Socket,
    private readonly _userRepository: UserRepository,
  ) { }

  public handle(command: SendMessageCommand): SendMessageResult {
    // TODO: Implement
    return { };
  }
}