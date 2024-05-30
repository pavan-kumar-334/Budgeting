import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { CostElementService } from '../cost-element.service';
import { CostGroupService } from '../cost-group.service';
import { DeletepopupConfirmComponent } from '../deletepopup-confirm/deletepopup-confirm.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cost-element-list',
  templateUrl: './cost-element-list.component.html',
  styleUrls: ['./cost-element-list.component.scss']
})
export class CostElementListComponent implements OnInit {

  countrieslist: any;
  costElementlist:any;
  totalcount=[];


  constructor(private fb: FormBuilder,
    private costelementservice:CostElementService,
    private toasterService: ToastrService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private costGroupService:CostGroupService,
    ) { }

  superForms: FormGroup = this.fb.group({

    costGroupId: [],
    //company: [],
    name: ['']

  });

  displayedColumns: string[] = [
    // 'CId',
    'name',
    'costGroupId',
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
  costGroupList:any;
  autoData1:any;
  filterSearchCheching:boolean=false;

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
    this.getCostGroupList();
    this.superForms.get('costGroupId')?.valueChanges.subscribe(x1 => {
      this.autoData1 = this.costGroupList.filter((option1: any) => { return option1.name.toLowerCase().includes(x1.toLowerCase()) });
    })
  }



  
  onPaginateChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.router.navigateByUrl('/costElement?pageSize='+this.pageSize+'&pageIndex='+this.pageIndex);
    if(this.filterSearchCheching){
      this.filterSearchforcostElement();
    }else{
    this.loadTable();
    }
  }
  sortData(event: any): void {
    this.sortColumn = event.active;
    this.sortDirection = event.direction;
    if(this.filterSearchCheching){
      this.filterSearchforcostElement();
    }else{
    this.loadTable();
    }
  }

  loadTable(){

    let url = "?" + "paged=true" + "&page=" + this.pageIndex + "&size=" + this.pageSize +"&sortBy=" + this.sortColumn + "&sortDirection=" + this.sortDirection;
    this.costelementservice.getCostElementList(url).subscribe((data)=>{
      this.costElementlist=data.content;
      this.totalcount = data.totalElements;
      if (data.pageable) {
        this.totalResult = data.totalElements;
      }

    });

  }

  deleteCostElement(id:string){
    
    const dialogRef = this.dialog.open(DeletepopupConfirmComponent, { width: '400px' });
    dialogRef.afterClosed().subscribe((result) => {

      if (result) {

    this.costelementservice.deleteCostElementById(id).subscribe({
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

  getCostGroupList(){
    let url = "?";
    this.costGroupService.getCostGroupList(url).subscribe((data)=>{
      //console.log('testtttt'+JSON.stringify(data) );
    this.costGroupList=data.content;
  
  
    });
  
  }

  filterSearchforcostElement() {
    this.filterSearchCheching =true;
    const formData = JSON.parse(JSON.stringify(this.superForms.getRawValue()));
    if (formData.costGroupId == null || formData.costGroupId == "") {
      delete formData["costGroupId"];
    } else {
      let totalCompanies1 = this.costGroupList.filter((o: any) => o.name == formData["costGroupId"]);
      formData["costGroupId"] = totalCompanies1[0]['id'];
    }
    if (formData.name == null || formData.name == "") {
      delete formData["name"];
    }
   

    let url = "paged=true" + "&page=" + this.pageIndex + "&size=" + this.pageSize +"&sortBy=" + this.sortColumn + "&sortDirection=" + this.sortDirection;
    this.costelementservice.searchCostElement(url, formData).subscribe((data) => {

      if (data) {
        this.costElementlist = data.content
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

