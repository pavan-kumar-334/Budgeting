import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ProfitCenterService } from '../profit-center.service';
import { WeeklySummaryReportService } from './weekly-summary-report.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { DateFilterFn } from '@angular/material/datepicker';
import { LoaderService } from '../modules/_helpers/loader.service';
import * as moment from 'moment';

@Component({
  selector: 'app-weekly-summary-report',
  templateUrl: './weekly-summary-report.component.html',
  styleUrls: ['./weekly-summary-report.component.scss'],
})
export class WeeklySummaryReportComponent implements OnInit {
  list: any;
  //url: string = '';
  drilldownUrl: string = '';
  //pageEvent!: PageEvent;
  profitcenterlist: any;
  projectsList: any;
  sortDirection: string = 'desc';
  sortColumn: string = 'auditSection.createdDate';
  //: any;
  //filterSearchCheching: boolean = false;
  autoData: any;
  projectData: any;
  weekendDate: any;
  resData:any;  

  superForms: FormGroup = this.fb.group({
    profitCentre: ['All Profit Centers', Validators.required],
    project: ['All Projects', Validators.required],
    startDate: [],
  });
  reportData: any = [];
  displayedColumns: string[] = [
    'resourceName',
    'projectName',
    'weekFrom',
    'weekTo',
    'expectedBillableHrs',
    'actualBilledHrs',
    'sellRate',
    'expectedRevenue',
    'actualRevenue',
    'difference',
    'comments',
  ];

