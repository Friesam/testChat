import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule } from '@angular/forms';
import { IconsModule } from './icons/icons.module';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

import { AppComponent } from "./app.component";
import { ChatService } from "./chat.service";
import { WebsocketService } from "./websocket.service";


@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, 
                FormsModule,
                IconsModule,
                PickerModule],
    providers: [ChatService,
                WebsocketService],
    bootstrap: [AppComponent]
})


export class AppModule {

}