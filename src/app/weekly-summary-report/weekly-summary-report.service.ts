import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from '../modules/shared/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class WeeklySummaryReportService {

  constructor(private commonhttp: CommonService) { }

  getReports(url:any){
    return this.commonhttp.get(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      'reports',
      `drilldown/weeklyReport?${url}`,
      {}
    )
  }
  updateReports(request:any){
    return this.commonhttp.post(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      'reports',
      `drilldown/saveWeeklyReport`,
      request
    )
  }
  
}
