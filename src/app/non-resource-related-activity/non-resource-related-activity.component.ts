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

@Component({
  selector: 'app-non-resource-related-activity',
  templateUrl: './non-resource-related-activity.component.html',
  styleUrls: ['./non-resource-related-activity.component.scss']
})
export class NonResourceRelatedActivityComponent implements OnInit {
  GaData = [];
  profitCenterRelatedlist:any;
  textClear: boolean = false;
  displayedColumns: string[] = [
    'month',
    'projectname',
    'projectprofitcentre',
    'projecttype',
    'projectrevenue',
    'revenuePCCurrency',
    'projectdirectcosts',
    'directCostPCCurrency',
    'projectmargin',
    'marginPCCurrency',

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
  companiesData: MatTableDataSource<any> = new MatTableDataSource<any>();
  list: any;
  keys: any;
  totalData: any;
  companydata: any;
  pageSizeOptions: number[] = [2, 10, 25];
  totalResult = 0;
  url: string = '';
  pageIndex = 0;
  pageSize = 10;
  sortDirection: string = 'DESC';
  sortColumn: string = 'auditSection.createdDate';
  pageEvent!: PageEvent;
  countrieslist: any;
  groupslist: any;
  browserRefresh: any;
  profitcenterlist: any;
  filterSearchCheching :boolean=false;
  autoData: any;
  autoData1:any;

  superForms: FormGroup = this.fb.group({
    profitCentre: ['All Profit Centers' ,Validators.required],
    startDate: [ ,Validators.required],
    endDate: [ ,Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private toasterService: ToastrService,
    private dialog: MatDialog,
    private profitcenter: ProfitCenterService,
    private resourceRelatedActivityService:ResourceRelatedActivityService

  ) { }

  ngOnInit(): void {
    
    this.getprofitcenterdropdown();

    this.superForms.get('profitCentre')?.valueChanges.subscribe(x => {
      this.autoData = this.profitcenterlist.filter((option: any) => { return option.name.toLowerCase().includes(x.toLowerCase()) });
    })
   
    this.browserRefresh = browserRefresh;
  
 
  }
  sortData(event: any): void {
    this.sortColumn = event.active;
    this.sortDirection = event.direction;
    this.filterSearchforcompany();
    

  }
  //ffffffffffffffffffffffgggggggg
  // hghghgfhgfg
  


 

  filterSearchforcompany() {
    const formData = JSON.parse(JSON.stringify(this.superForms.getRawValue()));
    let startDate = new Date(this.superForms.value.startDate);
    let endDate = new Date(this.superForms.value.endDate);
    let framedStartDate: any = ((startDate.getMonth() + 1) >= 10 ? (startDate.getMonth() + 1) : '0'+(startDate.getMonth() + 1)) + '/' +((startDate.getDate()) >= 10 ? (startDate.getDate()) : '0'+(startDate.getDate() )) +  '/' + startDate.getFullYear();
let framedEndDate: any = ((endDate.getMonth() + 1) >= 10 ? (endDate.getMonth() + 1) : '0'+(endDate.getMonth() + 1)) + '/' + ((endDate.getDate()) >= 10 ? (endDate.getDate()) : '0'+(endDate.getDate() )) +  '/' + endDate.getFullYear();
let totalCompanies1 = this.profitcenterlist.filter((o: any) => o.name == formData["profitCentre"]);
      formData["profitCentre"] = totalCompanies1[0]['id'];


    this.superForms.value.profitCentre
    let url="profitCentre=" + formData.profitCentre  + "&startDate=" + framedStartDate +"&endDate=" +framedEndDate + "&sortBy=" + this.sortColumn + "&sortDirection=" + this.sortDirection;

    this.resourceRelatedActivityService.getNonResourceRelatedActivityService(url).subscribe((data) => {
      this.keys = Object.keys(data.resoorceRelatedList);
      this.totalData = data;

      for (let k = 0; k < this.keys.length; k++) {
        let res1:any=this.keys[k]
        let subObj: any = {};
        subObj['projectRevenue'] =
          this.totalData['totalContributionDTOS'][this.keys[k]][
            'totalRevenue'
          ];

        subObj['projectMargin'] =
          this.totalData['totalContributionDTOS'][this.keys[k]][
            'totalMargin'
          ];

        subObj['projectDirectCost'] =
          this.totalData['totalContributionDTOS'][this.keys[k]][
            'totalCost'
          ];

        
        subObj['revenuePCCurrency'] =
          this.totalData['totalContributionDTOS'][this.keys[k]][
            'profitCentreCurrency'
          ];
        subObj['directCostPCCurrency'] =
          this.totalData['totalContributionDTOS'][this.keys[k]][
            'profitCentreCurrency'
          ];
        subObj['marginPCCurrency'] =
          this.totalData['totalContributionDTOS'][this.keys[k]][
            'profitCentreCurrency'
          ];    

          // subObj['projectType'] =
          // this.totalData['totalContributionDTOS'][this.keys[k]][
          //   'subTotalText'
          // ] + res1;

          subObj['projectType'] =
          "Sub Total Of "+this.keys[k];

          subObj['activeTotalClass'] = true;
          


        this.totalData['resoorceRelatedList'][this.keys[k]].push(subObj);
        if (this.keys.length - 1 === k) {
          let totalObj: any = {};

          totalObj['projectRevenue'] =
          this.totalData['totalContributionDTOS']['Total'][
            'totalRevenue'
          ];

          totalObj['projectMargin'] =
          this.totalData['totalContributionDTOS']['Total'][
            'totalMargin'
          ];

          totalObj['projectDirectCost'] =
          this.totalData['totalContributionDTOS']['Total'][
            'totalCost'
          ];
        
          totalObj['revenuePCCurrency'] =
          this.totalData['totalContributionDTOS']['Total'][
            'profitCentreCurrency'
          ];
          totalObj['directCostPCCurrency'] =
          this.totalData['totalContributionDTOS']['Total'][
            'profitCentreCurrency'
          ];
          totalObj['marginPCCurrency'] =
          this.totalData['totalContributionDTOS']['Total'][
            'profitCentreCurrency'
          ];    

          totalObj['projectType'] =
          this.totalData['totalContributionDTOS']['Total'][
            'subTotalText'
          ];
          totalObj['activeClass'] = true;

          this.totalData['resoorceRelatedList'][this.keys[k]].push(totalObj);
        }

        
      }

      if (this.keys) {
        this.profitCenterRelatedlist = [];
        this.keys.map((key: any, index: any) => {
          this.totalData.resoorceRelatedList[key].map((data: any) => {
            this.profitCenterRelatedlist.push(data);
          });
        });
      }
    });
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
      //console.log("profitcenter..."+data)
      this.profitcenterlist = data.content;
      let allData = {id: 0, name: "All Profit Centers"};
      this.profitcenterlist.push(allData);
    })

  }

  containsChar(projectType: string, char: string): boolean {
    return projectType.includes(char);
  }
}
