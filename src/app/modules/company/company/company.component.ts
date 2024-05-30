//import { Component, OnInit } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
//import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  CaData = [];  
  displayedColumns: string[] = ['CId','CAccountName',  'CDescription', 'CView','CEdit','CDelete'];
  CompanyData: MatTableDataSource<any> = new MatTableDataSource<any>();
 //  pageSize = 10;
 //  pageSizeOptions: number[] = [5, 10, 25];
   totalResult = 0;
   url: string = '';
 //  pageIndex = 0;
   sortDirection: string = 'DESC'
   sortColumn: string = 'auditSection.createdDate'

  constructor() { }

  ngOnInit(): void {
    this.loadTable();
  }
  onPaginateChange(event:any) {
 
 }
 sortData(event:any): void {
    
 }
 loadTable(): void {

 }
 deleteCustomer(id:string):void {

 }
}
