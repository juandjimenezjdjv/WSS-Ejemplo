import { Room } from "../domain/room/room.model";

export class RoomRepository {
  private static readonly _rooms: Room[] = [];

  public constructor() {
  }

  public getRooms(): Room[] {
    return RoomRepository._rooms;
  }

  public getRoomByName(name: string): Room | undefined {
    return RoomRepository._rooms.find(room => room.name === name);
  }

  public addRoom(room: Room): void {
    RoomRepository._rooms.push(room);
  }
}

