import { EventEmitter, Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
// import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {
  private io?: Socket;

  public readonly _newNotification: EventEmitter<{ message: string, date: Date }> = new EventEmitter();
  private readonly _roomCreated: EventEmitter<unknown> = new EventEmitter();

  constructor(
  ) {
  }

  public connect() {
    if (!this.io) {
      console.log('Connecting');
      this.io = io('http://localhost:3000');
      console.log('Connected')
    }
  }

}
