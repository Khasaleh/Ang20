import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { MainAttributeDto } from 'src/app/models/MainAttributeDto';
import { OrderResponse } from 'src/app/models/OrderResponse';
import { ProductVarientDTO } from 'src/app/models/ProductVarientDTO';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private data = new BehaviorSubject<User>(new User());
  private orderData = new BehaviorSubject<OrderResponse>(new OrderResponse());
  private setUserCookie = new BehaviorSubject<boolean>(false);
  private mainsku = new BehaviorSubject<MainAttributeDto>(new MainAttributeDto());
  private sku = new BehaviorSubject<ProductVarientDTO>(new ProductVarientDTO());
  private _refreshShoppingCart = new Subject<void>();
  refreshShoppingCart$ = this._refreshShoppingCart.asObservable();

constructor() { }

private reloadCheckout$ = new BehaviorSubject<boolean>(false);

notifyRefreshShoppingCart() {
  this._refreshShoppingCart.next();
}

  triggerReload() {
    this.reloadCheckout$.next(true);
  }

  getReloadObservable() {
    return this.reloadCheckout$;
  }

setUserData(data: User) {
  this.data.next(data);
}

getUserData() {
  return this.data.asObservable();
}

setOrderData(data: OrderResponse) {
  this.orderData.next(data);
}

getOrderData() {
  return this.orderData.asObservable();
}

clearData() {
  return this.data.next(new User());
}

setCookiesUserData() {
  this.setUserCookie.next(true);
}

getCookiesUserData() {
  return this.setUserCookie.asObservable();
}

setMainSku(mainSku: MainAttributeDto) {
  this.mainsku.next(mainSku);
}

getMainSku() {
  return this.mainsku.asObservable();
}

setSku(sku: ProductVarientDTO) {
  this.sku.next(sku);
}

getSku() {
  return this.sku.asObservable();
}

}
