import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../company.service';
import { DeletepopupConfirmComponent } from '../deletepopup-confirm/deletepopup-confirm.component';
import { browserRefresh } from '../app.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
})
export class CompanyListComponent implements OnInit {
  GaData = [];
  textClear: boolean = false;
  displayedColumns: string[] = [
    // 'CId',
    // 'id',
    'name',
    'groupId',
    'countryId',
    'currencyCode',
    //  'createdDate',
    //'lastModifiedDate',
    'Actions',
  ];
  companiesData: MatTableDataSource<any> = new MatTableDataSource<any>();
  list: any;
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
  filterSearchCheching: boolean = false;
  autoData: any;
  autoData1: any;
  superForms: FormGroup = this.fb.group({
    countryId: [],
    groupId: [],
    name: [''],
  });

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private toasterService: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (params.pageSize) {
        this.pageSize = params.pageSize;
      } else {
        this.pageSize = 10;
      }
      if (params.pageIndex) {
        this.pageIndex = params.pageIndex;
      } else {
        this.pageIndex = 0;
      }
    });
    this.getCountries();
    this.getGroups();
    this.loadTable();

    this.superForms.get('groupId')?.valueChanges.subscribe((x) => {
      this.autoData = this.groupslist.filter((option: any) => {
        return option.name.toLowerCase().includes(x.toLowerCase());
      });
    });

    this.superForms.get('countryId')?.valueChanges.subscribe((x1) => {
      this.autoData1 = this.countrieslist.filter((option1: any) => {
        return option1.name.toLowerCase().includes(x1.toLowerCase());
      });
    });

    this.browserRefresh = browserRefresh;
  }
  onPaginateChange(event: any) {
    console.log('PPPPPPPPPPPPAAAAAAAAAAAAAGGGGGGGEEEEEEE ', event);
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    // this.router.navigateByUrl(
    //   '/company?pageSize=' + this.pageSize + '&pageIndex=' + this.pageIndex
    // );
    if (this.filterSearchCheching) {
      this.filterSearchforcompany();
    } else {
      this.loadTable();
    }
  }
  sortData(event: any): void {
    console.log('SSSSOOOORRRRTTT', event);
    this.sortColumn = event.active;
    this.sortDirection = event.direction;
    if (this.filterSearchCheching) {
      this.filterSearchforcompany();
    } else {
      this.loadTable();
    }
  }
  //ffffffffffffffffffffffgggggggg
  // hghghgfhgfg
  loadTable(): void {
    //localhost:8080/v1/company?paged=true&page=0&size=25&sortBy=auditSection.createdDate&sortDirection=DESC
    let url =
      '?' +
      'paged=true' +
      '&page=' +
      this.pageIndex +
      '&size=' +
      this.pageSize +
      '&sortBy=' +
      this.sortColumn +
      '&sortDirection=' +
      this.sortDirection;

    this.companyService.getcompanylist(url).subscribe((data) => {
      if (data.content) {
        this.companydata = data.content;
        this.companiesData.data = data.content;
        this.GaData = data.totalElements;
      }
      if (data.pageable) {
        this.totalResult = data.totalElements;
      }
    });
  }
  //addCompany
  // deleteCompany(id: string): void {
  //   this.companyService.deleteCompany(id).subscribe((data) => {
  //     this.toasterService.success(
  //       data.data[0].message,
  //       'Deleted Success'
  //     ); 
  //     console.log("dataaa.." + data)
  //     this.loadTable();
  //   })deleteCompany
  // }
  // clearByclick(){
  //     this.loadTable();
  //    //this.filterSearchforcompany();
  // }

  deleteCompany(id: string): void {
    // const dialogRef = this._matDialog.open(ConfirmDialogComponent,
    //   {width: '400px', data: new ConfirmDialogModel('',  'Are you sure you want to delete the customer?', 'Yes, Delete', 'Cancel', 'info')
    // });
    //this.companyService.deleteCompany(id).subscribe((data) => {
    const dialogRef = this.dialog.open(DeletepopupConfirmComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.companyService.deleteCompany(id).subscribe({
          next: (data) => {
            this.loadTable();
            //toast success error
            this.toasterService.success(data.message, 'Deleted Success');
            this.loadTable();
          },
          error: (err: any) => {
            this.toasterService.error(err.error.message);
          },
        });
      }
    });

    // }//
    //});
  }

  filterSearchforcompany() {
    this.filterSearchCheching = true;
    const formData = JSON.parse(JSON.stringify(this.superForms.getRawValue()));
    if (formData.countryId == null || formData.countryId == '') {
      delete formData['countryId'];
    } else {
      let totalCompanies1 = this.countrieslist.filter(
        (o: any) => o.name == formData['countryId']
      );
      formData['countryId'] = totalCompanies1[0]['id'];
    }
    if (formData.groupId == null || formData.groupId == '') {
      delete formData['groupId'];
    } else {
      let totalCompanies = this.groupslist.filter(
        (o: any) => o.name == formData['groupId']
      );
      formData['groupId'] = totalCompanies[0]['id'];
    }
    if (formData.name == null) {
      delete formData['name'];
    }

    let url =
      'paged=true' +
      '&page=' +
      this.pageIndex +
      '&size=' +
      this.pageSize +
      '&sortBy=' +
      this.sortColumn +
      '&sortDirection=' +
      this.sortDirection;
    this.companyService.searchCompany(url, formData).subscribe((data) => {
      if (data) {
        this.list = JSON.stringify(data);
        this.companiesData = data.content;
        this.GaData = data.totalElements;
      }
      if (data.pageable) {
        this.totalResult = data.totalElements;
      }
    });
  }
  getCountries() {
    this.companyService.getCountrylist().subscribe((data) => {
      if (data) {
        this.countrieslist = data;
        // this.countrieslist=data;
      }
    });
  }

  getGroups() {
    this.companyService.getGrouplist().subscribe((data) => {
      if (data) {
        this.groupslist = data.content;
        // this.countrieslist=data;
      }
    });
  }

  clearByclick() {
    let sdata = document.querySelector('[id="searchid"]') as HTMLInputElement;
    sdata.value = '';

    //  this.loadTable();

    this.filterSearchforcompany();
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
