import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chat }       from '../../providers/chat/chat';

@Component({
  selector: 'chat-component',
  templateUrl: 'chat.html',
  providers: [ Chat ]
})

export class ChatPage implements OnInit, OnDestroy {
  messages = [];
  connection;
  message: any;

  constructor(private chatService: Chat) { }

    sendMessage() {
      console.log(this.message)
      this.chatService.sendMessage(this.message);
      this.message = '';
    }

    ngOnInit() {
      this.connection = this.chatService.getMessages().subscribe(message => {
        this.messages.push(message);
      })
    }

    ngOnDestroy() {
      this.connection.unsubscribe();
    }
  }
