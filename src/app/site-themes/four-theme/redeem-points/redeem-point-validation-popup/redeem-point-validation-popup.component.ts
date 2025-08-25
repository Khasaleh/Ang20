import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  selector: 'app-redeem-point-validation-popup',
  templateUrl: './redeem-point-validation-popup.component.html',
  styleUrls: ['./redeem-point-validation-popup.component.css']
})
export class RedeemPointValidationPopupComponent implements OnInit {


  mobileOtpCode: string[] = ['', '', '', '', '', ''];


  constructor() { }

  ngOnInit() {
  }

  onMobileOtpCodeChange(event: any, index: number) {
    if (event.target instanceof HTMLInputElement) {
      if (event.target.value.length < 2) {
        this.mobileOtpCode[index - 1] = event.target.value;
      }
    }
  }

}
