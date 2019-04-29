import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Chatdb } from '../shared/chatdb';
import { Observable } from 'rxjs';
import { AppComponent } from "../app.component";

@Injectable({
  providedIn: 'root',
  // template:`
  // <h1>{{ (item | async )?. name }}</h1>
  // `,
})

export class CrudService {

  public items: any = {
    id: "",
    user: "",
    room: "",
    message: "" 

  }
  
  

  itemRef: AngularFireObject<any>;
  item: Observable<Chatdb[]>;
  constructor(db: AngularFireDatabase) { 
    this.itemRef = db.object('item');
    this.item = this.itemRef.valueChanges();
  }

  saveChat(id: string) {
    this.items.push({})
  }

  updateChat(id: string, message: string ) {
    this.items.update({message: newMessage })
  }

  getChats(id: string) {
    return this.itemRef
  }


  getChat(id: string) {
    return this.items[id] ;
  }

  //this function will be recreated to delete chat
  deleteChat(id : string) {
    this.itemRef.remove();
  }

}
