import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CostCenterService } from '../cost-center.service';
import { DeletepopupConfirmComponent } from '../deletepopup-confirm/deletepopup-confirm.component';
import { GroupService } from '../group.service';
import { ProfitCenterService } from '../profit-center.service';
import { ResourceService } from '../resource.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss']
})
export class ResourceListComponent implements OnInit {
  countrieslist: any;
  costCenterlist: any;
  ResourceTotalCount = [];
  superForms: FormGroup = this.fb.group({

    countryId: [],
    costCentreId: [],
    name: [''],
    region: [''],
    role: [''],
    id: [''],
  });

  displayedColumns: string[] = [
    // 'ResourceId',
    'name',
    'role',
    'employee',
    'active',
    'roaster',
    'countryId',
    'region',
    'costCentreId',
    'Actions'
  ];
  Resourcelist: MatTableDataSource<any> = new MatTableDataSource<any>();

  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25];
  totalResult = 0;
  url: string = '';
  pageIndex = 0;
  autoData1: any;
  autoData: any;
  sortDirection: string = 'DESC';
  sortColumn: string = 'auditSection.createdDate';
  pageEvent!: PageEvent;
  filterSearchCheching:boolean=false;


  constructor(private fb: FormBuilder,
    private costCenterService: CostCenterService,
    private groupservice: GroupService,
    private profitcenter: ProfitCenterService,
    private resourceservice: ResourceService,
    private toasterService: ToastrService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,


  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if(params.pageSize){
        this.pageSize=params.pageSize;
      }else{
        this.pageSize=10;
      }
      if(params.pageIndex){
        this.pageIndex=params.pageIndex;
      }else{
        this.pageIndex=0;
      }
    })
    this.getCostCenterList();
    this.getCountries();
    this.loadTable();

    this.superForms.get('countryId')?.valueChanges.subscribe((x1: any) => {
      this.autoData1 = this.countrieslist.filter((option1: any) => { return option1.name.toLowerCase().includes(typeof(x1)=="number"?x1.toString().toLowerCase():x1.toLowerCase()) });
    })
    this.superForms.get('costCentreId')?.valueChanges.subscribe((x1: any) => {
      this.autoData = this.costCenterlist.filter((option1: any) => { return option1.name.toLowerCase().includes(typeof(x1)=="number"?x1.toString().toLowerCase():x1.toLowerCase()) });
    })
  }
  onPaginateChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.router.navigateByUrl('/resource?pageSize='+this.pageSize+'&pageIndex='+this.pageIndex);
    if(this.filterSearchCheching){
      this.filterSearchforResource();
    }else{
    this.loadTable();
    }
  }
  sortData(event: any): void {
    this.sortColumn = event.active;
    this.sortDirection = event.direction;
    if(this.filterSearchCheching){
      this.filterSearchforResource();
    }else{
    this.loadTable();
    }
  }
  deleteResourceById(data: any) {
    const dialogRef = this.dialog.open(DeletepopupConfirmComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {

      if (result) {

        this.resourceservice.deleteResource(data).subscribe({
          next: (data) => {

            this.loadTable();
            this.toasterService.success(
              data.message,
              'Deleted Successfully'
            );

          },
          error: (err: any) => {
            this.toasterService.error(err.error.message);
          }
        });

      }
    });

  }

  filterSearchforResource() {
    this.filterSearchCheching =true;
    const formData = JSON.parse(JSON.stringify(this.superForms.getRawValue()));
    if (formData.countryId == null || formData.countryId == "") {
      delete formData["countryId"];
    }
    else {
      let totalCompanies1 = this.countrieslist.filter((o: any) => o.name == formData["countryId"]);
      formData["countryId"] = totalCompanies1[0]['id'];
    }
    if (formData.costCentreId == null || formData.costCentreId == "") {
      delete formData["costCentreId"];
    } else {
      let totalCompanies1 = this.costCenterlist.filter((o: any) => o.name == formData["costCentreId"]);
      formData["costCentreId"] = totalCompanies1[0]['id'];
    }
    if (formData.name == null || formData.name == "") {
      delete formData["name"];
    }
    if (formData.role == null || formData.role == "") {
      delete formData["role"];
    }
    if (formData.region == null || formData.region == "") {
      delete formData["region"];
    }
   

    let url = "paged=true" + "&page=" + this.pageIndex + "&size=" + this.pageSize +"&sortBy=" + this.sortColumn + "&sortDirection=" + this.sortDirection;
    this.resourceservice.searchResource(url, formData).subscribe((data) => {
      if (data) {
        this.ResourceTotalCount = data.totalElements
        this.Resourcelist = data.content;
      }
      if (data.pageable) {
        this.totalResult = data.totalElements;
      }
    });
  }

  getCostCenterList() {
    let url = "paged=true";
    this.costCenterService.getCostCenterlist(url).subscribe((data) => {
      this.costCenterlist = data.content;
    })
  }

  getCountries() {
    this.profitcenter.getCountrylist().subscribe((data) => {
      if (data) {
        this.countrieslist = data;

      }
    })
  }

  loadTable(): void {



    //this.loadingService.setLoading(true);
    let url = "paged=true" + "&page=" + this.pageIndex + "&size=" + this.pageSize +"&sortBy=" + this.sortColumn + "&sortDirection=" + this.sortDirection;
    this.resourceservice.getResourcelist(url).subscribe((data) => {

      this.ResourceTotalCount = data.totalElements

      this.Resourcelist = data.content;
      //console.log('this.GData..' + this.Resourcelist);

      if (data.pageable) {
        this.totalResult = data.totalElements;
      }

    });
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
