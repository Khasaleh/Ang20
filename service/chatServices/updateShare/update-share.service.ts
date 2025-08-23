import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ChatMessage } from '../rest-api/chat-rest-api.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class UpdateShareService {
  private messageBeforeUpdateSubject = new Subject<ChatMessage>();
  private messageAfterUpdateSubject = new Subject<ChatMessage>();
  private roomNameSubject = new BehaviorSubject<string>('');
  private messageReplySubject = new Subject<ChatMessage>();
  private resetReplySubject = new Subject<boolean>();

  constructor() { }

  shareReplyMessage(messageData: ChatMessage) {
    this.messageReplySubject.next(messageData);
  }

  getReplyMessage() {
    return this.messageReplySubject.asObservable();
  }

  resetReply() {
    this.resetReplySubject.next(true);
  }

  getResetReplyMessage() {
    return this.resetReplySubject.asObservable();
  }

  shareRoomName(roomName: any) {
    this.roomNameSubject.next(roomName);
  }

  getRoomName(): Observable<string> {
    return this.roomNameSubject.asObservable();
  }

  getMessageAfterUpdateObservable(): Observable<ChatMessage> {
    return this.messageAfterUpdateSubject.asObservable();
  }

  shareMessagenAfterUpdateTime(messageData: ChatMessage) {
    this.messageAfterUpdateSubject.next(_.cloneDeep(messageData));
  }

  getMessageBeforeUpdateObservable(): Observable<ChatMessage> {
    return this.messageBeforeUpdateSubject.asObservable();
  }

  shareMessageBeforeUpdateTime(messageData: ChatMessage) {
    this.messageBeforeUpdateSubject.next(_.cloneDeep(messageData));
  }

}
