import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CustomersService } from '../customers.service';
import { DeletepopupConfirmComponent } from '../deletepopup-confirm/deletepopup-confirm.component';
import { ProfitCenterService } from '../profit-center.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  countrieslist: any;
  autoData1:any
  companylist: any;
  customerlist: any;
  customerdata = [];
  constructor(private fb: FormBuilder, 
    private profitcenter: ProfitCenterService,
     private dialog: MatDialog, 
     private router: Router,
     private route: ActivatedRoute,
     private customerservice: CustomersService,
     private toasterService: ToastrService,) { }

  superForms: FormGroup = this.fb.group({

    country: [],
    company: [],
    name: ['']
  });

  displayedColumns: string[] = [
    // 'CId',
    'name',
    'country',
    'company',
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
  filterSearchCheching:boolean = false;

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
    this.superForms.get('country')?.valueChanges.subscribe(x1 => {
      this.autoData1 = this.countrieslist.filter((option1: any) => { return option1.name.toLowerCase().includes(x1.toLowerCase()) });
    })
    this.superForms.get('company')?.valueChanges.subscribe(x1 => {
      this.autoData = this.companylist.filter((option1: any) => { return option1.name.toLowerCase().includes(x1.toLowerCase()) });
    })
  }

  filterSearchforcustomers() {
    this.filterSearchCheching =true;
    const formData = JSON.parse(JSON.stringify(this.superForms.getRawValue()));
    if (formData.country == null || formData.country == "") {
      delete formData["country"];
    }else {
      let totalCompanies1 = this.countrieslist.filter((o: any) => o.name == formData["country"]);
      formData["country"] = totalCompanies1[0]['id'];
    }
    if (formData.company == null || formData.company == "") {
      delete formData["company"];
    }else{
        let totalCompanies = this.companylist.filter((o:any)=> o.name == formData["company"]);
        formData["company"] = totalCompanies[0]['id'];
    }
    if (formData.name == null || formData.name == "") {
      delete formData["name"];
    }
   
    
    let url = "paged=true" + "&page=" + this.pageIndex + "&size=" + this.pageSize +"&sortBy=" + this.sortColumn + "&sortDirection=" + this.sortDirection;
    this.customerservice.searchCustomer(url, formData).subscribe((data) => {

      if (data) {
        this.customerlist = data.content
        this.customerdata = data.totalElements
      }
      if (data.pageable) {
        this.totalResult = data.totalElements;
      }

    });
  }

  deleteCustomer(id: string) {
    //for popup 
    const dialogRef = this.dialog.open(DeletepopupConfirmComponent, { width: '400px' });
    dialogRef.afterClosed().subscribe((result) => {
      


      if (result) {
        this.customerservice.deleteCustomer(id).subscribe({
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
  getCompaniyList() {
    let url =""
    this.profitcenter.getCompanylist(url).subscribe((data) => {
      //console.log('testinggggggggg' + data);
      let x = JSON.stringify(data);
      this.companylist = data.content
    })
  }


  onPaginateChange(event: any) {

    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.router.navigateByUrl('/customer?pageSize='+this.pageSize+'&pageIndex='+this.pageIndex);
    if(this.filterSearchCheching){
      this.filterSearchforcustomers();
    }else{
    this.loadTable();
    }
  }

  loadTable() {
    let url = "?" + "paged=true" + "&page=" + this.pageIndex + "&size=" + this.pageSize +"&sortBy=" + this.sortColumn + "&sortDirection=" + this.sortDirection;

    this.customerservice.getCustomerslist(url).subscribe((data) => {
      this.customerlist = data.content;
      this.customerdata = data.totalElements;

      //pagination
      if (data.pageable) {
        this.totalResult = data.totalElements;
      }

    })
  }
  sortData(event: any): void {
    this.sortColumn = event.active;
    this.sortDirection = event.direction;
    if(this.filterSearchCheching){
      this.filterSearchforcustomers();
    }else{
    this.loadTable();
    }
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
