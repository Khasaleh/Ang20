import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-items',
  template: '<p>cart-items works!</p>',
  standalone: true,
  imports: [CommonModule],
})
export class CartItemsComponent {
  @Input() cartData: any;
}
