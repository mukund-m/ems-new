import { Injectable } from '@angular/core';
import {Angular5Csv} from 'angular5-csv/Angular5-csv'
@Injectable()
export class ExportService {

  constructor() { }

  public export(data: any, fileName: string) {
    new Angular5Csv(data, fileName+'-insta-report');
  }
}
