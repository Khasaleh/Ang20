import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit } from '@angular/core';
import { BusinessSettingService } from 'src/app/service/business-setting.service';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { Address } from 'src/app/models/address';
import { AddressService } from 'src/app/service/Address.service'; 
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StoreLocationModalComponent } from '../../store-location-modal/store-location-modal.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  selector: 'app-view-store-location',
  templateUrl: './view-store-location.component.html',
  styleUrls: ['./view-store-location.component.css']
})
export class ViewStoreLocationComponent implements OnInit {


  businessHours: any[] = [];
  businessAddresses: Address[] = [];
   businessID = Number(this.tokenStorage.getBusinessID());


  constructor(public dialog: MatDialog, private translate: TranslateService, private businessSettings: BusinessSettingService,private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.listBusinessAddresses();
  }


   listBusinessAddresses(){
    this.businessSettings.getBusinessAddressesByBusinessId(Number(this.tokenStorage.getBusinessID()))
    .subscribe(data => {
      if(data?.data?.getBusinessAddressesByBusinessId){
        this.businessAddresses = data?.data?.getBusinessAddressesByBusinessId;
        this.businessAddresses = this.businessAddresses?.filter(address => address?.addressType == 'STORE');
 
      }
    });
   }


   storelocationmodal(address: Address){
       const dialogConfig = new MatDialogConfig();
       dialogConfig.panelClass = 'store_location_modal';
       dialogConfig.data = address;
       this.dialog.open(StoreLocationModalComponent, dialogConfig);
    }


      getOpenCloseMessage(): string {
    const daysOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const todayIndex = new Date().getDay();

    // Check if today is open directly
    const todayInfo = this.businessHours?.find(day => day?.days === daysOfWeek[todayIndex]);

    if (todayInfo?.isOpen === 'YES') {
      if (todayInfo?.allDay) {
        return `<p class='font-weight-500 text-black m-0'> ${this.translate.instant('TODAY')} <span class="text-success-lighter font-weight-600">${this.translate.instant('OPEN')}</span> ${this.translate.instant('FULLHOURS')} </p>`;
      } else {
        const currentTime = new Date();
        const closingTime = this.getTimeFromHours(
          todayInfo?.endingHours,
          todayInfo?.endingMinute,
          todayInfo?.amORPmEndingHours
        );

        if (currentTime < closingTime) {
          return `<p class='font-weight-500 text-black m-0'>Today <span class="text-success-lighter font-weight-600">Open</span> until ${todayInfo?.endingHours}:${todayInfo?.endingMinute} ${todayInfo?.amORPmEndingHours}</p>`;
        } else {
          // Find the next open day information starting from the day after today
          const nextOpenDayInfo = this.findNextOpenDayInfo(todayIndex + 1);
          if (nextOpenDayInfo.dayInfo) {
            return `<p class='font-weight-500 text-black m-0'> ${this.translate.instant('TODAY')} <span class="text-danger font-weight-600">  ${this.translate.instant('CLOSED')} </span>,  ${this.translate.instant('SIGNUP_NEXTBTN')}  <span class="text-success"> ${this.translate.instant('OPEN')} </span> ${nextOpenDayInfo.daysUntilOpen} ${this.translate.instant('FROM')}  ${this.formatHours(nextOpenDayInfo.dayInfo)}</p>`;
          } else {
            return `<p class='font-weight-500 text-black m-0'><span class="text-danger font-weight-600"> ${this.translate.instant('CLOSED')} </span> ${this.translate.instant('FOR_THE_WEEK')} </p>`;
          }
        }
      }
    }

    // If today is not open, check the next days
    for (let i = 1; i < daysOfWeek.length; i++) {
      const index = (todayIndex + i) % 7;
      const dayInfo = this.businessHours?.find(day => day?.days === daysOfWeek[index]);

      if (dayInfo?.isOpen === 'YES') {
        const daysUntilOpen = i === 1 ? 'Tomorrow' : daysOfWeek[index];
        if (dayInfo?.allDay) {
          return `<p class='font-weight-500 text-black m-0'>${daysUntilOpen} <span class="text-success-lighter font-weight-600">${this.translate.instant('OPEN')}</span>  ${this.translate.instant('FULLHOURS')} </p>`;
        } else {
          return `<p class='font-weight-500 text-black m-0'>${daysUntilOpen} <span class="text-success-lighter font-weight-600">${this.translate.instant('OPEN')}</span> from ${this.formatHours(dayInfo)}</p>`;
        }
      }
    }

    return `<p class='font-weight-500 text-black m-0'>
  <span class="text-danger font-weight-600">${this.translate.instant('CLOSED')}</span>
  ${this.translate.instant('FOR_THE_WEEK')}
</p>`;


  }


findNextOpenDayInfo(startIndex: number): { daysUntilOpen: string, dayInfo: any } {
    for (let i = 0; i < 7; i++) {
      const nextIndex = (startIndex + i) % 7;
      const nextDayInfo = this.businessHours?.find(day => day.days === ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'][nextIndex]);
      if (nextDayInfo && nextDayInfo.isOpen === 'YES') {
        const daysUntilOpen = i === 0 ? 'Tomorrow' : nextDayInfo.days;
        return { daysUntilOpen, dayInfo: nextDayInfo };
      }
    }
    return { daysUntilOpen: 'later this week', dayInfo: null };
  }


   getTimeFromHours(hours: string, minutes: string, period: string): Date {
    const time = new Date();
    const hours24 = period === 'PM' && +hours !== 12 ? +hours + 12 : +hours;
    time.setHours(hours24);
    time.setMinutes(+minutes);
    time.setSeconds(0);
    return time;
  }


  formatHours(dayInfo: any): string {
    return `${dayInfo?.startingHours}:${dayInfo?.startingMinute} ${dayInfo?.amORPmStartingHours} - ${dayInfo?.endingHours}:${dayInfo?.endingMinute} ${dayInfo?.amORPmEndingHours}`;
  }





}
