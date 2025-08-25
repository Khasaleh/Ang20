import { UpdateShareService } from 'src/app/service/chatServices/updateShare/update-share.service';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CookieDataServiceService } from '../service/cookie-data-service.service';
import { TokenStorageService } from '../service/TokenStorgeService.service';
import { AuthService } from '../service/auth.service';
import * as _ from 'lodash';
import { AcquireInfo, ChatMessage, ChatRestApiService, ChatUserResponse } from '../service/chatServices/rest-api/chat-rest-api.service';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { ChatBackendQueriesService, ChatDirection } from '../service/chatServices/backend-queries/chat-backend-queries.service';
import { ChatEmployeeInfoAfterConnect, SocketService } from '../service/chatServices/socket/socket.service';
import { firstValueFrom, from } from 'rxjs';
import { ChatSharedInfoService } from '../service/chatServices/chat-shared-info/chat-shared-info.service';
import { ChatSettingResponse } from '../models/ThemeDashboardContent';
import { SessionResponse } from '../models/SessionResponse';
import { ChatopenserviceService } from '../service/chatopenservice.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MessageRecommendationsComponent } from './message-recommendations/message-recommendations.component';
import { ChatViewComponent } from './chat-view/chat-view.component';
import { GuestDataInfoComponent } from './guest-data-info/guest-data-info.component';

@Component({
  selector: 'app-chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    TranslateModule,
    MessageRecommendationsComponent,
    ChatViewComponent,
    GuestDataInfoComponent,
  ],
})
export class ChatWidgetComponent implements OnInit, AfterViewInit {
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  @Input() chatSettings!: ChatSettingResponse

  questionSelected: boolean = false;
  startChatConversation: boolean = false;
  chatIconColor: string = "#000000";
  sessionResponse!: SessionResponse;
  dataRequired: boolean = false;
  user: any;
  acquireInfo: AcquireInfo[] = [];
  questions: ChatDirection[] = [];
  comment: string = '';
  userType: string = 'guest';
  chatUser!: ChatUserResponse | null;
  employeeInfo!: ChatEmployeeInfoAfterConnect | null;
  linkingToEmployeeInProgress: boolean = false;
  tryWithOtherQuestion: boolean = false;
  tryAgain = false;
  commentRequired = false;
  commentFieldView = false;
  logoutObservable: any;
  isLoggedUser = false;
  queueInFront: number = 0;
  disableSendButton = false;
  chats: ChatMessage[] = [];
  commRequiredForLoggedInUser = false;
  chatEndedByEmp = false;
  typingData: any;
  redirected: boolean = false;
  oldUserId!: number;
  formInitializing: boolean = true;
  timerOut: boolean = false;
  businessAvailable: boolean = false;
  currentDateTime: string = '';

  constructor(
    private socketService: SocketService,
    private cookieDateService: CookieDataServiceService,
    private tokenStorage: TokenStorageService,
    private authService: AuthService,
    private chatRestApiService: ChatRestApiService,
    private chatBackendQueriesService: ChatBackendQueriesService,
    private chatSharedInfoService: ChatSharedInfoService,
    private cdr: ChangeDetectorRef,
    private updateShareService: UpdateShareService,
    private chatService: ChatopenserviceService
  ) { }

  async ngOnInit() {

    this.chatService.openChatMenu$.subscribe(() => {
      this.menuTrigger.openMenu();
    });

    this.currentDateTime = this.getCurrentDateTime();
    await this.getChatAvailability(this.currentDateTime)
    this.loginLogoutDetector();
    await this.initChatPopup();
  }

  async getChatAvailability(dateTime: string) {
    const r = await firstValueFrom(this.chatRestApiService.getChatAvailability(Number(this.tokenStorage.getBusinessID()), dateTime))
    this.businessAvailable = r?.data?.getChatAvailability;
  }

