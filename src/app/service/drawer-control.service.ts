import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerControlService {
 // For mat-drawer
 private openDrawerSource = new Subject<void>();
 openDrawer$ = this.openDrawerSource.asObservable();

 // For mat-menu (dropdown)
 private openDropdownSource = new Subject<void>();
 openDropdown$ = this.openDropdownSource.asObservable();

 triggerOpenDrawer() {
   this.openDrawerSource.next();
 }

 triggerOpenDropdown() {
   this.openDropdownSource.next();
 }


constructor() { }

}
