import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CustomersService } from '../customers.service';
import { DeletepopupConfirmComponent } from '../deletepopup-confirm/deletepopup-confirm.component';
import { ProfitCenterService } from '../profit-center.service';
import { ProjectService } from '../project.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ResourceService } from '../resource.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  resourceList: any;
  companylist: any;
  customerlist: any;
  projectTypes: any;
  projectData: any;
  projectLoopData: any = [];
  projectLoopData2: any = [];
  profitcenterlist: any;
  projectlistTotal = [];
  superForms: FormGroup = this.fb.group({

    customerid: [],
    profitcentreid: [],
    type: [],
    name: [''],
    resources: [],
  });

  displayedColumns: string[] = [

    'name',
    'customer',
    'profitcentre',
    'type',
    'Actions'
  ];
  projectlist: MatTableDataSource<any> = new MatTableDataSource<any>();
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25];
  totalResult = 0;
  url: string = '';
  pageIndex = 0;
  sortDirection: string = 'DESC';
  sortColumn: string = 'auditSection.createdDate';
  pageEvent!: PageEvent;
  autoData: any;
  autoData1: any;
  autoData2: any;
  filterSearchCheching:boolean = false;

  constructor(
    private customerService: CustomersService,
    private toasterService: ToastrService,
    private fb: FormBuilder,
    private profitcenter: ProfitCenterService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private resourceService: ResourceService,
    private projectservice: ProjectService) { }

 

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if(params.pageSize){
        this.pageSize=params.pageSize;
      }else{
        this.pageSize=10;
      }
       if (params.pageSize) {
        this.pageIndex=params.pageIndex;
        
      } else {
        this.pageIndex=0;
      }
    })
    this.getResourceList();
    this.getProfitCenterList();
    this.getCustomerList();
    this.getProjectTypeList();
    this.loadTable();
    this.superForms.get('resources')?.valueChanges.subscribe(x => {

      this.autoData = this.resourceList.filter((option: any) => { return option.name.toLowerCase().includes(x.toLowerCase()) });
    })


    this.superForms.get('profitcentreid')?.valueChanges.subscribe(x1 => {
      this.autoData1 = this.profitcenterlist.filter((option1: any) => { return option1.name.toLowerCase().includes(x1.toLowerCase()) });
    })
    this.superForms.get('customerid')?.valueChanges.subscribe(x1 => {
      this.autoData2 = this.customerlist.filter((option1: any) => { return option1.name.toLowerCase().includes(x1.toLowerCase()) });
    })
  }

  getResourceList() {
    let url = "paged=true" + "&size=" + "2000";
    this.resourceService.getResourcelist(url).subscribe((data) => {
      if (data) {
        this.resourceList = data.content;
        // this.countrieslist=data;

      }
      this.getCustomerList();  
    })
  }
  onPaginateChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.router.navigateByUrl('/project?pageSize='+this.pageSize+'&pageIndex='+this.pageIndex);
    if(this.filterSearchCheching){
      this.filterSearchforProject();
    }else{
    this.loadTable();
    }
  }
  sortData(event: any): void {
    this.sortColumn = event.active;
    this.sortDirection = event.direction;
    if(this.filterSearchCheching){
      this.filterSearchforProject();
    }else{
    this.loadTable();
    }
  }


  getCompaniyList() {
    let url = ""
    this.profitcenter.getCompanylist(url).subscribe((data) => {
      let x = JSON.stringify(data);
      this.companylist = data.content
    })
  }
  getCustomerList() {
    let url = "";
    this.customerService.getCustomerslist(url).subscribe((data) => {
      let x = JSON.stringify(data);
      this.customerlist = data.content
    })
    this.getProfitCenterList();
  }


  getProfitCenterList() {
    let url = "paged=true";
    this.profitcenter.getProfitCenterlist(url).subscribe((data) => {
      this.profitcenterlist = data.content;
      this.route.queryParams
      .subscribe(params => {
        if(Object.keys(params).length > 0){
        this.superForms.get('profitcentreid')?.setValue(params['profitcentreid']);
        this.superForms.get('customerid')?.setValue(params['customerid']);
        this.superForms.get('name')?.setValue(params['name']);
        this.superForms.get('type')?.setValue(params['type']);
        this.superForms.get('resource')?.setValue(params['resource']);
        let totalCompanies = this.profitcenterlist.filter((o: any) => o.id == params['profitcentreid']);
          this.superForms.get('profitcentreid')?.setValue(totalCompanies[0] != undefined ? totalCompanies[0]['name'] : '');
          totalCompanies = this.customerlist.filter((o: any) => o.id == params['customerid']);
          this.superForms.get('customerid')?.setValue(totalCompanies[0] != undefined ? totalCompanies[0]['name'] : '');
          totalCompanies = this.resourceList.filter((o: any) => o.id == params['resource']);
          this.superForms.get('resource')?.setValue(totalCompanies[0] != undefined ? totalCompanies[0]['name'] : '');
          
        if(params['profitcentreid'] !== '' ||  params['customerid'] !== '' || params['name'] !== '' || params['resource'] !== ''){
          this.filterSearchforProject();
        }
        }
    })
  })

}

  deleteProject(data: any) {

    const dialogRef = this.dialog.open(DeletepopupConfirmComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {

      if (result) {
        this.projectservice.deleteProject(data).subscribe({
          next: (data) => {

            this.loadTable();
            this.toasterService.success(
              data.message
            );

          },
          error: (err: any) => {
            this.toasterService.error(err.error.message);
          }
        });
      }

    });

  }


  filterSearchforProject() {
    this.filterSearchCheching = true;
    const formData = JSON.parse(JSON.stringify(this.superForms.getRawValue()));
    if (formData.profitcentreid == null || formData.profitcentreid == "") {
      delete formData["profitcentreid"];
    } else {
      let totalCompanies = this.profitcenterlist.filter((o: any) => o.name == formData["profitcentreid"]);
      formData["profitcentreid"] = totalCompanies[0]['id'];
    }
    if (formData.customerid == null || formData.customerid == "") {
      delete formData["customerid"];
    } else {
      let totalCompanies2 = this.customerlist.filter((o: any) => o.name == formData["customerid"]);
      formData["customerid"] = totalCompanies2[0]['id'];
    }
    if (formData.name == null || formData.name == "") {
      delete formData["name"];
    }
    if (formData.type == null || formData.type == "") {
      delete formData["type"];
    }
    if (formData.resources == null || formData.resources == "") {
      delete formData["resources"];
    } else {
      let totalCompanies1 = this.resourceList.filter((o: any) => o.name == formData["resources"]);
      formData["resources"] = [totalCompanies1[0]['resourceId']];
    }
    formData['profitcentreid'] = formData['profitcentreid'];
    formData['customerid'] = formData['customerid'];
    formData['name'] = formData['name'];
    formData['type'] = formData['type'];
    formData['resources'] = formData['resources'];
    if(formData.profitcentreid !== '' || formData.customerid !== '' || formData.name !== '' || formData.type !== '' || formData.resources !== ''){
      const extras: NavigationExtras = {
        relativeTo: this.route,
        queryParams: { profitcentreid: formData.profitcentreid,customerid:formData.customerid,name:formData.name,type:formData.type,resources:formData.resources},
        queryParamsHandling: 'merge'
      };
      this.router.navigate([], extras).then(() => { });
    }
    let url = "paged=true" + "&page=" + this.pageIndex + "&size=" + this.pageSize + "&sortBy=" + this.sortColumn + "&sortDirection=" + this.sortDirection;
    this.projectservice.searchProject(url, formData).subscribe((data) => {
      if (data) {
        this.projectlist = data.content;
        this.projectlistTotal = data.totalElements;
      }
      if (data.pageable) {
        this.totalResult = data.totalElements;
      }
    });
  }

  loadTable() {

    let url = "paged=true" + "&page=" + this.pageIndex + "&size=" + this.pageSize + "&sortBy=" + this.sortColumn + "&sortDirection=" + this.sortDirection;
    this.projectservice.getProjectlist(url).subscribe((data) => {
      this.projectlistTotal = data.totalElements
      this.projectlist = data.content;
      this.projectData = data.content;

      for (let i = 0; i < this.projectData.length; i++) {
        this.projectLoopData[i] = this.projectData[i].projectResources;
      }
      this.projectLoopData2 = this.projectLoopData

      for (let j = 0; j < this.projectLoopData.length; j++) {
        this.projectLoopData2[j] = this.projectLoopData[j]
      }
      let dataaa = this.projectLoopData2
      if (data.pageable) {
        this.totalResult = data.totalElements;
      }
    });
  }
  getProjectTypeList() {
    this.projectservice.getProjectTypes().subscribe((data) => {
      this.projectTypes = data;
    })
  }
  returnOrder() {

    return 1;

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
