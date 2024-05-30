
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../company.service';
import { DeletepopupConfirmComponent } from '../deletepopup-confirm/deletepopup-confirm.component';
import { browserRefresh } from '../app.component';
import { ProfitCenterService } from '../profit-center.service';
import { ResourceRelatedActivityService } from '../resource-related-activity.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profit-center-activity-summary-report',
  templateUrl: './profit-center-activity-summary-report.component.html',
  styleUrls: ['./profit-center-activity-summary-report.component.scss']
})
export class ProfitCenterActivitySummaryReportComponent implements OnInit {

  GaData = [];
  textClear: boolean = false;
  displayedColumns: string[] = [
    'resourcename',
    'projectname',
    'month',
    'days',
    'sellrate',
    'costrate',
    'revenue',
    'cost',
    'contribution',
    'ohadjustment',
  ];
  displayedColumns1: string[] = [
    
    'projectname',
    'type',
    'resourcename',
    'days',
    'sellrate',
    'costrate',
    'revenue',
    'cost',
    'contribution',
   
  ];
 
  displayedColumns2: string[] = [
    
    'projectname',
    'type',
    'resourcename',
    'days',
    'sellrate',
    'costrate',
    'revenue',
    'cost',
    'contribution',
   
  ];

  displayedColumns3: string[] = [
    
    'projectname',
    'type',
    'resourcename',
    'days',
    'sellrate',
    'costrate',
    'revenue',
    'cost',
    'contribution',
   
  ];
  companiesData: MatTableDataSource<any> = new MatTableDataSource<any>();
  list: any;
  companydata: any;
  pageSizeOptions: number[] = [2, 10, 25];
  totalResult = 0;
  url: string = '';
  pageIndex = 0;
  pageSize = 10;
  sortDirection: string = 'desc';
  sortColumn: string = 'auditSection.createdDate';
  pageEvent!: PageEvent;
  countrieslist: any;
  groupslist: any;
  browserRefresh: any;
  profitcenterlist: any;
  filterSearchCheching :boolean=false;
  autoData: any;
  autoData1:any;
  tandmData:any = [];
  fpData:any = [];
  msData:any = [];
  softwareData:any = [];
  projectType: string = '';
  superForms: FormGroup = this.fb.group({

    profitCentre: ['All Profit Centers', Validators.required],
    startDate: [, Validators.required],
    endDate: [, Validators.required],
    
  });

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private toasterService: ToastrService,
    private dialog: MatDialog,
    private profitcenter: ProfitCenterService,
    private resourceRelatedActivityService: ResourceRelatedActivityService,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {

    this.getprofitcenterdropdown();

    this.superForms.get('profitCentre')?.valueChanges.subscribe(x => {
      this.autoData = this.profitcenterlist.filter((option: any) => { return option.name.toLowerCase().includes(x.toLowerCase()) });
    })

    this.browserRefresh = browserRefresh;
  }
  
