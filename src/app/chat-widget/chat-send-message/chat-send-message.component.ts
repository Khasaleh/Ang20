import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { firstValueFrom } from 'rxjs';
import { ChatMessage, ChatRestApiService, ChatUserResponse } from 'src/app/service/chatServices/rest-api/chat-rest-api.service';
import { SocketService } from 'src/app/service/chatServices/socket/socket.service';
import { UpdateShareService } from 'src/app/service/chatServices/updateShare/update-share.service';

@Component({
  selector: 'app-chat-send-message',
  templateUrl: './chat-send-message.component.html',
  styleUrls: ['./chat-send-message.component.css']
})
export class ChatSendMessageComponent implements OnInit {
  @Output() messageSent = new EventEmitter<any>();
  @Input() user!: ChatUserResponse | null
  @Input() disableSendButton: boolean = false;
  messageForm: FormGroup;
  selectedFiles: File[] = [];
  types: string[] = [];
  messageToReply!: ChatMessage | null;
  @ViewChild('messageTextarea') messageTextarea!: ElementRef;
  roomName: string = '';

  constructor(
    private fb: FormBuilder,
    private chatRestApiService: ChatRestApiService,
    private updateShareService: UpdateShareService,
    private socketService: SocketService,
  ) {
    this.messageForm = this.fb.group({
      message: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.updateShareService.getReplyMessage().subscribe({
      next: (message: ChatMessage) => {
        this.messageToReply = _.cloneDeep(message);
        this.messageTextarea.nativeElement.focus();
      }
    })
    this.updateShareService.getRoomName().subscribe(room => {
        this.roomName = room;
    })
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFiles[0] = event.target.files[0];
      this.types[0] = this.getFileType(this.selectedFiles[0]);
    } else {
      this.selectedFiles = [];
    }
  }

  onKeyUp(event: KeyboardEvent) {
    setTimeout(() => {
      this.socketService.emitTypingChat({ isTyping: false, roomName: this.roomName, userId: this.user?.userId });
    }, 1000);
  }

  onEnterPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    } else {
      this.socketService.emitTypingChat({ isTyping: true, roomName: this.roomName, userId: this.user?.userId });
    }
  }

  private async uploadFiles(files: File[]): Promise<{ localPath: any; thumbImage: any; type: string }[]> {
    this.disableSendButton = true;
    let fileData: { localPath: any; thumbImage: any; type: string }[] = [];
    try {
      const responses = await firstValueFrom(this.chatRestApiService.uploadMultipleFiles(files, this.user?.userType, this.user?.userId ? this.user?.userId : 0, 0));
      this.disableSendButton = false;
      if (responses) {
        fileData = responses.map((response: any, index: number) => ({
          localPath: response?.data?.uploadBusinessChatFile,
          thumbImage: null,
          type: this.types[0]
        }));
      }
    } catch (error) {
      this.disableSendButton = false;
      console.error('File upload failed', error);
    }
    return fileData;
  }

  async sendMessage() {
    this.disableSendButton = true;
    if (this.messageForm.valid || this.selectedFiles.length > 0) {
      let fileData: { localPath: string, thumbImage: string, type: string }[] = []
      if (this.selectedFiles.length > 0) fileData = await this.uploadFiles(this.selectedFiles);
      this.emitMessage(fileData, this.messageForm.get('message')?.value?.trim());
    }
  }

  private emitMessage(fileData: { localPath: any; thumbImage: any; type: string }[], messageText: string = '') {
    const messageData = { text: messageText, localPaths: fileData, repliedMessageId: this.messageToReply?.id || this.messageToReply?._id };
    this.messageSent.emit(messageData);
    this.messageForm.reset();
    this.selectedFiles = [];
    this.disableSendButton = false
    this.messageToReply = null;
  }


  getFileType(file: File): string {
    const extension = file.name.split('.').pop()?.toLowerCase()
    switch (extension) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'webp':
        return 'image';
      case 'pdf':
      case 'doc':
      case 'docx':
        return 'document';
      default:
        return 'text';
    }
  }

  removeFile(file: File) {
    this.selectedFiles = this.selectedFiles?.filter(f => f !== file);
  }

}
