import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-widget',
  template: '<p>chat-widget works!</p>',
  standalone: true,
  imports: [CommonModule],
})
export class ChatWidgetComponent {
  @Input() chatSettings: any;
}
