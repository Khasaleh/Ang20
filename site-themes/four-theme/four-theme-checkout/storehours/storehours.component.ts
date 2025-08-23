import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-storehours',
  templateUrl: './storehours.component.html',
  styleUrls: ['./storehours.component.css']
})
export class StorehoursComponent implements OnInit {
  businessHours: any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any ) { }

  ngOnInit() {
    this.businessHours = this.data;
  }

  getFormattedTime(hours: string, minutes: string, amPm: string): string {
    const hour = parseInt(hours, 10);
    const minute = parseInt(minutes, 10);
    const formattedMinute = minute < 10 ? `0${minute}` : minute;
    return `${hour}:${formattedMinute} ${amPm}`;
  }

}
