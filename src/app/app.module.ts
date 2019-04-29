import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule } from '@angular/forms';
import { IconsModule } from './icons/icons.module';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { AppComponent } from "./app.component";
import { ChatService } from "./chat.service";
import { WebsocketService } from "./websocket.service";



@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, 
                FormsModule,
                IconsModule,
                PickerModule,
                AngularFireModule.initializeApp(environment.firebaseConfig),
                AngularFireDatabaseModule,
                AngularFireAuthModule],
    providers: [ChatService,
                WebsocketService],
    bootstrap: [AppComponent]
})


export class AppModule {

}