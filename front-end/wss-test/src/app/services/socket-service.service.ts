import { EventEmitter, Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { PictochatMessage, Room } from '../models/room.model';
// import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {
  private io?: Socket;

  public readonly _newNotification: EventEmitter<{ message: string, date: Date }> = new EventEmitter();
  public readonly _roomCreated: EventEmitter<Room> = new EventEmitter();
  public readonly _newMessage: EventEmitter<PictochatMessage> = new EventEmitter();
  public readonly _joinRoom: EventEmitter<PictochatMessage> = new EventEmitter();
  public readonly _leaveRoom: EventEmitter<PictochatMessage> = new EventEmitter();

  constructor(
  ) {
  }

  public connect() {
    if (!this.io) {
      console.log('Connecting');
      this.io = io('http://localhost:3000');

      // Escuchar el evento de nueva sala creada
      this.io.on("ROOM_CREATED", (room: Room) => {
        this._roomCreated.emit(room);
      });

      // Escuchar el evento de notificación general
      this.io.on("GENERAL_NOTIFICATION", (notification: { message: string, date: Date }) => {
        this._newNotification.emit(notification);
      });

      // Escuchar el evento de nuevo mensaje
      this.io.on("NEW_MESSAGE", (message: PictochatMessage) => {
        this._newMessage.emit(message);
      });

      // Escuchar el evento de unirse
      this.io.on("USER_JOINED", (message: PictochatMessage) => {
        this._joinRoom.emit(message);
      });

      // Escuchar el evento de salirse
      this.io.on("USER_LEFT", (message: PictochatMessage) => {
        this._leaveRoom.emit(message);
      });

      console.log('Connected')
    }
  }

}
