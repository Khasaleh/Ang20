import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Address } from 'src/app/models/address';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';

@Component({
  selector: 'app-store-location-modal',
  templateUrl: './store-location-modal.component.html',
  styleUrls: ['./store-location-modal.component.scss']
})
export class StoreLocationModalComponent implements OnInit {
  address!: Address;
  sanitizedUrl!: SafeResourceUrl;
  storeName = this.tokenStorage.getBStoreName();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private sanitizer: DomSanitizer, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.address = this.data;
    this.updateUrl();
  }

  updateUrl(): void {
    const baseUrl = `https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d0!2d${this.address.longitude}!3d${this.address.latitude}!3m2!1i1024!2i768!4f13.1`;
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(baseUrl);
  }
}
