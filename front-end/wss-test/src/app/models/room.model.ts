export enum MessageType {
  direct_message = 'direct_message',
  notification = 'group_notification',
};

export interface PictochatUser {
  username: string;
  socketId: string;
  currentRoom?: string;
};


export interface PictochatMessage {
  messageType: MessageType;
  content: string;
  sent: Date;
  sentBy?: PictochatUser;
}

export interface Room {
    name: string;
    numberOfParticipants: number;
    messageHistory: PictochatMessage[];
  }
  