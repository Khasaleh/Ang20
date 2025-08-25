import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  getCartItems(): Observable<any> {
    return of({});
  }

  getQuoteItems(): Observable<any> {
    return of({});
  }
}
