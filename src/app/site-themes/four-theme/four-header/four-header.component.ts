import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-four-header',
  template: '<p>four-header works!</p>',
  standalone: true,
  imports: [CommonModule],
})
export class FourHeaderComponent {
  @Input() footObject: any;
  @Input() socialLinks: any;
  @Input() announcementBar: any;
  @Input() activeTheme: any;
  @Input() categories: any;
}