  filterSearchforReports(){
    const formData = JSON.parse(JSON.stringify(this.superForms.getRawValue()));
    let startDate = new Date(this.superForms.value.startDate);
    let endDate = new Date(this.superForms.value.endDate);
    let framedStartDate: any;
    let framedEndDate: any;

    var month = (startDate.getMonth() +1) >= 10 ? (startDate.getMonth() +1) : '0'+(startDate.getMonth()+1);
    var date = (startDate.getDate() >= 10 ? startDate.getDate() : '0'+startDate.getDate());

    framedStartDate = month + '/' + date + '/' + startDate.getFullYear();

    month = (endDate.getMonth() +1) >= 10 ? (endDate.getMonth() +1) : '0'+(endDate.getMonth() + 1);
    date = (endDate.getDate() >= 10 ? endDate.getDate() : '0'+endDate.getDate());

    framedEndDate = month + '/' + date + '/' + endDate.getFullYear();

    let totalCompanies1 = this.profitcenterlist.filter( 
      (o: any) => o.name == formData['profitCentre']
    );
    formData['profitCentre'] = totalCompanies1[0]['name'];
    let url =
      'profitCentre=' +
      formData.profitCentre +
      '&startDate=' +
      framedStartDate +
      '&endDate=' +
      framedEndDate + "&sortBy=" + this.sortColumn + "&sortDirection=" + this.sortDirection;
      if(this.projectType === '' || this.projectType === 'T&M'){
        this.getprofitcenterdTMReport(url);
      }
      
      if(this.projectType === '' || this.projectType === 'FP'){
        this.getprofitcenterdFPReport(url,"FP");
      }
      if(this.projectType === '' || this.projectType === 'MS'){
        this.getprofitcenterdFPReport(url,"MS");
      }
      if(this.projectType === '' || this.projectType === 'SOFTWARE'){
        this.getprofitcenterdFPReport(url,"SOFTWARE");
      }
  }
  ExportdataforReports(){
    var exportData: any = [];
    if(this.tandmData.length > 0){
      this.tandmData.map((value:any)=>{
        exportData.push(value)
      })
    }
    if(this.fpData.length > 0){
      this.fpData.map((value:any)=>{
        exportData.push(value)
      })
    }
    if(this.msData.length > 0){
      this.msData.map((value:any)=>{
        exportData.push(value)
      })
    }
    if(this.softwareData.length > 0){
      this.softwareData.map((value:any)=>{
        exportData.push(value)
      })
    }

    this.downloadFile(exportData);

  }

  getprofitcenterdTMReport(url:any){
    this.resourceRelatedActivityService
      .getProfitCenterReport(url,"")
      .subscribe((data) => {
        let resources:any[] = Object.keys(data.finalMap);
        let tandmDataForLogic = [];
        let totalData:any = data;
        let finalMapData:any = data.finalMap;
        for (let k = 0; k < resources.length; k++) {
          if(finalMapData[resources[k]]['resources']){
            finalMapData[resources[k]]['resources'].map((data:any)=>{
              tandmDataForLogic.push(data);
            });
          }
          let subObj:any = {};
          //alert(resources[k]);
          subObj['resourceName'] = resources[k]+" Total";
          subObj['sellRate'] = finalMapData[resources[k]]['sellRateTotal'];
          subObj['costRate'] = finalMapData[resources[k]]['costRateTotal'];
          subObj['revenue'] = finalMapData[resources[k]]['revenueTotal'];
          subObj['cost'] = finalMapData[resources[k]]['costTotal'];
          subObj['contribution'] = finalMapData[resources[k]]['contributionTotal'];
          subObj['ohAdjustment'] = finalMapData[resources[k]]['adjustmentTotal'];
          subObj['activeClass'] = true;
          tandmDataForLogic.push(subObj);
          if(k == resources.length-1){
            let totalObj:any = {};
            totalObj['resourceName'] = "Grand Total";
            totalObj['sellRate'] = totalData['totalSellRate'];
            totalObj['costRate'] = totalData['totalCostRate'];
            totalObj['revenue'] = totalData['totalRevenue'];
            totalObj['cost'] = totalData['totalCost'];
            totalObj['contribution'] = totalData['totalContribution'];
            totalObj['ohAdjustment'] = totalData['totalAdjustment'];
            totalObj['activeTotalClass'] = true;
            tandmDataForLogic.push(totalObj);
          }
        }
        this.tandmData = tandmDataForLogic;
      });
  }
 
