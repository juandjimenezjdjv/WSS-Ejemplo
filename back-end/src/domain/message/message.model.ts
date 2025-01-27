import { PictochatUser } from "../user/user.model";
import { MessageType } from "./messageType.enum"

export interface PictochatMessage {
  messageType: MessageType;
  content: string;
  sent: Date;
  sentBy: PictochatUser;
}