import { Injectable }               from '@angular/core';
import { HttpClient, HttpHeaders }  from '@angular/common/http';
import * as firebase                from 'firebase/app';
import { Observable }               from 'rxjs/Observable';

@Injectable()
export class RestService {

  private static REST_URL = 'https://us-central1-user-management-da33b.cloudfunctions.net/bananabox';
  headers: any;
  test: string;

  constructor(private http: HttpClient) {
    if (firebase.auth() == null || firebase.auth().currentUser == null) {
      return;
    }
    this.test='abv';
    firebase.auth().currentUser.getIdToken()
      .then(authToken => {
        this.headers = new HttpHeaders({'Authorization': 'Bearer ' + authToken})
      })
  }

  postData(url, request, callback) {
    this.http.post(RestService.REST_URL + '/'+url, request, { headers: this.headers }).subscribe( (data: any) => {
      console.log(data);
      callback(data);
    })
  }

  getData(url, callback) {
    this.http.get(RestService.REST_URL + '/'+url, { headers: this.headers }).subscribe( (data) => {
      callback(data);
    })
  }

  delete(url, callback) {
    this.http.delete(RestService.REST_URL + '/'+url, { headers: this.headers }).subscribe( (data) => {
      callback(data);
    })
  }
  
  
}
