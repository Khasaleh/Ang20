import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatBackendQueriesService {

  private BASE_URL = environment.baseURL;
  constructor(private http: HttpClient) { }

  getListOfChatDirectionByBusinessId(businessId: number): Observable<any> {
    let form: FormData = new FormData();
    const query = `
    query{
      getListOfChatDirectionByBusinessId(businessId: ${businessId}) {
        id
        question
        status
        questionId
        businessId
        createdDate
        updatedDate
        primaryUserInfo {
            id
            firstName
            lastName
            profileImage
        }
        secondaryUserInfo {
            id
            firstName
            lastName
            profileImage
        }
        defaultUserInfo {
            id
            firstName
            lastName
            profileImage
        }
      }
    }`
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }
}


export interface UserInfo {
  id: number;
  firstName: string;
  lastName: string;
  profileImage: string;
}

export interface ChatDirection {
  id: number;
  question: string;
  status: string;
  questionId: number;
  businessId: number;
  createdDate: string;
  updatedDate: string;
  primaryUserInfo: UserInfo;
  secondaryUserInfo: UserInfo;
  defaultUserInfo: UserInfo;
}

