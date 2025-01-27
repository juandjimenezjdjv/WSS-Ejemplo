import { Socket } from "socket.io";
import { RoomRepository } from "../database/room.repository";
import { Room } from "../domain/room/room.model";

export type CreateRoomCommand = {
  name: string;
};

export type CreateRoomResult = {
  room?: Room;
}

export class CreateRoomHandler {
  public constructor(
    private readonly _socket: Socket,
    private readonly _roomRepository: RoomRepository
  ) {}

  public handle(command: CreateRoomCommand): CreateRoomResult {
    // TODO: implement
    
    return { };
  } 
}

