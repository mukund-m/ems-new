import { Injectable } from '@angular/core';
import { RestService } from 'app/components/shared';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable()
export class SmsService {

  constructor(private restService: RestService) { }

  public sendSms(messge: string,  number: number, callback) {
    this.restService.postData('notification', {'message': messge, number: number}, ()=> {
      callback();
    })
  }
}
