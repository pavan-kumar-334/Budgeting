import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../company.service';
import { DeletepopupConfirmComponent } from '../deletepopup-confirm/deletepopup-confirm.component';
import { browserRefresh } from '../app.component';
import { ProfitCenterService } from '../profit-center.service';
import { ResourceRelatedActivityService } from '../resource-related-activity.service';

@Component({
  selector: 'app-resource-related-activity',
  templateUrl: './resource-related-activity.component.html',
  styleUrls: ['./resource-related-activity.component.scss'],
})
export class ResourceRelatedActivityComponent implements OnInit {
  GaData = [];
  profitCenterRelatedlist: any;
  textClear: boolean = false;
  displayedColumns: string[] = [
    'month',
    'resourcename',
    'resourcecostcentre',
    'resourcetype',
    'projectname',
    'projectprofitcentre',
    'projecttype',
    'days',
    'resourcesellrate',
    'resourcesellratecurrency',
    'resourcetransferrate',
    'resourcetransferratecurrency',
    'resourcedailycostrate',
    'resourcedailycostratecurrency',
    'relevantsellrate',
    'profitcentrecurrency',
    'relevantcostrate',
    'profitcentrecurrency1',
    'resourcerevenue',
    'profitcentrecurrency2',
    'resourcecost',
    'profitcentrecurrency3',
    'resourcemargin',
    'profitcentrecurrency4',
    'resourceactualcost',
    'profitcentrecurrency5',
    'resourcecostadjustment',
    'profitcentrecurrency6',
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
  filterSearchCheching: boolean = false;
  autoData: any;
  autoData1: any;
  totalData: any;

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
    private resourceRelatedActivityService: ResourceRelatedActivityService
  ) {}

  ngOnInit(): void {
    this.getprofitcenterdropdown();

    this.superForms.get('profitCentre')?.valueChanges.subscribe((x) => {
      this.autoData = this.profitcenterlist.filter((option: any) => {
        return option.name.toLowerCase().includes(x.toLowerCase());
      });
    });

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
    let totalCompanies1 = this.profitcenterlist.filter(
      (o: any) => o.name == formData['profitCentre']
    );
    formData['profitCentre'] = totalCompanies1[0]['name'];

    this.superForms.value.profitCentre;
    let url =
      'profitCentre=' +
      formData.profitCentre +
      '&startDate=' +
      framedStartDate +
      '&endDate=' +
      framedEndDate + "&sortBy=" + this.sortColumn + "&sortDirection=" + this.sortDirection;


    this.resourceRelatedActivityService
      .getResourceRelatedActivityService(url)
      .subscribe((data) => {
        this.keys = Object.keys(data.reportsDTOList);
        this.totalData = data;

        for (let k = 0; k < this.keys.length; k++) {
          let subObj: any = {};
          subObj['resourceRevenue'] =
            this.totalData['totalContributionDTOS'][this.keys[k]][
              'totalRevenue'
            ];

          subObj['resourceCostAdjustment'] =
            this.totalData['totalContributionDTOS'][this.keys[k]][
              'totalAnnualCostAdjustment'
            ];

          subObj['resourceActualCost'] =
            this.totalData['totalContributionDTOS'][this.keys[k]][
              'totalAnnualCost'
            ];

          subObj['resourceCost'] =
            this.totalData['totalContributionDTOS'][this.keys[k]]['totalCost'];

          subObj['resourceMargin'] =
            this.totalData['totalContributionDTOS'][this.keys[k]][
              'totalMargin'
            ];

          // subObj['profitCentreCurrency1'] =
          //   this.totalData['totalContributionDTOS'][this.keys[k]][
          //     'subTotalText'
          //   ];
            subObj['profitCentreCurrency1'] =
          "Sub Total Of "+this.keys[k];

          subObj['profitCentreCurrency2'] =
            this.totalData['totalContributionDTOS'][this.keys[k]][
              'profitCentreCurrency'
            ];
          subObj['profitCentreCurrency3'] =
            this.totalData['totalContributionDTOS'][this.keys[k]][
              'profitCentreCurrency'
            ];
          subObj['profitCentreCurrency4'] =
            this.totalData['totalContributionDTOS'][this.keys[k]][
              'profitCentreCurrency'
            ];
          subObj['profitCentreCurrency5'] =
            this.totalData['totalContributionDTOS'][this.keys[k]][
              'profitCentreCurrency'
            ];
          subObj['profitCentreCurrency6'] =
            this.totalData['totalContributionDTOS'][this.keys[k]][
              'profitCentreCurrency'
            ];
            subObj['activeTotalClass'] = true;


          this.totalData['reportsDTOList'][this.keys[k]].push(subObj);
          if (this.keys.length - 1 === k) {
            let totalObj: any = {};

            totalObj['resourceRevenue'] =
              this.totalData['totalContributionDTOS']['Total']['totalRevenue'];

            totalObj['resourceCostAdjustment'] =
              this.totalData['totalContributionDTOS']['Total'][
                'totalAnnualCostAdjustment'
              ];

            totalObj['resourceActualCost'] =
              this.totalData['totalContributionDTOS']['Total'][
                'totalAnnualCost'
              ];

            totalObj['resourceCost'] =
              this.totalData['totalContributionDTOS']['Total']['totalCost'];

            totalObj['resourceMargin'] =
              this.totalData['totalContributionDTOS']['Total']['totalMargin'];

            totalObj['profitCentreCurrency1'] =
              this.totalData['totalContributionDTOS']['Total']['subTotalText'];

            totalObj['profitCentreCurrency2'] =
              this.totalData['totalContributionDTOS']['Total'][
                'profitCentreCurrency'
              ];
            totalObj['profitCentreCurrency3'] =
              this.totalData['totalContributionDTOS']['Total'][
                'profitCentreCurrency'
              ];
            totalObj['profitCentreCurrency4'] =
              this.totalData['totalContributionDTOS']['Total'][
                'profitCentreCurrency'
              ];
            totalObj['profitCentreCurrency5'] =
              this.totalData['totalContributionDTOS']['Total'][
                'profitCentreCurrency'
              ];
            totalObj['profitCentreCurrency6'] =
              this.totalData['totalContributionDTOS']['Total'][
                'profitCentreCurrency'
              ];
              totalObj['activeClass'] = true;

            this.totalData['reportsDTOList'][this.keys[k]].push(totalObj);
          }
        }

        if (this.keys) {
          this.profitCenterRelatedlist = [];
          this.keys.map((key: any, index: any) => {
            this.totalData.reportsDTOList[key].map((data: any) => {
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
    let url = 'paged=true';
    this.profitcenter.getProfitCenterlist(url).subscribe((data) => {
      //console.log("profitcenter..."+data)
      this.profitcenterlist = data.content;
      let allData = {name: "All Profit Centers"};
      this.profitcenterlist.push(allData);
    });
  }
  getObjKeysFor(obj: any) {
    return Object.keys(obj);
  }

  containsChar(profitCentreCurrency1: string, char: string): boolean {
    return profitCentreCurrency1.includes(char);
  }
}
