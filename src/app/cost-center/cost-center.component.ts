import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CostCenterService } from '../cost-center.service';
import { DeletepopupConfirmComponent } from '../deletepopup-confirm/deletepopup-confirm.component';
import { ProfitCenterService } from '../profit-center.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cost-center',
  templateUrl: './cost-center.component.html',
  styleUrls: ['./cost-center.component.scss']
})
export class CostCenterComponent implements OnInit {
  GaData = [];
  superForms: FormGroup = this.fb.group({

    country: [],
    profitcentre: [],
    name: ['']
  });
  pageSizeOptions: number[] = [5, 10, 25];
  countrieslist: any;
  companylist: any;
  profitcenterlist: any;
  costcenterlist: any;
  // pageIndex:0;
  // pageSize:10;
  pageIndex = 0;
  pageSize = 10;
  totalResult = 0;
  autoData1: any;
  autoData: any;
  sortDirection: string = 'DESC';
  sortColumn: string = 'auditSection.createdDate';
  filterSearchCheching: boolean = false;



  displayedColumns: string[] = [
    // 'CId',
    'Name',
    'country',
    'profitcentre',
    'Actions'
  ];

  constructor(private costcenterServis: CostCenterService,
    private fb: FormBuilder,
    private profitcenter: ProfitCenterService,
    private dialog: MatDialog,
    private router:Router,
    private route:ActivatedRoute,
    private toasterService: ToastrService,
  ) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if(params.pageSize){
        this.pageSize=params.pageSize;
      }else{
        this.pageSize=10;
      }
      if (params.pageIndex) {
        this.pageIndex=params.pageIndex;
      } else {
        this.pageIndex=0;
      }
    })
    this.getCountries();
    this.getprofitcenterdropdown();
    this.loadTable();


    this.superForms.get('country')?.valueChanges.subscribe(x1 => {
      this.autoData1 = this.countrieslist.filter((option1: any) => { return option1.name.toLowerCase().includes(x1.toLowerCase()) });
    })

    this.superForms.get('profitcentre')?.valueChanges.subscribe(x => {
      this.autoData = this.profitcenterlist.filter((option: any) => { return option.name.toLowerCase().includes(x.toLowerCase()) });
    })

  }
  loadTable() {
    let url = "paged=true" + "&page=" + this.pageIndex + "&size=" + this.pageSize + "&sortBy=" + this.sortColumn + "&sortDirection=" + this.sortDirection;
    this.costcenterServis.getCostCenterlist(url).subscribe((data) => {
      //console.log("profitcenter..."+data)
      if (data.content) {
        this.costcenterlist = data.content;
        this.GaData = data.totalElements

      }
      if (data.pageable) {
        this.totalResult = data.totalElements;
      }
    });

  }
  onPaginateChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.router.navigateByUrl('/costCenter?pageSize='+this.pageSize+'&pageIndex='+this.pageIndex);
    if (this.filterSearchCheching) {
      this.filterSearchforcostCenter();
    } else {
      this.loadTable();
    }
  }
  sortData(event: any): void {
    this.sortColumn = event.active;
    this.sortDirection = event.direction;
    if (this.filterSearchCheching) {
      this.filterSearchforcostCenter();
    } else {
      this.loadTable();
    }
  }
  filterSearchforcostCenter() {
    this.filterSearchCheching = true;
    const formData = JSON.parse(JSON.stringify(this.superForms.getRawValue()));

    if (formData.country == null || formData.country == "") {
      delete formData["country"];
    } else {
      let totalCompanies1 = this.countrieslist.filter((o: any) => o.name == formData["country"]);
      formData["country"] = totalCompanies1[0]['id'];
    }
    if (formData.profitcentre == null || formData.profitcentre == "") {
      delete formData["profitcentre"];
    } else {
      let totalCompanies1 = this.profitcenterlist.filter((o: any) => o.name == formData["profitcentre"]);
      formData["profitcentre"] = totalCompanies1[0]['id'];
    }
    if (formData.name == null || formData.name == "") {
      delete formData["name"];
    }


    let url = "paged=true" + "&page=" + this.pageIndex + "&size=" + this.pageSize + "&sortBy=" + this.sortColumn + "&sortDirection=" + this.sortDirection;

    this.costcenterServis.SearchCostcenter(url, formData).subscribe((data) => {
      if (data) {
        //this.list = JSON.stringify(data);
        this.costcenterlist = data.content;
        this.GaData = data.totalElements
        // console.log('this.GData..' + this.costcenterlist);
      }
      if (data.pageable) {
        this.totalResult = data.totalElements;
      }

    });

  }
  deleteCostCenter(data: any) {
    const dialogRef = this.dialog.open(DeletepopupConfirmComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.costcenterServis.deleteCostCenter(data).subscribe({
          next: (data) => {
            this.loadTable();

            this.toasterService.success(
              data.message,
              'Deleted Successfully'
            );
          },
          error: (err: any) => {
            this.toasterService.error(err.error.message);
          },
        })
      }
    });
  }

  getCountries() {
    this.profitcenter.getCountrylist().subscribe((data) => {
      if (data) {
        this.countrieslist = data;
        // this.countrieslist=data;

      }
    })
  }

  getprofitcenterdropdown() {
    let url = "paged=true";
    this.profitcenter.getProfitCenterlist(url).subscribe((data) => {
      //console.log("profitcenter..."+data)
      this.profitcenterlist = data.content;


    })

  }

  onCellHover(event: MouseEvent) {
    const cell = event.target as HTMLElement;
    cell.classList.add('hovered');
  }
  
  onCellLeave(event: MouseEvent) {
    const cell = event.target as HTMLElement;
    cell.classList.remove('hovered');
  }

}
