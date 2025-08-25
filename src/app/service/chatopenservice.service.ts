import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatopenserviceService {

constructor() { }


private openChatMenuSubject = new Subject<void>();
  openChatMenu$ = this.openChatMenuSubject.asObservable();

  triggerChatMenuOpen() {
    this.openChatMenuSubject.next();
  }

}