  getCurrentDateTime(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);
    const hours = ('0' + currentDate.getHours()).slice(-2);
    const minutes = ('0' + currentDate.getMinutes()).slice(-2);
    const seconds = ('0' + currentDate.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  onEndChat() {
    this.socketService.onEndChat().subscribe({
      next: chatEnded => {
        this.chatEndedByEmp = true;
        this.resetChatState();
      }
    });
  }

  onUpdateMessage() {
    this.socketService.onUpdateMessage().subscribe({
      next: messageUpdated => {
        this.chats = this.chats.map(c =>
          (c.id || c._id) === messageUpdated.id ? _.cloneDeep(messageUpdated) : c
        );
      }
    });
  }

  onDeleteMessage() {
    this.socketService.onDeleteMessage().subscribe({
      next: (r: any) => {
        this.chats = this.chats.filter(c => !!r && (c.id || c._id) != r.id)
      }
    })
  }

  onNewMessage() {
    this.socketService.onNewMessage().subscribe({
      next: (newMessage: any) => {
        this.chats.push(newMessage)
        this.scrollToBottom();
      }
    })
  }

  async initChatPopup() {
    setTimeout(() => {
      this.formInitializing = false;
    }, 3000);
    setTimeout(async () => {
      await this.getBusinessChatQuestions();
      await this.getAquiredFields();
    }, 2000);

    setTimeout(async () => {
      this.initializeUser();
    }, 3000);
  }

  ngAfterViewInit() {
    this.resetChatState();
  }

  private initializeUser() {
    this.chatUser = this.tokenStorage.getChatUserFromSession();
    if (!this.user) this.user = { ...this.tokenStorage.getUser() };
    this.checkUserType();
  }

  async getBusinessChatQuestions() {
    const r = await firstValueFrom(this.chatBackendQueriesService.getListOfChatDirectionByBusinessId(Number(this.tokenStorage.getBusinessID())))
    this.questions = r?.data?.getListOfChatDirectionByBusinessId;
  }

  async getAquiredFields() {
    const r = await firstValueFrom(this.chatRestApiService.getAquiredFeilds(Number(this.tokenStorage.getBusinessID())))
    if (r.data) {
      this.acquireInfo = r?.data?.acquireInfo;
    } else {
      const aqD: AcquireInfo[] = [{ name: 'First Name', required: true, _id: '1' }, { name: 'Last Name', required: true, _id: '2' }, { name: 'Email', required: true, _id: '4' }, { name: 'Comments', required: false, _id: '3' }]
      this.acquireInfo = aqD
    }
    this.commentFieldView = !!this.acquireInfo.find((r: AcquireInfo) => r.name == 'Comments')
    this.commentRequired = !!this.acquireInfo.find((r: AcquireInfo) => r.name == 'Comments' && r.required)
    if (!this.commentRequired && !this.socketService.checkSocket()) {
      await this.createUserWithComment('')
    } else if (this.commentRequired) {
      this.dataRequired = true;
    }
  }

  private checkUserType() {
    this.user = this.tokenStorage.getUser();
    let currentUserType = this.cookieDateService.getCookie(this.tokenStorage.getBusinessID()!);
    if(currentUserType === '' || currentUserType === undefined){
      currentUserType = 'GENERIC';
      this.sessionResponse = new SessionResponse;
      this.sessionResponse.userType = currentUserType;
    } else{
      this.sessionResponse = JSON.parse(this.cookieDateService.getCookie(this.tokenStorage.getBusinessID()!));
    }
    if (this.user && this.user.userType == 'STORE_REGISTERED') {
      setTimeout(() => {
        this.isLoggedUser = !!this.user;
        this.cdr.detectChanges()
      });
      if (this.chatUser && this.user) {
        this.chatUser.firstName = this.user?.firstName;
        this.chatUser.lastName = this.user?.lastName;
        this.chatUser.profilePhoto = this.user?.profile;
        this.chatUser.phone = this.user?.phone;
        this.chatUser.email = this.user?.email;
      }
      this.userType = 'customer'
      if (this.chatUser) this.chatUser.userId = this.user.id;
      this.startChatConversation = true;
      this.commRequiredForLoggedInUser = !!this.acquireInfo.find((r: AcquireInfo) => r.name == 'Comments')
    } else if (this.sessionResponse?.userType == 'GENERIC' || this.sessionResponse?.userType == 'GUEST') {
      this.dataRequired = true;
      this.startChatConversation = false;
      this.userType = 'guest'
      this.isLoggedUser = !!this.user;
    } else if (this.sessionResponse?.userType == 'FAZEAL_REGISTERED') {
      setTimeout(() => {
        this.isLoggedUser = !!this.user;
        this.cdr.detectChanges()
      });

      if (this.chatUser && this.user) {
        this.chatUser.firstName = this.user?.firstName;
        this.chatUser.lastName = this.user?.lastName;
        this.chatUser.profilePhoto = this.user?.profile;
        this.chatUser.phone = this.user?.phone;
        this.chatUser.email = this.user?.email;
      }
      if (this.user?.isSubscribed) {
        this.userType = 'customer'
        if (this.chatUser) this.chatUser.userId = this.user.id;
      } else {
        this.userType = 'guest'
      }
      this.startChatConversation = true;
      this.commRequiredForLoggedInUser = !!this.acquireInfo.find((r: AcquireInfo) => r.name == 'Comments')
    }
    this.questionSelected = false
  }

  loginLogoutDetector() {
    this.logoutObservable = this.authService.getLoginStatusSubject().subscribe(u => {
      if (!!u) {
        this.formInitializing = true;
        setTimeout(() => {
          this.formInitializing = false;
        }, 3000);
        setTimeout(() => {
          this.user = u;
          this.checkUserType()
          this.isLoggedUser = true;
          setTimeout(async () => {
            this.resetChatState();
            this.tokenStorage.saveChatUser(null)
            let commRequiredForLoggedInUser = !!this.acquireInfo.find((r: AcquireInfo) => r.name == 'Comments');
            this.commentRequired = !!this.acquireInfo.find((r: AcquireInfo) => r.name == 'Comments' && r.required)
            this.commRequiredForLoggedInUser = commRequiredForLoggedInUser;
            if (!this.commentRequired && !this.socketService.checkSocket()) {
              await this.createUserWithComment('');
            }
          });
        });
      } else {
        setTimeout(async () => {
          this.startChatConversation = false;
          this.resetChatState()
        });
      }
    })
  }

  private resetChatState() {
    this.questionSelected = false;
    this.startChatConversation = false;
    this.chatIconColor = "#000000";
    this.sessionResponse = null!;
    this.dataRequired = false;
    this.user = null;
    this.comment = '';
    this.userType = 'guest';
    this.chatUser = null;
    this.employeeInfo = null;
    this.linkingToEmployeeInProgress = false;
    this.tryWithOtherQuestion = false;
    this.tryAgain = false;
    this.commentRequired = false;
    this.commentFieldView = false;
    this.isLoggedUser = false;
    this.queueInFront = 0;
    this.disableSendButton = false;
    this.chats = [];
    this.commRequiredForLoggedInUser = false;
    this.socketService.offAllListeners();
    this.initializeUser();
  }

  async selectQuestion(questionSelected: any) {
    let ids: number[] = [];
    if (questionSelected) {
      const primaryUserId = questionSelected.primaryUserInfo?.id;
      if (primaryUserId) ids.push(primaryUserId);
      const secondaryUserId = questionSelected.secondaryUserInfo?.id;
      if (secondaryUserId) ids.push(secondaryUserId);
      const defaultEmpId = questionSelected.defaultUserInfo?.id;
      if (defaultEmpId) ids.push(defaultEmpId);
    }
    this.linkingToEmployeeInProgress = true;
    this.timerOut = false;
    setTimeout(() => {
      this.timerOut = true;
    }, 4000);
    let r: any
    try {
      if (!this.socketService.checkSocket()) {
        await this.socketService.socketConnect(this.chatUser);
      }
      setTimeout(async () => {
        r = await firstValueFrom(from(this.socketService.emitCheckEmployees(this.user.id, ids, this.chatUser)));
        this.linkingToEmployeeInProgress = false;
        if (r && r.employeeInfo) {
          this.employeeInfo = r.employeeInfo;
          this.queueInFront = r.sortNum - 1
          if (this.employeeInfo) this.tokenStorage.saveEmpInfo(this.employeeInfo);
          this.updateShareService.shareRoomName(this.employeeInfo?.roomName)
          this.startChatConversation = true;
          this.dataRequired = false;
          this.questionSelected = true;
          this.onNewMessage()
          this.onDeleteMessage();
          this.onUpdateMessage();
          this.onEndChat();
          this.onTyping();
          this.onUpdateEmployee();
          this.OnChatMessageReaction();
          if (!!questionSelected || questionSelected.length == 0) {
            this.sendMessage({ text: 'Issue related to: ' + questionSelected.question })
          }
          if (!!this.comment) {
            this.sendMessage({ text: this.comment })
          }
        }
      }, 500);
    } catch (error) {
      this.linkingToEmployeeInProgress = false;
    }

    if (!r) {
      if (this.questions?.length > 1) {
        this.tryWithOtherQuestion = true;
        this.tryAgain = false;
      }
      else {
        this.tryWithOtherQuestion = false;
        this.tryAgain = true;
      }
    }
  }

  OnChatMessageReaction() {
    this.socketService.OnChatMessageReaction().subscribe({
      next: (r: any) => {
        let message = this.chats?.find(c => c._id === r.messageId)
        if (message)
          message.messageLike = r?.messageLike;
      }
    })
  }

  onUpdateEmployee() {
    this.socketService.onUpdateEmployee().subscribe({
      next: (r: any) => {
        this.typingData = r;
        const oldEmployeeInfo = this.employeeInfo;
        this.employeeInfo = r.employee;
        if (this.employeeInfo) this.employeeInfo.roomName = r.roomName;
        if (oldEmployeeInfo && this.employeeInfo && oldEmployeeInfo.userId !== this.employeeInfo.userId) {
          this.chats.forEach(chat => {
            if (this.employeeInfo) {
              chat.senderName = `${oldEmployeeInfo.firstName} ${oldEmployeeInfo.lastName}`;
              chat.profilePhoto = oldEmployeeInfo.profilePhoto || '';
            }
          });
        }
        this.redirected = true;
      }
    });
  }

  onTyping() {
    this.socketService.onTypingChat().subscribe({
      next: r => {
        this.typingData = r;
      }
    })
  }

  async startChatting(event: any) {
    this.user = { firstName: event.firstName, lastName: event.lastName, email: event.email, phone: event.phone, comment: event.comment, type: this.userType }
    this.isLoggedUser = true;
    this.startChatConversation = event.start;
    const cr = await firstValueFrom(this.chatRestApiService.createCustomerChatUser(
      Number(this.tokenStorage.getBusinessID()),
      event.firstName, event.lastName, this.userType,
      event.email, event.phone, event.comment, null, null
    ));

    if (cr.errors) {
      return;
    }
    this.showQuestionsAfterUserCreated(cr);
  }

  async createUserWithComment(event: any) {
    this.comment = event;
    if (!this.user) {
      return;
    }
    const cr = await firstValueFrom(this.chatRestApiService
      .createCustomerChatUser(Number(this.tokenStorage.getBusinessID()),
        this.user.firstName, this.user.lastName, this.userType,
        this.user.email, this.user.phone, this.comment, this.userType === ('customer' || "STORE_REGISTERED") ? this.user.id : null, this.user.profilePicture))
    this.isLoggedUser = true;
    if (cr.errors) {
      return;
    }
    this.showQuestionsAfterUserCreated(cr);
  }

  private showQuestionsAfterUserCreated(cr: any) {
    this.chatUser = cr.data;
    if (this.chatUser) this.chatUser.userType = this.userType;
    this.socketService.socketConnect(this.chatUser);
    this.tokenStorage.saveChatUser(this.chatUser);
    if (!this.questions || this.questions.length === 0) {
      this.selectQuestion(null);
    } else {
      this.chatSharedInfoService.setChatUserCreated(this.chatUser);
    }
  }

  sendMessage(event: any) {
    const receiverId = this.employeeInfo?.userId;
    const messageData = {
      senderName: `${this.user.firstName} ${this.user.lastName}`,
      profilePhoto: this.user.profile || '',
      roomName: this.employeeInfo?.roomName || this.employeeInfo?.roomName,
      message: {
        senderId: this.chatUser?.userId,
        senderType: this.chatUser?.userType,
        receiverId: receiverId,
        receiverType: 'employee',
        text: event.text,
        localPaths: event.localPaths,
        repliedMessageId: event.repliedMessageId === undefined ? null : event.repliedMessageId
      }
    };
    this.socketService.emitNewMessage(messageData);
    this.disableSendButton = false;
  }

  scrollToBottom(): void {
    try {
      setTimeout(() => {
        if (this.chatContainer)
          this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      }, 200);
    } catch (err) {
      console.error('Scroll to bottom failed:', err);
    }
  }

}
