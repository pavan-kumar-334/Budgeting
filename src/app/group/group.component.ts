import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GroupService } from '../group.service';
//import { ConfirmDialogComponent, ConfirmDialogModel } from '../../shared/dialogs/confirm-dialog/confirm-dialog.component';
//import { LoaderService } from '../../_helpers/loader.service';
import { ToastrService } from 'ngx-toastr';
import { DeletepopupConfirmComponent } from '../deletepopup-confirm/deletepopup-confirm.component';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  
  value = '';
  GaData = [];
  displayedColumns: string[] = [
    //'checkbox',
    // 'GroupId',
    'name',
    'description',
    //'createdDate',
    //'lastModifiedDate',
    'actions',
  ];
  GData: MatTableDataSource<any> = new MatTableDataSource<any>();
  list: any;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25];
  totalResult = 0;
  url: string = '';
  pageIndex = 0;
  sortDirection: string = 'DESC';
  sortColumn: string = '';
  pageEvent!: PageEvent;
  companyService: any;
  sdata: any;
  searchKeyword = '';

  constructor(
    private groupService: GroupService,
    private toasterService: ToastrService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) //  private loadingService: LoaderService
  { }

  superForms: FormGroup = this.fb.group({
    search: ['']
  });
  filterSearchChecking:boolean = false;


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

    this.loadTable();
    //this.clearByclick();
  }

  onPaginateChange(event: any) {

    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.router.navigateByUrl('/group?pageSize='+this.pageSize+'&pageIndex='+this.pageIndex);
    this.loadTable();
  }

  sortData(event: any): void {
    this.sortColumn = event.active;
    this.sortDirection = event.direction;
    this.loadTable();
  }

  searchByApi(e: any) {

    this.filterSearchChecking = true;
    let url;
    if (e.target.value) {
      url = e.target.value + "?" + "paged=true" + "&page=" + this.pageIndex + "&size=" + this.pageSize +"&sortBy=" + this.sortColumn + "&sortDirection=" + this.sortDirection ;

    } else {
      const sdata = document.querySelector('[id="searchid"]') as HTMLInputElement;
      console.log("OOOOBBBBBBBB", sdata)

      url = sdata.value + "?" + "paged=true" + "&page=" + this.pageIndex + "&size=" + this.pageSize +"&sortBy=" + this.sortColumn + "&sortDirection=" + this.sortDirection ;

    }
    this.groupService.SearchGroup(url).subscribe((data) => {
      if (data) {
        this.list = JSON.stringify(data);
        this.GData = data.content;
        this.GaData = data.totalElements
        //console.log('this.GData..' + this.GData);
      }
      if (data.pageable) {
        this.totalResult = data.totalElements;
      }
    });
  }

  loadTable(): void {
    let url = "?" + "paged=true" + "&page=" + this.pageIndex + "&size=" + this.pageSize+"&sortBy=" +this.sortColumn+"&sortDirection="+this.sortDirection;
    this.groupService.getGrouplist(url).subscribe((data) => {
     // console.log('data..' + JSON.stringify(data));
      if (data) {
        this.list = JSON.stringify(data);
        this.GaData = data.totalElements

        this.GData.data = data.content;
       // console.log('this.GData..' + this.GData);
      }
      if (data.pageable) {
        this.totalResult = data.totalElements;
      }

    });
  }
  deleteGroup(id: string): void {
    const dialogRef = this.dialog.open(DeletepopupConfirmComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.groupService.deleteGroup(id).subscribe({
          next: (data) => {

            this.loadTable();
            this.toasterService.success(
              data.message,
              'Deleted Success'
            );
            this.loadTable();
          },
          error: (err: any) => {
            this.toasterService.error(err.error.message);
          },
        });
      }
    });

  }
  editclick() { }

  clearByclick() {

    this.value=''
    let sdata = document.querySelector('[id="searchid"]') as HTMLInputElement;
    sdata.value = '';

    this.searchByApi(event);

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

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'delete-confirmation.html',
})
export class DeleteConfirmationDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
}


