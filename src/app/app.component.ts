import { Component, AfterViewChecked } from '@angular/core';
import axios from 'axios';
import Giphy from 'giphy-api';
;

declare const microlink;

import { ChatService } from './chat.service';
import { WebsocketService } from './websocket.service';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CrudService } from './shared/crud.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

  styleUrls: ['./app.component.css'],
  providers: [ChatService, WebsocketService, CrudService]

})
export class AppComponent implements AfterViewChecked {

    user:String;
    room:String;
    messageText:String;
    newMessage: string;
    id: string;
    currentUser: any;
    currentRoom = {};
    messages = [];
    showEmojiPicker = false;
    showGiphySearch = false;
    giphySearchTerm = '';
    giphyResults = [];
    messageArray:Array<{user:String,message:String}> = [];

    // itemsRef: AngularFireObject<any>;
    // item:Observable<any[]>;

    
    constructor(private _chatService:ChatService, private _crudService: CrudService){
        this._chatService.newUserJoined()
        .subscribe(data=> this.messageArray.push(data));

        this._chatService.userLeftRoom()
        .subscribe(data=>this.messageArray.push(data));

        this._chatService.newMessageReceived()
        .subscribe(data=>this.messageArray.push(data));

        // this._crudService.GetChatsList()

        // this.itemsRef = db.object('item');
        // this.item = this.itemsRef.valueChanges();

        // this.items = this.itemsRef.snapshotChanges().pipe(
        //   map(changes => 
        //     changes.map(c => ({user: c.payload.key, ...c.payload.val()}))
        //     )
            
        // );
        //this.items = db.list('/data');
    }

    ngAfterViewChecked() {
      microlink('.link-preview');
    }

  searchGiphy() {
    const giphy = Giphy();
    const searchTerm = this.giphySearchTerm;
    giphy.search(searchTerm)
      .then(res => {
        console.log(res);
        this.giphyResults = res.data;
      })
      .catch(console.error);
  }

  sendGif(title, url) {
    const { currentUser } = this;
    currentUser.sendMessage({
      text: title,
      room: String,
      attachment: {
        link: url,
        type: 'image',
      }
    }).catch(console.error);
    this.showGiphySearch = false;
  }

    toggleEmojiPicker() {
      this.showEmojiPicker = !this.showEmojiPicker;
    }

    toggleGiphySearch() {
      this.showGiphySearch = !this.showGiphySearch;
    }

    join(){
        this._chatService.joinRoom({user:this.user, room:this.room});
    }

    leave(){
        this._chatService.leaveRoom({user:this.user, room:this.room});
    }

    addEmoji(event) {
      const { messageText } = this;
      
      const text = `${messageText}${event.emoji.native}`;

      this.messageText = text;
      this.showEmojiPicker = false;
    }

    updateChat(): void {
      this._crudService.updateChat;
    }

    saveChat(): void {
      this._crudService.saveChat;
    }

    sendMessage()
    {
        if (this.messageText.length > 0) {
          this._chatService.sendMessage({user:this.user, room:this.room, message:this.messageText});
          this.messageText='';
          console.log(" Sending");
          // this._crudService.saveChat();
        }
    }

    addUser() {
      const { user } = this;
      axios.post('http://localhost:5000/users', { user })
      .then(() => {
        console.log("We do not have a token provider"
        )});
        

        hooks: {
          onMessage: message => {
            let { text } = message;
            const urlMatches = message.text.match(/\b(http|https)?:\/\/\S+/gi) || [];
    
            function insertTextAtIndices(text, obj) {
              return text.replace(/./g, function(character, index) {
                return obj[index] ? obj[index] + character : character;
              });
            }
    
            urlMatches.forEach(link => {
              const startIndex = text.indexOf(link);
              const endIndex = startIndex + link.length;
              text = insertTextAtIndices(text, {
                [startIndex]: `<a href="${link}" target="_blank" rel="noopener noreferrer" class="embedded-link">`,
                [endIndex]: '</a>',
              });
            });
    
            this.messages.push({ ...message, text, url_matches: urlMatches, });
          };

          // onPresenceChanged: (state, user) => {
          //   this.users = currentUser.users.sort((a) => {
          //     if (a.presence.state === 'online') return -1;

          //     return 1;
          //   });
          // },
          // // [..]
          // this.currentUser = currentUser;
          //       this.users = currentUser.users;
          //     });
        }

        // .catch(error => console.error(error))

    }

   
  }

