import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from '../modules/shared/services/common.service';

@Injectable({
  providedIn: 'root'
})

export class ContibutionReportService {

    constructor(private commonhttp: CommonService) { } 

    getContributionReport(url:any): Observable<any> {
        return this.commonhttp.get(
          environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
          '',
          'reports',
          `contributionreport?${url}`,
          {}
        )
      }
}