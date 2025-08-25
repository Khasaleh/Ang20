import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyAccountService {
  public myaccount$ = new Subject<string>();

  getOrderStatusList(): Observable<any[]> {
    return of([]);
  }

  getOrderList(filter: any): Observable<any> {
    return of({ items: [], total_count: 0 });
  }

  reorder(data: any): Observable<any> {
    return of({ quote_id: '1' });
  }

  get_store_information(): Observable<any> {
    return of({});
  }

  getCustomerInfo(): Observable<any> {
    return of({});
  }
}
