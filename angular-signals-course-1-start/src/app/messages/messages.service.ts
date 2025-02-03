import {Inject, Injectable, signal} from "@angular/core";
import {Message, MessageSeverity} from "../models/message.model";
import {APP_NAME_TOKEN, ENVIRONMENT_TOKEN} from "../factory/messages.factory";


@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  #messageSignal = signal<Message | null>(null);

  message = this.#messageSignal.asReadonly();

  constructor(@Inject(ENVIRONMENT_TOKEN) isDev: boolean,
              @Inject(APP_NAME_TOKEN) appName: string) {
    console.log(isDev, appName);
  }


  showMessage(text: string, severity: MessageSeverity){
    this.#messageSignal.set({text, severity});
  }

  clear(){
    this.#messageSignal.set(null);
  }
}
