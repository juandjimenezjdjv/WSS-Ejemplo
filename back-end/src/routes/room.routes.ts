import express, { Request, Response } from "express";
import { RoomRepository } from "../database/room.repository";


const router = express.Router();

router.get('/', (request: Request, response: Response) => {
  const roomsRepository = new RoomRepository();
  response.json(roomsRepository.getRooms());
});

export default router;