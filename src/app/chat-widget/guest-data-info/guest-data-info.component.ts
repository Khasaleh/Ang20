import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { User } from 'src/app/models/user';
import { AcquireInfo } from 'src/app/service/chatServices/rest-api/chat-rest-api.service';

@Component({
  selector: 'app-guest-data-info',
  templateUrl: './guest-data-info.component.html',
  styleUrls: ['./guest-data-info.component.css']
})
export class GuestDataInfoComponent implements OnInit {
  @Output() startChattingEmiter = new EventEmitter<{ start: boolean, firstName: string, lastName: string, email: string, phone: string, comment: string }>();
  @Input() dataRequired: boolean = false;
  @Input() user!: User;
  email: string = '';
  phone: string = '';
  lastName: string = '';
  firstName: string = '';
  comment: string = '';
  @Input() fieldsConfig: AcquireInfo[] = [];
  guestForm!: FormGroup;
  formControlNames: any[] = [];
  matcher = new CustomErrorStateMatcher();
  dataFilled: boolean = false;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.dataFilled = !!this.user;
    this.createFormGroup();
  }

  createFormGroup() {
    const formControlConfig: { [key: string]: any } = {};
    this.fieldsConfig.forEach(field => {
      const formControlName = field.name.split(' ').map((part, index) => {
        if (index === 0) {
          return part.toLowerCase();
        } else {
          return part;
        }
      }).join('');
      this.formControlNames.push([formControlName, field.required])
    })
    this.formControlNames.forEach(field => {
      formControlConfig[field[0]] = [
        '', field[0] == 'email' ? [field[1] ? Validators.required : null, Validators.email] : field[1] ? Validators.required : null
      ];
    });
    this.guestForm = this.fb.group(formControlConfig);
  }

  onSubmit() {
    if (this.guestForm.valid) {
      this.startChattingEmiter.emit({
        start: true,
        firstName: this.guestForm.get('firstName')?.value || '',
        lastName: this.guestForm.get('lastName')?.value || '',
        email: this.guestForm.get('email')?.value || '',
        phone: this.guestForm.get('phoneNumber')?.value || '',
        comment: this.guestForm.get('comments')?.value || ''
      });
      this.dataFilled = true;
    }
  }

  getFormControlName(fieldName: string): string {
    return fieldName.split(' ').map((part, index) => {
      if (index === 0) {
        return part.toLowerCase();
      } else {
        return part;
      }
    }).join('');
  }
}

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
