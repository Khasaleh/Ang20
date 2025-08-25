import { Component, Input, OnInit } from '@angular/core';
import { ChatMessage } from 'src/app/service/chatServices/rest-api/chat-rest-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-attachement-preview',
  templateUrl: './attachement-preview.component.html',
  styleUrls: ['./attachement-preview.component.css']
})
export class AttachementPreviewComponent implements OnInit {
  @Input() attachment!: ChatMessage;
  awsUrl = environment.awsKey;
  fileType: string = '';

  ngOnInit(): void { }

  onRemove() {
    if (this.attachment.localPaths && this.attachment.localPaths.length > 0) {
      this.attachment.deletedLocalPath = this.attachment.localPaths[0].localPath;
      this.fileType = this.attachment.localPaths[0].type;
      this.attachment.localPaths.pop();
    }
  }
}
