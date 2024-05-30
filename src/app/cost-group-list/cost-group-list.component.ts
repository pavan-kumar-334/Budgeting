import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { CostCenterService } from '../cost-center.service';
import { CostGroupService } from '../cost-group.service';
import { DeletepopupConfirmComponent } from '../deletepopup-confirm/deletepopup-confirm.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cost-group-list',
  templateUrl: './cost-group-list.component.html',
  styleUrls: ['./cost-group-list.component.scss']
})
export class CostGroupListComponent implements OnInit {
  countrieslist: any;
  companylist: any;
  //customerlist: any;
  costGroupList:any;
  costCenterlist: any;

  constructor(private fb: FormBuilder,
    private costGroupService:CostGroupService,
    private toasterService: ToastrService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private costCenterService:CostCenterService, ) { }

  superForms: FormGroup = this.fb.group({

    costCentreId: [ ],
    //company: [],
    name: ['']
  });

  displayedColumns: string[] = [
    // 'CId',
    'name',
    'costcentreId',
    //'createdDate',
    //'lastModifiedDate',
    'Actions'
  ];


  pageSize = 10;
  pageSizeOptions: number[] = [1, 10, 25];
  totalResult = 0;
  url: string = '';
  pageIndex = 0;
  sortDirection: string = 'DESC';
  sortColumn: string = 'auditSection.createdDate';
  pageEvent!: PageEvent;
  totalcount=[];
  autoData1:any;
  filterSearchCheching:boolean = false;

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
    this.loadTable();
    this.getCostCenterList();
    this.superForms.get('costCentreId')?.valueChanges.subscribe(x1 => {
      this.autoData1 = this.costCenterlist.filter((option1: any) => { return option1.name.toLowerCase().includes(x1.toLowerCase()) });
    })
  }


  onPaginateChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.router.navigateByUrl('/costGroup?pageSize='+this.pageSize +'&pageIndex=' +this.pageIndex);
    if(this.filterSearchCheching){
      this.filterSearchforcostGroup();
    }else{
    this.loadTable();
    }
  }
  sortData(event: any): void {
    this.sortColumn = event.active;
    this.sortDirection = event.direction;
    if(this.filterSearchCheching){
      this.filterSearchforcostGroup();
    }else{
    this.loadTable();
    }
  }
  

  loadTable(){

    let url = "?" + "paged=true" + "&page=" + this.pageIndex + "&size=" + this.pageSize +"&sortBy=" + this.sortColumn + "&sortDirection=" + this.sortDirection;
    this.costGroupService.getCostGroupList(url).subscribe((data)=>{
      //console.log('testtttt'+JSON.stringify(data) );
    this.costGroupList=data.content;
    this.totalcount = data.totalElements;
    if (data.pageable) {
      this.totalResult = data.totalElements;
    }
  

    });

  }

  deleteCostGroup(id:string){
    
    const dialogRef = this.dialog.open(DeletepopupConfirmComponent, { width: '400px' });
    dialogRef.afterClosed().subscribe((result) => {

      if (result) {

    this.costGroupService.deleteCostGroup(id).subscribe({
      next:(data)=>{

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
  getCostCenterList() {
    let url ="paged=true";
    this.costCenterService.getCostCenterlist(url).subscribe((data)=>{
        this.costCenterlist=data.content;
    })
  }

  filterSearchforcostGroup() {
    this.filterSearchCheching = true;
    const formData = JSON.parse(JSON.stringify(this.superForms.getRawValue()));
    if (formData.costCentreId == null || formData.costCentreId == "") {
      delete formData["costCentreId"];
    }else {
      let totalCompanies1 = this.costCenterlist.filter((o: any) => o.name == formData["costCentreId"]);
      formData["costCentreId"] = totalCompanies1[0]['id'];
    }
    if (formData.name == null || formData.name == "") {
      delete formData["name"];
    }
   

    let url = "paged=true" + "&page=" + this.pageIndex + "&size=" + this.pageSize +"&sortBy=" + this.sortColumn + "&sortDirection=" + this.sortDirection;
    this.costGroupService.searchCostGroup(url, formData).subscribe((data) => {

      if (data) {
        this.costGroupList = data.content;
        this.totalcount = data.totalElements;
      }
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


  

