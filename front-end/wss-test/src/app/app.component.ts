import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SocketServiceService } from './services/socket-service.service';
import { RoomServiceService } from './services/room-service.service';
import { Observable, of } from 'rxjs';
import { MessageType, PictochatMessage, Room } from './models/room.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'wss-test-2';

  rooms$!: Room[];

  currentRoom?: Room;
  notifications: { message: string, date: Date }[] = []

  public MessageType = MessageType

  public constructor(
    private readonly socketService: SocketServiceService,
    private readonly _roomService: RoomServiceService
  ) {
    this.reloadRooms()
  }

  reloadRooms(): void {
    this._roomService.getRooms().subscribe(rooms => {
      this.rooms$ = rooms

      if (this.currentRoom){
        this.currentRoom = rooms.find((room) => room.name === this.currentRoom?.name)
      }

    });
  }

  ngOnInit(): void {
    // Conectar al servidor de Socket.IO
    
  }

  public onSelectRoom(room: Room) {
    this.currentRoom = this.currentRoom === undefined || this.currentRoom.name !== room.name
      ? room
      : undefined;
  }

  public getMessageClass(message: PictochatMessage) {
    
    if (message.messageType === MessageType.notification) {
      return ['justify-center rounded-full bg-slate-100'];
    }

    if (message.messageType === MessageType.direct_message) {
      return ['justify-center rounded-md bg-slate-100'];
    }
    return [];
  }

  public connect() {
    this.socketService.connect();

    // Suscribirse al evento de notificación general
    this.socketService._newNotification
      .subscribe((notification: { message: string, date: Date }) => {
        this.notifications.push(notification);
      });

    // Suscribirse al evento de nueva sala creada
    this.socketService._roomCreated
      .subscribe((room: Room) => {
        this.reloadRooms()
      });

    // Suscribirse al evento de nuevo mensaje en un grupo
    this.socketService._newMessage
      .subscribe((message: PictochatMessage) => {
        this.reloadRooms()
      });

    // Suscribirse al evento de UNIRSE
    this.socketService._joinRoom
      .subscribe((message: PictochatMessage) => {
        this.reloadRooms()
      });

    // Suscribirse al evento de SALIRSE
    this.socketService._leaveRoom
      .subscribe((message: PictochatMessage) => {
        this.reloadRooms()
      });

  }

}
