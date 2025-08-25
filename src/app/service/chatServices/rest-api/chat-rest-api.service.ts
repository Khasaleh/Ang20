import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatRestApiService {
  baseUrl = environment.businessChatBaseUrl;
  getBusinessChatsUrlMessages = `${this.baseUrl}'/api/messages/read-messages`;
  getSettings = `${this.baseUrl}/api/shortcuts/get-settings`;
  createUser = `${this.baseUrl}/api/users/create-user`;
  private businessBE_Url = environment.baseURL;

  constructor(
    private http: HttpClient,
  ) { }

  getAquiredFeilds(businessId: number): Observable<any> {
    const params = {
      business_id: businessId
    };
    return this.http.get(this.getSettings, { params });
  }

  createCustomerChatUser(business_id: number, firstName: string, lastName: string, type: string, email: string, phone: string, comment: string, userId: any, profilePhoto: any): Observable<any> {
    const body = {
      business_id,
      firstName,
      lastName,
      profilePhoto,
      type,
      email,
      phone,
      userId,
      comment
    };
    return this.http.post(this.createUser, body);
  }

  getChatAvailability(businessUserId: number, dateTime: string): Observable<any> {
    let form: FormData = new FormData();
    const query = `
    query{
      getChatAvailability(businessId:${businessUserId}, dateTime: "${dateTime}")
    }`;
    form.append('query', query);
    return this.http.post(this.businessBE_Url, form);
  }

  uploadBusinessChatFile(file: File, businessUserId: number, customerUserId: number): Observable<any> {
    let form: FormData = new FormData();
    const query = `
      mutation {
        uploadBusinessChatFile(chatDto: {
          type: ADMIN,
          businessUserId: ${businessUserId},
          customerUserId: ${customerUserId}
        })
      }`;
    form.append('query', query);
    form.append('files', file);
    return this.http.post(this.businessBE_Url, form);
  }

  uploadMultipleFiles(files: File[], type: string | undefined, businessUserId: number, customerUserId: any): Observable<any[]> {
    const observables: Observable<any>[] = files.map(file => this.uploadBusinessChatFile(file, businessUserId, customerUserId));
    return forkJoin(observables).pipe(
      tap(responses => console.log('All files uploaded:', responses))
    );
  }

}



export class ChatModel {
  _id: string;
  id: string;
  activateDate: string;
  isActive: boolean;
  lastMessage: string;
  lastMessageTimestamp: string;
  lastMessageType: string;
  userType: string;
  socketId: string[];
  userId: number;
  businessId: number;
  userName: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  middleName: string;
  profilePhoto: string;
  roomName: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  unreadCount: number;

  constructor(data: any) {
    this._id = data._id
    this.id = data.id
    this.activateDate = data.activateDate;
    this.isActive = data.isActive;
    this.lastMessage = data.lastMessage;
    this.lastMessageTimestamp = data.lastMessageTimestamp;
    this.lastMessageType = data.lastMessageType;
    this.userType = data.userType;
    this.socketId = data.socketId;
    this.userId = data.userId;
    this.businessId = data.businessId;
    this.userName = data.userName;
    this.email = data.email;
    this.phone = data.phone;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.middleName = data.middleName;
    this.profilePhoto = data.profilePhoto;
    this.roomName = data.roomName;
    this.active = data.active;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.unreadCount = data.unreadCount;
  }
}
export class ChatMessage {
  announcement: any;
  createdAt: string;
  firstName: string;
  id: string;
  _id: string;
  isRead: boolean;
  lastName: string;
  senderName: string;
  profilePhoto: string;
  localPaths?: { localPath: string; type: string }[];
  readers?: { userId: number; userType: string }[];
  receiverId: number;
  receiverType: string;
  senderId: number;
  senderType: string;
  text: string;
  type: string;
  updatedAt: string;
  deletedLocalPath: string;
  updatedTime!: string;
  replyOn: boolean = false; // to check after update time
  roomName!: string; // for update time
  repliedMessage!: ChatMessage;
  messageLike: MessageLike[] = [];

  constructor(data: any) {
    this.announcement = data.announcement;
    this.createdAt = data.createdAt;
    this.firstName = data.firstName;
    this.senderName = data.senderName;
    this.id = data.id
    this._id = data._id;
    this.isRead = data.isRead;
    this.lastName = data.lastName;
    this.localPaths = data.localPaths;
    this.profilePhoto = data.profilePhoto;
    this.readers = data.readers;
    this.receiverId = data.receiverId;
    this.receiverType = data.receiverType;
    this.senderId = data.senderId;
    this.senderType = data.senderType;
    this.text = data.text;
    this.type = data.type;
    this.updatedAt = data.updatedAt;
    this.deletedLocalPath = '';
    this.updatedTime = data.updatedTime;
    this.roomName = data.roomName;
    this.repliedMessage = data.repliedMessage
  }

  static orderChats(chats: ChatMessage[]): ChatMessage[] {
    return chats.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateA - dateB;
    });
  }

}

export interface Shortcut {
  id: string;
  business_id: string;
  default: boolean;
  text: string;
  type: string;
  answers: { id: string, text: string }[]
}

export interface AcquireInfo {
  name: string;
  required: boolean;
  _id: string;
}



export interface ChatUserResponse {
  profilePicture: string;
  active: boolean;
  business_id: number;
  firstName: string;
  id: string;
  lastName: string;
  socketId: string[];
  userId: number;
  message: string;
  userType: string;
  profilePhoto: string;
  phone: string; // added for connect time
  email: string; //  added for connect time
}

export interface MessageLike {
  _id: string;
  type: string;
  messageId: string;
  userId: number;
  userType: string;
}
