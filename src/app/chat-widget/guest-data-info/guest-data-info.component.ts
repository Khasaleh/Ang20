<<<<<<< HEAD
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
=======
import { A11yModule } from '@angular/cdk/a11y';\nimport { CdkStepperModule } from '@angular/cdk/stepper';\nimport { CdkTableModule } from '@angular/cdk/table';\nimport { CdkTreeModule } from '@angular/cdk/tree';\nimport { ClipboardModule } from '@angular/cdk/clipboard';\nimport { CommonModule } from '@angular/common';\nimport { DragDropModule } from '@angular/cdk/drag-drop';\nimport { MatButtonToggleModule } from '@angular/material/button-toggle';\nimport { MatCardModule } from '@angular/material/card';\nimport { MatCheckboxModule } from '@angular/material/checkbox';\nimport { MatChipsModule } from '@angular/material/chips';\nimport { MatDatepickerModule } from '@angular/material/datepicker';\nimport { MatDialogModule } from '@angular/material/dialog';\nimport { MatExpansionModule } from '@angular/material/expansion';\nimport { MatFormFieldModule } from '@angular/material/form-field';\nimport { MatGridListModule } from '@angular/material/grid-list';\nimport { MatIconModule } from '@angular/material/icon';\nimport { MatInputModule } from '@angular/material/input';\nimport { MatListModule } from '@angular/material/list';\nimport { MatMenuModule } from '@angular/material/menu';\nimport { MatPaginatorModule } from '@angular/material/paginator';\nimport { MatProgressBarModule } from '@angular/material/progress-bar';\nimport { MatProgressSpinnerModule } from '@angular/material/progress-spinner';\nimport { MatRadioModule } from '@angular/material/radio';\nimport { MatSelectModule } from '@angular/material/select';\nimport { MatSidenavModule } from '@angular/material/sidenav';\nimport { MatSlideToggleModule } from '@angular/material/slide-toggle';\nimport { MatSliderModule } from '@angular/material/slider';\nimport { MatSnackBarModule } from '@angular/material/snack-bar';\nimport { MatSortModule } from '@angular/material/sort';\nimport { MatStepperModule } from '@angular/material/stepper';\nimport { MatTableModule } from '@angular/material/table';\nimport { MatTabsModule } from '@angular/material/tabs';\nimport { MatToolbarModule } from '@angular/material/toolbar';\nimport { MatTooltipModule } from '@angular/material/tooltip';\nimport { OverlayModule } from '@angular/cdk/overlay';\nimport { PortalModule } from '@angular/cdk/portal';\nimport { RouterModule } from '@angular/router';\nimport { ScrollingModule } from '@angular/cdk/scrolling';\nimport { TranslateModule } from '@ngx-translate/core';\nimport { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
>>>>>>> main
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { User } from 'src/app/models/user';
import { AcquireInfo } from 'src/app/service/chatServices/rest-api/chat-rest-api.service';

<<<<<<< HEAD
@Component({
=======
\1
  standalone: true,
>>>>>>> main
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
