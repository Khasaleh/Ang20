import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const GRAPHQL_BASE_URL = environment.baseCustomerGraphQlURL;

const httpOptions = {
  headers: new HttpHeaders({ 'content-type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getAllOrderedProductsByBusinessAndCustomer(businessId : number) : Observable<any>{
      let form: FormData = new FormData();
      const query = `query {
        getAllOrderedProductsByBusinessAndCustomer(businessId : ${businessId}){
            productId
            productName,
            price,
            status
            imageUrl
        }
      }`
      form.append('query', query);
      return this.http.post(GRAPHQL_BASE_URL, form);
  }
}
