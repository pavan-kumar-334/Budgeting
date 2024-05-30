import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from './modules/shared/services/common.service';

@Injectable({
  providedIn: 'root'
})

export class RosterService {

  constructor(private commonhttp: CommonService) { }
  addRosterData(data: any): Observable<any> {
    return this.commonhttp.post(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      '',
      `roster`,
      data
    )

  }


  findbyResourceIDsandstartDate(url: any, startDate: any,searchStartDate:any,searchEndDate:any ): Observable<any> {
   
      if((searchStartDate != "" && searchEndDate !="" && startDate == "") ||((searchStartDate != "" || searchEndDate !="" && startDate == "") && startDate == "" )){
        return this.commonhttp.get(
          environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
          '',
          '',
          `roster/findbyResources?resourceIds=${url}&searchEndDate=${searchStartDate}&searchStartDate=${searchEndDate}`,
          {}
        )
      }else{
      if (startDate != null) {
        return this.commonhttp.get(
          environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
          '',
          '',
          `roster/findbyResources?resourceIds=${url}&startDate=${startDate}`,
          {}
        )

      } else {
        return this.commonhttp.get(
          environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
          '',
          '',
          `roster/findbyResources?resourceIds=${url}`,
          {},
        )

      //}
    }}
  }
  findbyResourceIDsandstartDates(url: any, startDate: any): Observable<any> {
    return this.commonhttp.get(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      '',
      `roster/findbyResources?resourceIds=${url}&startDate=${startDate}`,
      {},
    )
  }
  getRoasterDetails(id: any): Observable<any> {
    return this.commonhttp.get(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      'roster',
      `id=${id}`,
      {},
    )
  }
  deleteRoaster(id: any): Observable<any> {
    return this.commonhttp.delete(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      'roster',
      `id=${id}`,
      {},
    )
  }
  getProjectbasedOnResource(resourceId: any): Observable<any> {
    return this.commonhttp.get(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      '',
      `project/getProjectsBasedOnResource/${resourceId}`,
      {},
    )
  }

}

