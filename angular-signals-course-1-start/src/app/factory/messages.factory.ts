import {MessagesService} from "../messages/messages.service";
import {InjectionToken} from "@angular/core";

export const ENVIRONMENT_TOKEN = new InjectionToken<boolean>('ENVIRONMENT_TOKEN');
export const APP_NAME_TOKEN = new InjectionToken<string>('APP_NAME_TOKEN');


export function messagesFactory(isDev: boolean, appName: string): MessagesService {
  return new MessagesService(isDev, appName);
}
