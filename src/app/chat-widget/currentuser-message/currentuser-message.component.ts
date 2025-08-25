import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import * as _ from 'lodash';
import { ChatMessage, ChatUserResponse } from 'src/app/service/chatServices/rest-api/chat-rest-api.service';
import { UpdateShareService } from 'src/app/service/chatServices/updateShare/update-share.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-currentuser-message',
  templateUrl: './currentuser-message.component.html',
  styleUrls: ['./currentuser-message.component.css']
})
export class CurrentuserMessageComponent implements OnInit {
  @Input() user!: ChatUserResponse | null
  @Input() messageData!: ChatMessage;
  awsUrl = environment.awsKey;
  isEditing: boolean = false;
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  constructor(
    private updateShareService: UpdateShareService,
  ) { }

  ngOnInit() {
    if (!!this.messageData.repliedMessage) {
      this.messageData.repliedMessage.replyOn = true;
    }
  }

  removeAttachment() {
    if (this.messageData && this.messageData.localPaths) {
      this.messageData.localPaths = [];
    }
  }

  replyToMessage() {
    let messageToReply: ChatMessage = _.cloneDeep(this.messageData)
    messageToReply.replyOn = true;
    this.updateShareService.shareReplyMessage(messageToReply)
    this.menuTrigger.closeMenu();
  }

}
