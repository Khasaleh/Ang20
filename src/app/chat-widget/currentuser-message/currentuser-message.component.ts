<<<<<<< HEAD
import { Component, Input, OnInit, ViewChild } from '@angular/core';
=======
import { A11yModule } from '@angular/cdk/a11y';\nimport { CdkStepperModule } from '@angular/cdk/stepper';\nimport { CdkTableModule } from '@angular/cdk/table';\nimport { CdkTreeModule } from '@angular/cdk/tree';\nimport { ClipboardModule } from '@angular/cdk/clipboard';\nimport { CommonModule } from '@angular/common';\nimport { DragDropModule } from '@angular/cdk/drag-drop';\nimport { FormsModule } from '@angular/forms';\nimport { MatButtonToggleModule } from '@angular/material/button-toggle';\nimport { MatCardModule } from '@angular/material/card';\nimport { MatCheckboxModule } from '@angular/material/checkbox';\nimport { MatChipsModule } from '@angular/material/chips';\nimport { MatDatepickerModule } from '@angular/material/datepicker';\nimport { MatDialogModule } from '@angular/material/dialog';\nimport { MatExpansionModule } from '@angular/material/expansion';\nimport { MatFormFieldModule } from '@angular/material/form-field';\nimport { MatGridListModule } from '@angular/material/grid-list';\nimport { MatIconModule } from '@angular/material/icon';\nimport { MatInputModule } from '@angular/material/input';\nimport { MatListModule } from '@angular/material/list';\nimport { MatNativeDateModule } from '@angular/material/core';\nimport { MatPaginatorModule } from '@angular/material/paginator';\nimport { MatProgressBarModule } from '@angular/material/progress-bar';\nimport { MatProgressSpinnerModule } from '@angular/material/progress-spinner';\nimport { MatRadioModule } from '@angular/material/radio';\nimport { MatSelectModule } from '@angular/material/select';\nimport { MatSidenavModule } from '@angular/material/sidenav';\nimport { MatSlideToggleModule } from '@angular/material/slide-toggle';\nimport { MatSliderModule } from '@angular/material/slider';\nimport { MatSnackBarModule } from '@angular/material/snack-bar';\nimport { MatSortModule } from '@angular/material/sort';\nimport { MatStepperModule } from '@angular/material/stepper';\nimport { MatTableModule } from '@angular/material/table';\nimport { MatTabsModule } from '@angular/material/tabs';\nimport { MatToolbarModule } from '@angular/material/toolbar';\nimport { MatTooltipModule } from '@angular/material/tooltip';\nimport { OverlayModule } from '@angular/cdk/overlay';\nimport { PortalModule } from '@angular/cdk/portal';\nimport { ReactiveFormsModule } from '@angular/forms';\nimport { RouterModule } from '@angular/router';\nimport { ScrollingModule } from '@angular/cdk/scrolling';\nimport { TranslateModule } from '@ngx-translate/core';\nimport { Component, Input, OnInit, ViewChild } from '@angular/core';
>>>>>>> main
import { MatMenuTrigger } from '@angular/material/menu';
import * as _ from 'lodash';
import { ChatMessage, ChatUserResponse } from 'src/app/service/chatServices/rest-api/chat-rest-api.service';
import { UpdateShareService } from 'src/app/service/chatServices/updateShare/update-share.service';
import { environment } from 'src/environments/environment';

<<<<<<< HEAD
@Component({
=======
\1
  standalone: true,
>>>>>>> main
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
