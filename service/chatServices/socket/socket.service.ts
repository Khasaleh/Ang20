
import { HostListener, Injectable, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from '../../TokenStorgeService.service';
import { Observable } from 'rxjs';
import { ChatMessage, ChatUserResponse } from '../rest-api/chat-rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnInit {
  private nodeChatUrl = environment.businessChatBaseUrl;
  private socket: any = null;
  businessId: number = Number(this.tokenStorage.getBusinessID())

  constructor(
    private tokenStorage: TokenStorageService,
    private sanitizer: DomSanitizer,
  ) { }
  ngOnInit(): void {
  }

  checkSocket() {
    return this.socket != null && this.socket.connected
  }

  async socketConnect(chatUser: any = null) {
    const token = this.tokenStorage.getToken();
    if (chatUser) {
      const query = {
        userId: chatUser.userId,
        firstName: chatUser.firstName,
        lastName: chatUser.lastName,
        ...(chatUser.email ? { email: chatUser.email } : {}),
        ...(chatUser.contactNumber ? { phone: chatUser.contactNumber } : {}),
        profilePhoto: chatUser.uploadYourIdUrl || chatUser.profilePhoto || chatUser.profilePicture || '',
        userName: chatUser.userName || '',
        business_id: this.businessId,
        type: chatUser.userType
      };
      const socketOptions = {
        autoConnect: true,
        auth: { token },
        query,
        transports: ['websocket'],
        forceNew: true,
      };

      try {
        this.socket = io(this.nodeChatUrl, socketOptions);
        this.addErrorListeners();

        this.socket.on('connect_error', (error: any) => {
          console.error('Error when connecting:', error);
        });

        this.socket.on('error', (error: any) => {
          console.error('Connection error:', error);
        });

        this.socket.on('connect_timeout', (error: any) => {
          console.error('Connection timeout error:', error);
        });

        this.socket.on('connect', () => {
          console.log('onConnect to chatModel: ', chatUser);
        });

        this.socket.on('connection', () => {
          console.log('onConnection to chat server success');
        });

        await new Promise<void>((resolve, reject) => {
          this.socket.on('connect', () => {
            resolve();
          });

          this.socket.on('connect_error', (error: any) => {
            reject(error);
          });

          this.socket.on('error', (error: any) => {
            reject(error);
          });

          this.socket.on('connect_timeout', (error: any) => {
            reject(error);
          });
        });
      } catch (error) {
        console.error('Failed to connect to socket:', error);
      }
    }
  }

  addErrorListeners() {
    this.socket.on('connect_error', (error: any) => {
      console.error('Connection error:', error);
    });

    this.socket.on('error', (error: any) => {
      console.error('General socket error:', error);
    });

    this.socket.on('connect_timeout', (error: any) => {
      console.error('Connection timeout error:', error);
    });

    this.socket.on('disconnect', (reason: any) => {
      console.error('Socket disconnected:', reason);
      if (reason === 'io server disconnect') {
        this.socket.connect();
      }
    });

    this.socket.on('reconnect_attempt', () => {
      console.warn('Attempting to reconnect...');
    });

    this.socket.on('reconnect_failed', (error: any) => {
      console.error('Reconnection failed:', error);
    });
  }

  async disconnect() {
    if (this.socket) {
      this.socket.emit('clientDisconnecting', 'Client is intentionally disconnecting due to server refresh');
      await this.socket.disconnect();
      this.socket.close();
      this.socket = null;
    }
  }

  getSocketId() {
    return this.socket?.id;
  }

  getSocket() {
    return this.socket;
  }

  joinChat(friendId: string, friendType: string) {
    if (this.socket) {
      this.socket.emit('joinChat', { friendId, friendType });
    }
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: Event) {
    if (this.socket) {
      this.disconnect();
    }
  }

  emitNewMessage(messageData: any) {
    this.socket.emit('newMessage', messageData);
  }

  onNewMessage() {
    return new Observable((observer) => {
      this.socket.on('newMessage', (data: any) => {
        observer.next(data);
      })
    });
  }
  async emitCheckEmployees(userId: number, employeeIds: number[], chatUser: ChatUserResponse | null): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const id = chatUser ? chatUser.userId : null;
      if (this.socket) {
        if (!this.socket.connected) {
          await this.socketConnect(chatUser);
        }
        this.socket.emit('checkEmployees', { id, employeeIds }, (response: any) => {
          if (response) {
            resolve(response);
          } else {
            reject('No response from server');
          }
        });
      } else {
        reject('Socket is not initialized');
      }
    });
  }


  emitJoinRoom(userId: number, friendId: number, friendType: string): Observable<any> {
    return new Observable(observer => {
      if (this.socket) {
        this.socket.emit('joinRoom', { userId: userId, userType: 'customer', friendId: friendId, friendType: friendType }, (response: any) => {
          if (response) {
            observer.next(response);
            observer.complete();
          } else {
            observer.error('No response from server');
          }
        });
      } else {
        observer.error('Socket is not initialized');
      }
    });
  }

  onUpdateMessage(): Observable<ChatMessage> {
    return new Observable((observer) => {
      this.socket.on('updateMessage', (data: any) => {
        if (!!data) observer.next(data);
      })
    });
  }

  onDeleteMessage() {
    return new Observable((observer) => {
      this.socket.on('deleteMessage', (data: any) => {
        if (!!data) observer.next(data);
      })
    });
  }

  offAllListeners() {
    if (this.socket) {
        this.socket.off('deleteMessage');
        this.socket.off('typingChat');
        this.socket.off('updateMessage');
        this.socket.off('newMessage');
    }
  }

  onEndChat() {
    return new Observable((observer) => {
      this.socket.on('endChat', (data: any) => {
        if (!!data) observer.next(data);
      })
    });
  }

  onTypingChat(): Observable<ChatMessage> {
    return new Observable((observer) => {
      this.socket.on('typingChat', (data: any) => {
        if (!!data) observer.next(data);
      })
    });
  }

  emitTypingChat(data: any) {
    this.socket.emit('typingChat', {
      typing: data.isTyping,
      roomName: data.roomName,
      userId: data.userId,
    });
  }

  onUpdateEmployee(): Observable<ChatMessage> {
    return new Observable((observer) => {
      this.socket.on('updateEmployee', (data: any) => {
        if (!!data) observer.next(data);
      })
    });
  }

  emitChatMessageReaction(messageId: string, userId: any, likeType: string, roomName: any) {
    this.socket.emit('newReaction', {
      type: likeType,
      messageId: messageId,
      userId: userId,
      userType: 'employee',
      roomName: roomName
    });
  }

  OnChatMessageReaction(): Observable<ChatMessage> {
    return new Observable((observer) => {
      this.socket.on('newReaction', (data: any) => {
        if (!!data) observer.next(data);
      })
    });
  }

}





export interface ChatEmployeeInfoAfterConnect {
  activated: boolean;
  active: boolean;
  business_id: number;
  createdAt: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
  profilePhoto: string;
  role: string;
  roomName: string;
  socketId: string[];
  status: string;
  updatedAt: string;
  userId: number;
  userName: string;
  userType: string;
  __v: number;
  _id: string;
}
