import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class Chat {
  private url = 'http://localhost:8080/chat';
  private socket = io(this.url);

  sendMessage(message) {
   this.socket.emit('add-message', message);
   console.log("MESSAGE SENT");
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    })
    return observable;
  }
}
