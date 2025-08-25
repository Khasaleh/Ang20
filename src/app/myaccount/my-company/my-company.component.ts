import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-company',
  template: '<p>my-company works!</p>',
  standalone: true,
  imports: [CommonModule],
})
export class MyCompanyComponent {}
