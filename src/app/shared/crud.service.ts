import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Chatdb } from '../shared/chatdb';
import { Observable } from 'rxjs';
import { AppComponent } from "../app.component";


@Injectable({
  providedIn: 'root',

})

export class CrudService {


itemsRef: AngularFireList<any>;
itemRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  saveChat(chatdb: Chatdb) {
    this.itemsRef.push({
        user:chatdb.user,
        room: chatdb.room,
        message: chatdb.message
    })
  }

  GetChat(chatdb: Chatdb){
    //   this.itemRef= this.db.object('chats-list/'+ id);
      return this.itemRef;
  }

  GetChatsList() {
      this.itemRef=this.db.object('chats-list');
      return this.itemsRef;
  }

  updateChat(chatdb: Chatdb ) {
    this.itemRef.update({
        user: chatdb.user,
        room: chatdb.room,
        message: chatdb.message
    })
  }

  //this function will be recreated to delete chat
  deleteChat(chatdb: Chatdb) {
    // this.itemRef=this.db.object('chats-list/' +id);
    this.itemRef.remove();
  }

}
