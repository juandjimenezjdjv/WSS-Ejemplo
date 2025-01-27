import { PictochatMessage } from "../message/message.model";

export interface Room {
  name: string;
  numberOfParticipants: number;
  messageHistory: PictochatMessage[];
}
