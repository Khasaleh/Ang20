<<<<<<< HEAD
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
=======
import { A11yModule } from '@angular/cdk/a11y';\nimport { CdkStepperModule } from '@angular/cdk/stepper';\nimport { CdkTableModule } from '@angular/cdk/table';\nimport { CdkTreeModule } from '@angular/cdk/tree';\nimport { ClipboardModule } from '@angular/cdk/clipboard';\nimport { CommonModule } from '@angular/common';\nimport { DragDropModule } from '@angular/cdk/drag-drop';\nimport { FormsModule } from '@angular/forms';\nimport { MatButtonToggleModule } from '@angular/material/button-toggle';\nimport { MatCardModule } from '@angular/material/card';\nimport { MatCheckboxModule } from '@angular/material/checkbox';\nimport { MatChipsModule } from '@angular/material/chips';\nimport { MatDatepickerModule } from '@angular/material/datepicker';\nimport { MatDialogModule } from '@angular/material/dialog';\nimport { MatExpansionModule } from '@angular/material/expansion';\nimport { MatFormFieldModule } from '@angular/material/form-field';\nimport { MatGridListModule } from '@angular/material/grid-list';\nimport { MatIconModule } from '@angular/material/icon';\nimport { MatInputModule } from '@angular/material/input';\nimport { MatListModule } from '@angular/material/list';\nimport { MatMenuModule } from '@angular/material/menu';\nimport { MatNativeDateModule } from '@angular/material/core';\nimport { MatPaginatorModule } from '@angular/material/paginator';\nimport { MatProgressBarModule } from '@angular/material/progress-bar';\nimport { MatProgressSpinnerModule } from '@angular/material/progress-spinner';\nimport { MatRadioModule } from '@angular/material/radio';\nimport { MatSelectModule } from '@angular/material/select';\nimport { MatSidenavModule } from '@angular/material/sidenav';\nimport { MatSlideToggleModule } from '@angular/material/slide-toggle';\nimport { MatSliderModule } from '@angular/material/slider';\nimport { MatSnackBarModule } from '@angular/material/snack-bar';\nimport { MatSortModule } from '@angular/material/sort';\nimport { MatStepperModule } from '@angular/material/stepper';\nimport { MatTableModule } from '@angular/material/table';\nimport { MatTabsModule } from '@angular/material/tabs';\nimport { MatToolbarModule } from '@angular/material/toolbar';\nimport { MatTooltipModule } from '@angular/material/tooltip';\nimport { OverlayModule } from '@angular/cdk/overlay';\nimport { PortalModule } from '@angular/cdk/portal';\nimport { ReactiveFormsModule } from '@angular/forms';\nimport { RouterModule } from '@angular/router';\nimport { ScrollingModule } from '@angular/cdk/scrolling';\nimport { TranslateModule } from '@ngx-translate/core';\nimport { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
>>>>>>> main
import { ChatMessage, ChatUserResponse } from 'src/app/service/chatServices/rest-api/chat-rest-api.service';
import { ChatEmployeeInfoAfterConnect, SocketService } from 'src/app/service/chatServices/socket/socket.service';
import { environment } from 'src/environments/environment';

<<<<<<< HEAD
@Component({
=======
\1
  standalone: true,
>>>>>>> main
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
