import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class OtpEmailMobileService {

  private BASE_URL = environment.baseURL;
  constructor(private http: HttpClient) { }

  generateEmailVerificationOTP(email: any): Observable<any> {
    let form: FormData = new FormData();
    const query = `
    mutation{
        generateEmailVerificationOTP(email: "${email}")
    }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  generateStoreEmailVerificationCode(email: any, businessId: number): Observable<any> {
    let form: FormData = new FormData();
    const query = `mutation{
    generateStoreEmailVerificationCode(email: "${email}", businessId: ${businessId}){
        message
    }
    }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  generateVerificationOTP(phoneNumber: number, channel: string): Observable<any> {
    let form: FormData = new FormData();
    const query = `
    mutation{
        generateVerificationOTP(phoneNumber: "+${phoneNumber}", channel: "${channel}")
    }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  verifyEmail(email: string, verificationCode: string): Observable<any> {
    let form: FormData = new FormData();
    const query = `
    mutation{
        verifyEmail(email: "${email}", verificationCode: "${verificationCode}"){
            status
        }
     }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  verifyStoreEmail(email: string, verificationCode: string, businessId: number): Observable<any> {
    let form: FormData = new FormData();
    const query = `mutation{
    verifyStoreEmail(email: "${email}", verificationCode: "${verificationCode}",businessId: ${businessId}){
        status
    }
}`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  verifyOTP(phoneNumber: number, verificationCode: string): Observable<any> {
    let form: FormData = new FormData();
    const query = `
    mutation{
      verifyOTP(phoneNumber: "+${phoneNumber}",verificationCode: "${verificationCode}"){
            status
        }
     }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }
}
