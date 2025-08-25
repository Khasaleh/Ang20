import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import * as _ from 'lodash';
import { ChatMessage } from 'src/app/service/chatServices/rest-api/chat-rest-api.service';
import { ChatEmployeeInfoAfterConnect } from 'src/app/service/chatServices/socket/socket.service';
import { UpdateShareService } from 'src/app/service/chatServices/updateShare/update-share.service';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AttachementPreviewComponent } from '../attachment-preview/attachement-preview/attachement-preview.component';
import { TextShowMoreLessComponent } from '../text-show-more-less/text-show-more-less.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-otheruser-message',
  templateUrl: './otheruser-message.component.html',
  styleUrls: ['./otheruser-message.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatMenuModule,
    MatIconModule,
    AttachementPreviewComponent,
    TextShowMoreLessComponent,
  ],
})
export class OtheruserMessageComponent implements OnInit {
  awsUrl = environment.awsKey;
  @Input() employee!: ChatEmployeeInfoAfterConnect | null
  @Input() messageData!: ChatMessage
  @Output() messageReactionEmitter = new EventEmitter<{ messageId: string, reactionType: string }>();
  @ViewChild(MatMenuTrigger) replyOtherMessageMenu!: MatMenuTrigger;

  constructor(
    private updateShareService: UpdateShareService,
  ) { }

  ngOnInit() {
    if (!!this.messageData.repliedMessage) {
      this.messageData.repliedMessage.replyOn = true;
    }
  }

  replyToMessage() {
    let messageToReply: ChatMessage = _.cloneDeep(this.messageData)
    messageToReply.replyOn = true;
    this.updateShareService.shareReplyMessage(messageToReply)
    this.replyOtherMessageMenu.closeMenu();
  }

  reactOnMessage(reaction: string) {
    this.messageReactionEmitter.emit({ messageId: (this.messageData._id || this.messageData.id) + '', reactionType: reaction })
  }

}
