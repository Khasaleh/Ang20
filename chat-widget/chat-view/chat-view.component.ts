import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ChatMessage, ChatUserResponse } from 'src/app/service/chatServices/rest-api/chat-rest-api.service';
import { ChatEmployeeInfoAfterConnect, SocketService } from 'src/app/service/chatServices/socket/socket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.css']
})
export class ChatViewComponent implements OnInit {

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  awsUrl = environment.awsKey;
  @Input() chats: ChatMessage[] = []
  @Input() chatUser!: ChatUserResponse | null
  @Input() employee!: ChatEmployeeInfoAfterConnect | null
  @Output() onMessageSent = new EventEmitter<any>();
  @Input() disableSendButton: boolean = false;
  @Input() queueInFront = 0;
  @Input() typingData: any;
  @Input() redirected = false;
  @Input() oldUserId!: number;
  @Input() lastIndex!: number;
  roomName = ''

  constructor(
    private socketService: SocketService,
  ) { }

  ngOnInit() { }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }


  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  sendMessage(event: any) {
    this.onMessageSent.emit(event)
  }

  isNewDate(currentTimestamp: string | undefined, previousTimestamp: string | undefined): boolean {
    if (!previousTimestamp) {
      return true;
    }
    const currentDate = new Date(currentTimestamp ? currentTimestamp : new Date());
    const previousDate = new Date(previousTimestamp);
    return !this.isSameDate(currentDate, previousDate);
  }

  isSameDate(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
  }

  reactOnOtherUserMessage(event: any) {
    this.socketService.emitChatMessageReaction(event.messageId, this.chatUser?.userId, event.reactionType, this.employee?.roomName)
  }

}