  //dataSource = this.reportData;
  constructor(
    private fb: FormBuilder,
    private weeklySummaryReportService: WeeklySummaryReportService,
    private profitcenter: ProfitCenterService,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.getprofitcenterdropdown();
    this.getProject();   
    
    this.superForms.get('profitCentre')?.valueChanges.subscribe((x1) => {
      this.autoData = this.profitcenterlist.filter((option1: any) => {
        return option1.name.toLowerCase().includes(x1.toLowerCase());
      });
    });
    this.superForms.get('project')?.valueChanges.subscribe((x1) => {      
      this.projectData = this.projectsList.filter((option1: any) => {
        return option1.name.toLowerCase().includes(x1.toLowerCase());
      });
    });
  }
  dateFilter = (d: Date | null) => {
    if (d != null) {
      if (d.getDay() == 1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  getProject() {
    this.loader.setLoading(true);
    let url = 'paged=false';
    this.projectService.getProjectlist(url).subscribe(
      (res) => {
        this.projectsList = res.content;
        let allData = {name:'All Projects'};
        this.projectsList.push(allData);
        this.loader.setLoading(false);
      },
      (error) => {
        this.loader.setLoading(false);
        console.log('error getting Project List', error);
      }
    );
  }
  buildDataObj(data: any) {
    let totalResources = data.resources;
    if (totalResources.length > 0) {
      let totalObj = {
        resourceName: 'Total',
        projectName: '',
        weekFrom: '',
        weekTo: '',
        expectedBillableHrs: this.resData.totalExpectedBillableHrs,
        actualBilledHrs: this.resData.totalActualBillableHrs,
        sellRate: this.resData.totalSellRate,
        expectedRevenue: this.resData.totalExpectedRevenue,
        actualRevenue: this.resData.totalActualRevenue,
        difference: this.resData.totalDifference,
        comments: '',
        isTotal: true,
      };
      totalResources.push(totalObj);
    }
    this.reportData = totalResources;
    this.loader.setLoading(false);
  }

  filterSearchforReports() {
    if (this.superForms.invalid) {
      return;
    }
    const formData = JSON.parse(JSON.stringify(this.superForms.getRawValue()));
   
    let startDate: any;
    let endDate: any;
    let framedStartDate: any;
    let framedEndDate: any;
    if (this.superForms.value.startDate) {
      startDate = new Date(this.superForms.value.startDate);
      endDate = this.weekendDate;
    } else {
      startDate = this.getMondayDate();
      endDate = this.weekendDate;
    }
    
    var month = (startDate.getMonth() +1) >= 10 ? (startDate.getMonth() +1) : '0'+(startDate.getMonth()+1);
    var date  = (startDate.getDate() >= 10 ? startDate.getDate() : '0'+startDate.getDate());

    framedStartDate = month + '/' + date + '/' + startDate.getFullYear();

    month = (endDate.getMonth() +1) >= 10 ? (endDate.getMonth() +1) : '0'+(endDate.getMonth() + 1);
    date  = (endDate.getDate() >= 10 ? endDate.getDate() : '0'+endDate.getDate());

    framedEndDate = month + '/' + date + '/' + endDate.getFullYear();

    formData['profitCentre'] = formData['profitCentre'];

    this.superForms.value.profitCentre;
    this.drilldownUrl =
      'profitCentre=' +
      formData.profitCentre +
      '&project=' +
      formData.project +
      '&startDate=' +
      framedStartDate +
      '&endDate=' +
      framedEndDate + "&sortBy=" + this.sortColumn + "&sortDirection=" + this.sortDirection;
    

    this.weeklySummaryReportService.getReports(this.drilldownUrl).subscribe((data) => {
      if (data) {
        this.resData = data;
        this.buildDataObj(data.finalMap);
      }
    },(err)=>{
      this.loader.setLoading(false);
      console.log("error in report",err)
    });
  }

  getprofitcenterdropdown() {
    this.loader.setLoading(true);
    let url = 'paged=false';
    this.profitcenter.getProfitCenterlist(url).subscribe((data) => {
      this.loader.setLoading(false);
      this.profitcenterlist = data.content; 
      let allData = {name:'All Profit Centers'};
      this.profitcenterlist.push(allData);    
    },(err) => {
      this.loader.setLoading(false);
      console.log("error in getting profit center", err)
    });
  }

  formatDate(e: any) {
    if (
      e.target.value == null ||
      typeof e.target.value == undefined ||
      e.target.value == ''
    ) {
      return;
    }
    
    var d = new Date(e.target.value);
    //console.log(e.target.value, d)
    
    var convertDate = new Date(new Date(e.target.value).getTime()).toJSON();
    //new Date(new Date(e.target.value).getTime()).toJSON()
    //moment(new Date(e.target.value)).format('MM/DD/yyyy')
    // new Date(
    //   d.getFullYear(),
    //   d.getMonth(),
    //   d.getDate(),
    //   d.getHours(),
    //   d.getMinutes()-d.getTimezoneOffset()
    // ).toISOString();
    //console.log(convertDate);
   
    this.superForms.get('startDate')?.setValue(convertDate, { onlyself: true });
    this.getSundayDate(convertDate);
  }
  getSundayDate(dateValue: any) {
    let endDate = new Date(
      new Date(dateValue).setDate(new Date(dateValue).getDate() + 6)
    );
    //let convertEndDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), endDate.getHours(), endDate.getMinutes() - endDate.getTimezoneOffset()).toISOString();
    this.weekendDate = endDate;
   
  }
  getMondayDate() {
    var date = new Date();
    var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    let weekStartDate = new Date(date.setDate(diff));
    //let convertDate = new Date(weekStartDate.getFullYear(), weekStartDate.getMonth(), weekStartDate.getDate(), weekStartDate.getHours(), weekStartDate.getMinutes() - weekStartDate.getTimezoneOffset()).toISOString();

    this.getSundayDate(weekStartDate);

    return weekStartDate;
  }
  
  updateReport(event: any, type: string, resource: any, index:number) {
    this.loader.setLoading(true);    
    let value = event.target.value;
    if (type == 'billedHrs') {
      this.resData.finalMap.resources[index]['actualBilledHrs'] = value
      resource.actualBilledHrs = value;
    } else if (type == 'comments') {
      this.resData.finalMap.resources[index]['comments'] = value;
    }
    this.resData.finalMap.resources.pop();
    this.weeklySummaryReportService.updateReports(this.resData.finalMap.resources).subscribe((res)=>{
      if(res){
        this.resData =res;
        this.buildDataObj(res.finalMap);
      }

      this.loader.setLoading(false);   
    },(err)=>{
      this.loader.setLoading(false);   
      console.log("error in updating the data",err)
    })
    
  }
  sortData(event: any): void {
    this.sortColumn = event.active;
    this.sortDirection = event.direction;
    this.filterSearchforReports();
    
  }
}
