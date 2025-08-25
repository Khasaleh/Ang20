import { A11yModule } from '@angular/cdk/a11y';\nimport { CdkStepperModule } from '@angular/cdk/stepper';\nimport { CdkTableModule } from '@angular/cdk/table';\nimport { CdkTreeModule } from '@angular/cdk/tree';\nimport { ClipboardModule } from '@angular/cdk/clipboard';\nimport { CommonModule } from '@angular/common';\nimport { DragDropModule } from '@angular/cdk/drag-drop';\nimport { FormsModule } from '@angular/forms';\nimport { MatButtonToggleModule } from '@angular/material/button-toggle';\nimport { MatCardModule } from '@angular/material/card';\nimport { MatCheckboxModule } from '@angular/material/checkbox';\nimport { MatChipsModule } from '@angular/material/chips';\nimport { MatDatepickerModule } from '@angular/material/datepicker';\nimport { MatDialogModule } from '@angular/material/dialog';\nimport { MatExpansionModule } from '@angular/material/expansion';\nimport { MatFormFieldModule } from '@angular/material/form-field';\nimport { MatGridListModule } from '@angular/material/grid-list';\nimport { MatIconModule } from '@angular/material/icon';\nimport { MatInputModule } from '@angular/material/input';\nimport { MatListModule } from '@angular/material/list';\nimport { MatMenuModule } from '@angular/material/menu';\nimport { MatNativeDateModule } from '@angular/material/core';\nimport { MatPaginatorModule } from '@angular/material/paginator';\nimport { MatProgressBarModule } from '@angular/material/progress-bar';\nimport { MatProgressSpinnerModule } from '@angular/material/progress-spinner';\nimport { MatRadioModule } from '@angular/material/radio';\nimport { MatSelectModule } from '@angular/material/select';\nimport { MatSidenavModule } from '@angular/material/sidenav';\nimport { MatSlideToggleModule } from '@angular/material/slide-toggle';\nimport { MatSliderModule } from '@angular/material/slider';\nimport { MatSnackBarModule } from '@angular/material/snack-bar';\nimport { MatSortModule } from '@angular/material/sort';\nimport { MatStepperModule } from '@angular/material/stepper';\nimport { MatTableModule } from '@angular/material/table';\nimport { MatTabsModule } from '@angular/material/tabs';\nimport { MatToolbarModule } from '@angular/material/toolbar';\nimport { MatTooltipModule } from '@angular/material/tooltip';\nimport { OverlayModule } from '@angular/cdk/overlay';\nimport { PortalModule } from '@angular/cdk/portal';\nimport { ReactiveFormsModule } from '@angular/forms';\nimport { RouterModule } from '@angular/router';\nimport { ScrollingModule } from '@angular/cdk/scrolling';\nimport { TranslateModule } from '@ngx-translate/core';\nimport { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ChatDirection } from 'src/app/service/chatServices/backend-queries/chat-backend-queries.service';
import { ChatSharedInfoService } from 'src/app/service/chatServices/chat-shared-info/chat-shared-info.service';
import { ChatUserResponse } from 'src/app/service/chatServices/rest-api/chat-rest-api.service';

\1
  standalone: true,
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
