import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ChatUserResponse } from '../rest-api/chat-rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class ChatSharedInfoService {
  private chatUserCreated = new Subject<ChatUserResponse | null>();

  constructor() { }

  setChatUserCreated(chatUser: ChatUserResponse | null) {
    this.chatUserCreated.next(chatUser)
  }

  getChatUserCreated(): Observable<ChatUserResponse | null> {
    return this.chatUserCreated.asObservable();
  }

}
