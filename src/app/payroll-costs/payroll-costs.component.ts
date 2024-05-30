import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { browserRefresh } from '../app.component';
import { ProfitCenterService } from '../profit-center.service';
import { ResourceRelatedActivityService } from '../resource-related-activity.service';

@Component({
  selector: 'app-payroll-costs',
  templateUrl: './payroll-costs.component.html',
  styleUrls: ['./payroll-costs.component.scss']
})
export class PayrollCostsComponent implements OnInit {

  GaData = [];
  profitCenterRelatedlist:any;
  textClear: boolean = false;
  displayedColumns: string[] = [
    'month',
'resourcename',
'resourcecostcentre',
'resourcetype',
'annualgrosssalary',
'profitcentrecurrency',
'annualbonus',
'profitcentrecurrency1',
'cost',
'profitcentrecurrency2',
'workingdays',
'workingdaysinmonth',
'effectivedailycostrate',
'profitcentrecurrency3',

  ];
 
  payrollData: MatTableDataSource<any> = new MatTableDataSource<any>();
  companydata: any;
  url: string = '';
  sortDirection: string = 'desc';
  sortColumn: string = 'auditSection.createdDate';
  browserRefresh: any;
  profitcenterlist: any;
  filterSearchCheching :boolean=false;
  autoData: any;
  autoData1:any;

  superForms: FormGroup = this.fb.group({

    profitCentre: ['All Profit Centers' ,Validators.required],
    startDate: [ ,Validators.required],
    endDate: [ ,Validators.required],
    //name: ['']
  });

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private profitcenter: ProfitCenterService,
    private resourceRelatedActivityService:ResourceRelatedActivityService

  ) { }

  ngOnInit(): void {
    
    this.getprofitcenterdropdown();
    
    this.superForms.get('profitCentre')?.valueChanges.subscribe(x => {
      this.autoData = this.profitcenterlist.filter((option: any) => { return option.name.toLowerCase().includes(x.toLowerCase()) });
      console.log('yyyyyyyy'+this.autoData);
    }) 

    this.browserRefresh = browserRefresh;
    //this.filterSearchforcompany();
  }

  
  
  sortData(event: any): void {
    this.sortColumn = event.active;
    this.sortDirection = event.direction;
    this.filterSearchforcompany();
    
  }

  filterSearchforcompany() {
    const formData = JSON.parse(JSON.stringify(this.superForms.getRawValue()));
    
    let startDate = new Date(this.superForms.value.startDate);
    let endDate = new Date(this.superForms.value.endDate);
    let framedStartDate: any = (startDate.getMonth() + 1) + '/' +startDate.getDate() + '/' + startDate.getFullYear();
let framedEndDate: any = (endDate.getMonth() + 1) + '/' +endDate.getDate() + '/' + endDate.getFullYear();

let totalCompanies1 = this.profitcenterlist.filter((o: any) => o.name == formData["profitCentre"]);
      formData["profitCentre"] = totalCompanies1[0]['name'];

    this.superForms.value.profitCentre
    let url="profitCentre=" + formData.profitCentre + "&startDate=" + framedStartDate +"&endDate=" +framedEndDate  + "&sortBy=" + this.sortColumn + "&sortDirection=" + this.sortDirection;

    this.resourceRelatedActivityService.getPayRollActivityService(url).subscribe((data) => {
      this.payrollData = data;
    })

    
  }
 

  clearByclick() {
    let sdata = document.querySelector('[id="searchid"]') as HTMLInputElement;
    sdata.value = '';
    //  this.loadTable();
    this.filterSearchforcompany();
  }

  getprofitcenterdropdown() {
    let url = "paged=true";
    this.profitcenter.getProfitCenterlist(url).subscribe((data) => {
      this.profitcenterlist = data.content;
      let allData = {name: "All Profit Centers"};
      this.profitcenterlist.push(allData);
    })

  }
}
