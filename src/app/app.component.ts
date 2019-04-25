
import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { WebsocketService } from './websocket.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ChatService, WebsocketService]

})
export class AppComponent {

    user:String;
    room:String;
    messageText:String;
    showEmojiPicker = false;
    messageArray:Array<{user:String,message:String}> = [];
    constructor(private _chatService:ChatService){
        this._chatService.newUserJoined()
        .subscribe(data=> this.messageArray.push(data));


        this._chatService.userLeftRoom()
        .subscribe(data=>this.messageArray.push(data));

        this._chatService.newMessageReceived()
        .subscribe(data=>this.messageArray.push(data));
    }

    join(){
        this._chatService.joinRoom({user:this.user, room:this.room});
    }

    leave(){
        this._chatService.leaveRoom({user:this.user, room:this.room});
    }

    toggleEmojiPicker() {
      this.showEmojiPicker = !this.showEmojiPicker;
    }

    addEmoji(event) {
      const { messageText } = this;
      const text = `${messageText}${event.emoji.native}`;

      this.messageText = text;
      this.showEmojiPicker = false;
    }

    sendMessage()
    {
        this._chatService.sendMessage({user:this.user, room:this.room, message:this.messageText});
    }

}
