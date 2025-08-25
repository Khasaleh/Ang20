import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ChatDirection } from 'src/app/service/chatServices/backend-queries/chat-backend-queries.service';
import { ChatSharedInfoService } from 'src/app/service/chatServices/chat-shared-info/chat-shared-info.service';
import { ChatUserResponse } from 'src/app/service/chatServices/rest-api/chat-rest-api.service';

@Component({
  selector: 'app-message-recommendations',
  templateUrl: './message-recommendations.component.html',
  styleUrls: ['./message-recommendations.component.css']
})
export class MessageRecommendationsComponent implements OnInit {
  @Input() user: any
  @Input() linkingToEmployeeInProgress: boolean = false;
  @Input() questions: ChatDirection[] = [];
  @Input() commentRequired = false;
  @Output() questionSelected = new EventEmitter<ChatDirection>();
  @Output() comment = new EventEmitter<string>();
  commentText: string = '';
  @ViewChild('commentInput') commentInput: any;
  commentSent: boolean = false;
  chatUser!: ChatUserResponse | null;

  constructor(
    private chatSharedInfoService: ChatSharedInfoService,
  ) { }

  ngOnInit() {
    this.commentSent = false;
    this.subscribeToCommentSubjectOnCreateUserTime();
  }

  private subscribeToCommentSubjectOnCreateUserTime() {
    this.chatSharedInfoService.getChatUserCreated().subscribe({
      next: (u: ChatUserResponse | null) => {
        this.commentSent = true;
        this.chatUser = u;
      }
    });
  }

  selectQuestion(question: ChatDirection) {
    this.questionSelected.emit(question)
  }

  sendComment(commentText: string) {
    this.comment.emit(commentText);
    this.commentText = '';
    this.commentRequired = false;
    if (this.commentInput) this.commentInput.nativeElement.value = '';
  }

}
