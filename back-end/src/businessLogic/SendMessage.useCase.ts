import { UserRepository} from './../database/user.database';
import { Socket } from "socket.io";
import { PictochatMessage } from "../domain/message/message.model";
import { MessageType } from "../domain/message/messageType.enum";
import { RoomRepository } from '../database/room.repository';

export type SendMessageCommand = {
  content: string;
  username: string;
};

export type SendMessageResult = {
  message?: PictochatMessage;
  success: boolean;
};

export class SendMessageUseCase {
  private socket:Socket;
  private userRepository:UserRepository;

  public constructor(socket:Socket,UserRepository:UserRepository) 
  { 
    this.socket=socket;
    this.userRepository=UserRepository;
  }

  public handle(command: SendMessageCommand): SendMessageResult {

    // console.log(command)

    // console.log(this.userRepository.getUsers())

    const user = this.userRepository.getUsers().find((user) => user.username === command.username);
    if (!user) {
      return { success: false };
    }
    if (!user.currentRoom) {
      return { success: false };
    }

    const message: PictochatMessage = {
      messageType: MessageType.direct_message,
      content: command.content,
      sent: new Date(),
      sentBy: user
    };
  
    console.log(message)

    new RoomRepository().getRoomByName(user.currentRoom??"")?.messageHistory.push(
      message
    )

    this.socket.broadcast.emit('NEW_MESSAGE', message);
    return { success: true };
  }
}