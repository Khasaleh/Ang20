import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  public notify = new BehaviorSubject<any>('');
  private countSource = new BehaviorSubject<number>(0);
  count$ = this.countSource.asObservable();
  private hasIncremented = false;
  private data = new BehaviorSubject<Boolean>(false);
  public notifyProduct = new BehaviorSubject<any>('');
  public notifyRemoveItems = new BehaviorSubject<any>('');

  notifyProductObservable$ = this.notifyProduct.asObservable();
  notifyObservable$ = this.notify.asObservable();
  notifyRemoveItemsObservable$ = this.notifyRemoveItems.asObservable();

  public notifyOther(data: any) {
    if (data) {
        this.notify.next(data);
    }
  }

  public notifyProductId(productId: any) {
    if (productId) {
        this.notifyProduct.next(productId);
    }
  }

  public notifyRemoveItem(itemId: any) {
    if (itemId) {
        this.notifyRemoveItems.next(itemId);
    }
  }

  setReflectCartItems(data: boolean) {
    this.data.next(data);
  }

  getReflectCartItems() {
    return this.data.asObservable();
  }

  changeCount(change: number) {
    if (!this.hasIncremented) {
      const newCount = this.countSource.value + change;
      this.countSource.next(newCount);
      this.hasIncremented = true;
    }
  }

  reset() {
    this.countSource.next(0);
    this.hasIncremented = false;
  }
}