  getprofitcenterdFPReport(url:any, type:any){
    url = url+'&projectType='+type;
    this.resourceRelatedActivityService
    .getProfitCenterReport(url,type)
    .subscribe((data) => {
      let resources:any[] = Object.keys(data.finalMap);
      let fpForLogic = [];
      let totalData:any = data;
      let finalMapData:any = data.finalMap;
      for (let p = 0; p < resources.length; p++) {
        if(finalMapData[resources[p]]['resources']){
          finalMapData[resources[p]]['resources'].map((data:any)=>{
            fpForLogic.push(data);
          });
        }
        let subObj:any = {};
        //alert(resources[k]);
        subObj['projectName'] = resources[p]+" Total";
        subObj['revenue'] = finalMapData[resources[p]]['revenueTotal'];
        subObj['cost'] = finalMapData[resources[p]]['costTotal'];        
        subObj['contribution'] = finalMapData[resources[p]]['contributionTotal'];
        
        subObj['activeClass'] = true;
        fpForLogic.push(subObj);

        if(p == resources.length-1){
          let totalObj:any = {};          
          totalObj['projectName'] = "Grand Total";          
          totalObj['revenue'] = totalData['totalRevenue'];
          totalObj['cost'] = totalData['totalCost'];
          totalObj['contribution'] = totalData['totalContribution'];          
          totalObj['activeTotalClass'] = true;
          fpForLogic.push(totalObj);
        }

      }
      if(type == 'FP'){
        this.fpData = fpForLogic;
      } 
      if(type == 'MS'){
        this.msData = fpForLogic;
      }
      if(type == 'SOFTWARE'){
        this.softwareData = fpForLogic;
        
      }
    })
  }
  // for exporting as csv file 
  downloadFile(data: any) {

    const replacer = (key:any, value:any) => (value === null ? '' : value); // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    const csv = data.map((row:any) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(',')
    );
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');
  
    const a = document.createElement('a');
    const blob = new Blob([csvArray], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
  
    a.href = url;
    a.download = 'myFile.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

 

  clearByclick() {

    let sdata = document.querySelector('[id="searchid"]') as HTMLInputElement;
    sdata.value = '';



  }
  formatDate1(e: any) {
    if (e.target.value == null || typeof (e.target.value) == undefined || e.target.value == '') {
      return;
    }
    var d = new Date(e.target.value)

    var convertDate1 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes() - d.getTimezoneOffset()).toISOString();

    this.superForms.get('salaryEndDate')?.setValue(convertDate1, { onlyself: true });

  }

  formatDate2(e: any) {
    if (e.target.value == null || typeof (e.target.value) == undefined || e.target.value == '') {
      return;
    }
    var d = new Date(e.target.value)

    var convertDate2 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes() - d.getTimezoneOffset()).toISOString();

    this.superForms.get('secondSalaryStartDate')?.setValue(convertDate2, { onlyself: true });

  }

  formatDate(e: any) {
    if (e.target.value == null || typeof (e.target.value) == undefined || e.target.value == '') {
      return;
    }
    var d = new Date(e.target.value)
    var convertDate = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes() - d.getTimezoneOffset()).toISOString();
    this.superForms.get('salaryStartDate')?.setValue(convertDate, { onlyself: true });

  }

  

  getprofitcenterdropdown() {
    let url = "paged=true";
    this.profitcenter.getProfitCenterlist(url).subscribe((data) => {
      //console.log("profitcenter..."+data)
      this.profitcenterlist = data.content;
      let allData = {name: "All Profit Centers"};
      this.profitcenterlist.push(allData)
      this.route.queryParams
      .subscribe(params => {
        if(Object.keys(params).length > 0){
          this.superForms.get('profitCentre')?.setValue(params['profitCentre'])
          this.superForms.get('startDate')?.setValue(new Date(params['monthStartDate']),{ onlyself: true })
          this.superForms.get('endDate')?.setValue(new Date(params['monthEndDate']),{ onlyself: true })
          this.projectType = params['projectType']
          if(params['profitCentre'] !== '' &&  params['monthStartDate'] !== '' && params['monthEndDate'] !== ''){
            this.filterSearchforReports();
          }
        }
      }
    );
    })

  }
  sortData(event: any): void {
    this.sortColumn = event.active;
    this.sortDirection = event.direction;
      this.filterSearchforReports();
    
  }
  


}
