import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quote-items',
  template: '<p>quote-items works!</p>',
  standalone: true,
  imports: [CommonModule],
})
export class QuoteItemsComponent {
  @Input() quoteData: any;
}
