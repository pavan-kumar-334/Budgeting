import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ProfitCenterService } from '../profit-center.service';
import { ContibutionReportService } from './contribution-report-service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-contribution-report',
  templateUrl: './contribution-report.component.html',
  styleUrls: ['./contribution-report.component.scss']
})


export class ContributionReportComponent implements OnInit {


  list: any;
  url: string = '';
  firstdate: string = '';
  lastdate: string = '';
  drilldownUrl: string = '';
  pageEvent!: PageEvent;
  profitcenterlist: any;
  browserRefresh: any;
  filterSearchCheching :boolean=false;
  autoData: any; 
  
  superForms: FormGroup = this.fb.group({
    profitCentre: ['All Profit Centers', Validators.required],
    startDate: [, Validators.required],
    endDate: [, Validators.required],
  });

  data: any = {  }
    
reportData : any =  [ ]
columnNames: any  = [] ;
totalMonths:any = {
  'JAN':1,
  'FEB':2,
  'MAR':3,
  'APR':4,
  'MAY':5,
  'JUN':6,
  'JUL':7,
  'AUG':8,
  'SEP':9,
  'OCT':10,
  'NOV':11,
  'DEC':12,
}

dataSource = this.reportData;
  constructor(
    private fb: FormBuilder,
    private contibutionReportService: ContibutionReportService,
    private profitcenter: ProfitCenterService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


   ngOnInit(): void {
    this.getprofitcenterdropdown()
    this.superForms.get('profitCentre')?.valueChanges.subscribe(x1 => {
      this.autoData = this.profitcenterlist.filter((option1: any) => { return option1.name.toLowerCase().includes(x1.toLowerCase()) });     
    })    
   }

buildDataObj(data:any){
  this.columnNames = [];
  this.reportData = [];

    this.columnNames = Object.keys(data['contributeDTOMap'])
    this.columnNames.unshift( 'projectName')
    this.columnNames.unshift( 'sId')

    var tempRevenueData:any = [];
    var tempCostData:any = [];
    var GT:any = {'sId':'GM','className':'total-bold'};
    var contributionNetMargin: any = {'sId': 'Net Margin (Contribution)','className':'total-bold'};
    var resourceCostAdjust: any = {'sId':'Resource Cost Adjust','className':'pl-25'};
    var companyOverhead: any = {'sId':'Company Overhead','className':'pl-25'};
    var training: any = {'sId':'Training','className':'pl-25'};
    var expenses: any = {'sId':'Expenses','className':'pl-25'};

    Object.entries(data['contributeDTOMap']).forEach((entry) => {
      let value:any = entry[1];
      let key:string = entry[0];
      value['revenueDTOList'].forEach((res:any, i:any)=>{

        let getMonth = this.totalMonths[key.split('-')[0]];
         let getYear = 2000+Number(key.split('-')[1]);
         let firstDay = new Date(getYear,getMonth-1, 1).toLocaleDateString();
         this.firstdate=firstDay;
         let lastDay = new Date(getYear, getMonth, 0).toLocaleDateString();
         this.lastdate=lastDay;

       
        let obj:any = {};
        if(i===0){
          obj['sId']='Revenue'
          obj['className']='title-bold'
        }
        obj['projectName'] = res['projectName']
        obj[key] = res['total']
      
        obj[key+'drilldownValue']="/ProfitCentreActivitySummaryReport?"+this.drilldownUrl+"&monthStartDate="+this.firstdate+"&monthEndDate="+this.lastdate+"&projectType="+encodeURIComponent(res['projectName']);
        tempRevenueData.push(obj);
      })
      var obj:any = {'sId': 'Total', 'className':'total-bold pl-25'}
      obj[key]= value['revenueTotal']
      tempRevenueData.push(obj)

    

      value['costDTOList'].forEach((res:any, i:any)=>{
        let getMonth = this.totalMonths[key.split('-')[0]];
        
         let getYear = 2000+Number(key.split('-')[1]);
         let firstDay = new Date(getYear,getMonth-1, 1).toLocaleDateString();
         let lastDay = new Date(getYear, getMonth, 0).toLocaleDateString();
        let obj:any = {};
        if(i===0){
          obj['sId']='Cost'
          obj['className']='title-bold'
        }
        obj['projectName'] = res['projectName']
        obj[key] = res['total']
        obj[key+'drilldownValue']="/ProfitCentreActivitySummaryReport?"+this.drilldownUrl+"&monthStartDate="+firstDay+"&monthEndDate="+lastDay+"&projectType="+encodeURIComponent(res['projectName']);
        tempCostData.push(obj)       
      })
     
      var obj:any = {'sId': 'Total','className':'total-bold pl-25'}
      obj[key]= value['costTotal']
      tempCostData.push(obj)

       GT[key] = value['grandTotal']
       resourceCostAdjust[key] = value['contributionOverheadsDTO']['resourceCostAdjust']
       companyOverhead[key] = value['contributionCostGroupDescDTO'] ? value['contributionCostGroupDescDTO']['companyOverhead'] : 0
       training[key] = value['training']
       expenses[key] = value['expenses']
       contributionNetMargin[key] = value['contributionNetMargin'] 
    });

   this.reportData.push(...this.getMergedDataObj(tempRevenueData))
   this.reportData.push(...this.getMergedDataObj(tempCostData))
   this.reportData.push(GT)
   this.reportData.push({'sId':'Overheads','className':'title-bold'})
   this.reportData.push(resourceCostAdjust)
   this.reportData.push({'sId':'Cost Group Description','className':'title-bold'})
   this.reportData.push(companyOverhead)
   this.reportData.push(training)
   this.reportData.push(expenses)
   this.reportData.push(contributionNetMargin)   

}

  getMergedDataObj(tempDataObj:any){
    
    var output:any=[];
    const out = tempDataObj.reduce((a:any, v:any) => {
      tempDataObj.forEach(function(item:any) {
       var existing = output.filter(function(v:any, i:any) {
         return v.projectName == item.projectName;
       });
       if (existing.length) {
         var existingIndex = output.indexOf(existing[0]);
         Object.assign(output[existingIndex], item);
       } else {
         if (typeof item.value == 'string')
           item.value = [item.value];
         output.push(item);
       }
     });
    }, {})
     return output

  }
 
  filterSearchforReports() {
    const formData = JSON.parse(JSON.stringify(this.superForms.getRawValue()));
    let startDate = new Date(this.superForms.value.startDate);
    let endDate = new Date(this.superForms.value.endDate);
    let framedStartDate: any =
      startDate.getMonth() +
      1 +
      '/' +
      startDate.getDate() +
      '/' +
      startDate.getFullYear();
    let framedEndDate: any =
      endDate.getMonth() +
      1 +
      '/' +
      endDate.getDate() +
      '/' +
      endDate.getFullYear();
    formData['profitCentre'] = formData['profitCentre'];

    this.superForms.value.profitCentre;
    this.drilldownUrl =
      'profitCentre=' +
      formData.profitCentre +
      '&startDate=' +
      framedStartDate +
      '&endDate=' +
      framedEndDate;
      if(formData.profitCentre !== '' &&  framedStartDate !== '' && framedEndDate !== ''){
        const extras: NavigationExtras = {
          relativeTo: this.route,
          queryParams: { profitCentre: formData.profitCentre,startDate:framedStartDate,endDate:framedEndDate},
          queryParamsHandling: 'merge'
        };
        this.router.navigate([], extras).then(() => { });
      }
   
    this.contibutionReportService.getContributionReport(this.drilldownUrl).subscribe((data) => {
      if (data) {
        this.buildDataObj(data)
      }
     
    });
  }
 
  getprofitcenterdropdown() {
    let url = "paged=true";
    this.profitcenter.getProfitCenterlist(url).subscribe((data) => {
      this.profitcenterlist = data.content;
      let allData = {name:'All Profit Centers'};
      this.profitcenterlist.push(allData);
      this.route.queryParams
      .subscribe(params => {
        if(Object.keys(params).length > 0){
        this.superForms.get('profitCentre')?.setValue(params['profitCentre'])
        this.superForms.get('startDate')?.setValue(new Date(params['startDate']),{ onlyself: true })
        this.superForms.get('endDate')?.setValue(new Date(params['endDate']),{ onlyself: true })
        if(params['profitCentre'] !== '' &&  params['startDate'] !== '' && params['endDate'] !== ''){
          this.filterSearchforReports();
        }
      }
      }
    );
    })

  }

  formatDate1(e: any) {
    if (e.target.value == null || typeof (e.target.value) == undefined || e.target.value == '') {
      return;
    }
    var d = new Date(e.target.value)

    var convertDate1 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes() - d.getTimezoneOffset()).toISOString();

    this.superForms.get('salaryEndDate')?.setValue(convertDate1, { onlyself: true });

  }

  formatDate(e: any) {
    if (e.target.value == null || typeof (e.target.value) == undefined || e.target.value == '') {
      return;
    }
    var d = new Date(e.target.value)
    var convertDate = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes() - d.getTimezoneOffset()).toISOString();
    this.superForms.get('salaryStartDate')?.setValue(convertDate, { onlyself: true });

  }

  capitalize(s: string): string {
     s=s.replace("-", " ")
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  
  gettype(value: any){
    return typeof(value);
  }
}


