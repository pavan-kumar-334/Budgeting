import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from './modules/shared/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectPricingService {

  constructor(private commonhttp:CommonService) { }
  addProjectPriceType(data: any): Observable<any> {
    return this.commonhttp.post(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      '',
      `projectPricing/createProjectPricing`,
      data
    )
  }
  getprojectPricingDetailsById(projectId:string):Observable<any>{
    return this.commonhttp.get(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      'projectPricing',
      `${projectId}`,
      {}
    )
  }
  addProjectPriceTypeTandM(data: any): Observable<any> {
    return this.commonhttp.post(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      '',
      `tandm/createTANDM`,
      data
    )
  }
  getprojectPricingDetailsTandMById(projectId:string):Observable<any>{
    return this.commonhttp.get(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      'tandm',
      `${projectId}`,
      {}
    )
  }
  deleteProjectPricingType(projectId: string,projectType:any): Observable<any> {
    return this.commonhttp.delete(
      environment.apiUrl + ':MICROSERVICE/v1/:CHILD/',
      '',
      'project/delProjPricing',
      `${projectId}/${projectType}`,
      {}
    )
  }
}
