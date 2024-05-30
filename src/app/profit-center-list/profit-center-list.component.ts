import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { DeletepopupConfirmComponent } from '../deletepopup-confirm/deletepopup-confirm.component';
import { ProfitCenterService } from '../profit-center.service';
import { Router,ActivatedRoute } from '@angular/router';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-profit-center-list',
  templateUrl: './profit-center-list.component.html',
  styleUrls: ['./profit-center-list.component.scss']
})
export class ProfitCenterListComponent implements OnInit {
  GaData = [];
  countrieslist: any;
  companylist:any;
  //profitcenterlist:any;
  //list: string;

  constructor(private fb: FormBuilder,private router: Router,private route: ActivatedRoute,private profitcenter: ProfitCenterService,private dialog: MatDialog,private toasterService: ToastrService,) { }

  superForms: FormGroup = this.fb.group({

    countryId: [ ],
    companyId: [ ],
    name: ['']
  });
  dataaaaaaa:any=[];
  displayedColumns: string[] = [
    // 'CId',
    'Name',
    'countryId',
    'CompanyId',
    //'createdDate',
    //'lastModifiedDate',
    'Actions'
  ];
  profitcenterlist: MatTableDataSource<any> = new MatTableDataSource<any>();
  pageSize = 10;
  pageSizeOptions: number[] = [1, 10, 25];
  totalResult = 0;
  url: string = '';
  pageIndex = 0;
  sortDirection: string = 'DESC';
  sortColumn: string = 'auditSection.createdDate';
  pageEvent!: PageEvent;
  autoData:any;
  autoData1:any;
  filterSearchCheching:boolean=false;
  
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
    this.getCompaniyList();
    this.loadTable();
    this.superForms.get('companyId')?.valueChanges.subscribe(x => {
      
      this.autoData = this.companylist.filter((option:any) => {  return option.name.toLowerCase().includes(x.toLowerCase())});
      
   })

   this.superForms.get('countryId')?.valueChanges.subscribe(x1 => {
    this.autoData1 = this.countrieslist.filter((option1: any) => { return option1.name.toLowerCase().includes(x1.toLowerCase()) });
  })
  }
  
  
  onPaginateChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.router.navigateByUrl('/profitCenter?pageSize='+this.pageSize+'&pageIndex='+this.pageIndex);
    if(this.filterSearchCheching){
      this.filterSearchforProfitCenter();
    }else{
    this.loadTable();
    }
  }
  sortData(event: any): void {
    this.sortColumn = event.active;
    this.sortDirection = event.direction;
    if(this.filterSearchCheching){
      this.filterSearchforProfitCenter();
    }else{
    this.loadTable();
    }
  }
  getCountries() {
    this.profitcenter.getCountrylist().subscribe((data) => {
      if (data) {
        this.countrieslist = data;
        // this.countrieslist=data;

      }
    })
  }
  getCompaniyList(){
    //this.pageSize = JSON.parse(localStorage.getItem('dataForCompanyCount'))
    let url ="paged=true" + "&page="+this.pageIndex+"&size="+"2000";
    this.profitcenter.getCompanylist(url).subscribe((data)=>{
      
       this.companylist=data.content
       let variables2 =  this.companylist;
      let filteredList4 = this.companylist.slice();
    })
  }

  
  // filterCompanies(event:any){
  //   let term = event;
  //   var pattern = /^\d+$/;let filterArray = [];
    
  //   if (pattern.test(term)) {
  //     filterArray = this.companylist.filter((k:any) => k.startsWith(term));
  //   } else {filterArray = this.companylist.filter((k:any) => { 
  //     return k.name.toLowerCase().includes(term.toLowerCase()) 
  //   });}
  //   this.dataaaaaaa =  filterArray
  //   console.log(this.dataaaaaaa)
  // }


  loadTable(){
    
    let url ="paged=true" + "&page=" + this.pageIndex + "&size=" + this.pageSize +"&sortBy=" + this.sortColumn + "&sortDirection=" + this.sortDirection;
    this.profitcenter.getProfitCenterlist(url).subscribe((data)=>{
    //console.log("profitcenter..."+data)
    if(data.content){
    this.profitcenterlist=data.content;
    this.GaData = data.totalElements


    }
    if(data.pageable){
      this.totalResult=data.totalElements;
    }

    })

  }

  deleteProfitCenter(data:any){

    const dialogRef = this.dialog.open(DeletepopupConfirmComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.loadTable();

      if (result) {
    this.profitcenter.deleteProfitCenter(data).subscribe({next:(data)=>{

      this.loadTable();
      this.toasterService.success(
        data.message,
        'Deleted Successfully'
      );
    
      },
      error:(err:any)=>{
        this.toasterService.error(err.error.message);
      }
    });
   }


   });

  }

  
  filterSearchforProfitCenter() {
    this.filterSearchCheching = true;
    const formData = JSON.parse(JSON.stringify(this.superForms.getRawValue()));

    if(formData.countryId == null || formData.countryId == ""){
      delete formData["countryId"];
    }else {
      let totalCompanies1 = this.countrieslist.filter((o: any) => o.name == formData["countryId"]);
      formData["countryId"] = totalCompanies1[0]['id'];
    }
     if(formData.companyId == null || formData.companyId == ""){
      delete formData["companyId"];
    }else{
      let totalCompanies = this.companylist.filter((o:any)=> o.name == formData["companyId"]);
      formData["companyId"] = totalCompanies[0]['id'];
    }
     if(formData.name == null || formData.name == ""){
      delete formData["name"];
    }
    // var galleryFormData: FormData = new FormData();
    // galleryFormData.append('product', JSON.stringify(this.superForms));
    let url ="paged=true" + "&page=" + this.pageIndex + "&size=" + this.pageSize +"&sortBy=" + this.sortColumn + "&sortDirection=" + this.sortDirection;
   
   

    this.profitcenter.searchProfitCenter(url, formData).subscribe((data) => {
  
      if (data) {
        
        //this.list = JSON.stringify(data);
        this.profitcenterlist = data.content;
        this.GaData = data.totalElements
       // console.log('this.GData.a.' + this.profitcenterlist);
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
