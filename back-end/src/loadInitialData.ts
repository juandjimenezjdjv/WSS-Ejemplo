import { RoomRepository } from "./database/room.repository";

export function Startup() {
  const roomsRepository = new RoomRepository();
  roomsRepository.addRoom({
    messageHistory: [],
    name: 'A',
    numberOfParticipants: 0,
  });

  roomsRepository.addRoom({
    messageHistory: [],
    name: 'B',
    numberOfParticipants: 0,
  });

  roomsRepository.addRoom({
    messageHistory: [],
    name: 'C',
    numberOfParticipants: 0,
  });

  roomsRepository.addRoom({
    messageHistory: [],
    name: 'D',
    numberOfParticipants: 0,
  });
};
