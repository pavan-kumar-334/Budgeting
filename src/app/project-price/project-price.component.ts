import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomersService } from '../customers.service';
import { DeletepopupConfirmComponent } from '../deletepopup-confirm/deletepopup-confirm.component';
import { ProfitCenterService } from '../profit-center.service';
import { ProjectPricingService } from '../project-pricing.service';
import { ProjectService } from '../project.service';
import { ResourceService } from '../resource.service';

@Component({
  selector: 'app-project-price',
  templateUrl: './project-price.component.html',
  styleUrls: ['./project-price.component.scss']
})
export class ProjectPriceComponent implements OnInit {
  superForms: FormGroup = this.fb.group({

    customerid: [],
    profitcentreid: [],
    type: [],
    name: [],
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
  autoData3: any;
  resourceList: any;
  companylist: any;
  customerlist: any;
  project: any;
  projectTypes: any;
  projectData: any;
  typedataList: any = [];
  projectLoopData: any = [];
  projectLoopData2: any = [];
  profitcenterlist: any;
  projectlistTotal = [];

  constructor(
    private customerService: CustomersService,
    private toasterService: ToastrService,
    private fb: FormBuilder,
    private profitcenter: ProfitCenterService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private resourceService: ResourceService,
    private projectservice: ProjectService,
    private router: Router,
    private pricingService:ProjectPricingService) { }

  //   ngOnInit(): void {
  //     this.superForms.get('resources')?.valueChanges.subscribe(x => {

  //       this.autoData = this.resourceList.filter((option: any) => { return option.name.toLowerCase().includes(x.toLowerCase()) });
  //     })


  //     this.superForms.get('profitcentreid')?.valueChanges.subscribe(x1 => {
  //       this.autoData1 = this.profitcenterlist.filter((option1: any) => { return option1.name.toLowerCase().includes(x1.toLowerCase()) });
  //     })
  //     this.superForms.get('customerid')?.valueChanges.subscribe(x1 => {
  //       this.autoData2 = this.customerlist.filter((option1: any) => { return option1.name.toLowerCase().includes(x1.toLowerCase()) });
  //     })
  //   }
  //   getPriceFormTable1(){

  //   }
  //   returnOrder() {

  //     return 1;

  //   }
  //   getPriceFormTable() {

  //     let initData = this.fb.group({
  //       resources:[''],
  //       sellPrice: [''],
  //       // partyName: [''],
  //       sellCurrency: [''],
  //       trasferPrice: [''],
  //       transferCurrency: [''],
  //       effectiveDate: [''],
  //     });
  //     (<FormArray>this.superFormsdata.get('projectResources')).push(initData);
  //   }
  //   get projectResources(): FormArray {
  //     return this.superFormsdata.get("projectResources") as FormArray
  //   }

  // }
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
    this.getProjectList();
    this.getResourceList();
    this.getProfitCenterList();
    this.getCustomerList();
    this.getProjectTypeList();
    this.loadTable();
    this.superForms.get('name')?.valueChanges.subscribe(P => {
      this.autoData3 = this.project.filter((project: any) => {return project.name.toLowerCase().includes(P.toLowerCase())});
    })
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
    })
  }
  onPaginateChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadTable();
    this.router.navigateByUrl('/projectPrice?pageSize='+this.pageSize+'&pageIndex='+this.pageIndex);
  }
  sortData(event: any): void {
    this.sortColumn = event.active;
    this.sortDirection = event.direction;
    this.loadTable();
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
  }


  getProfitCenterList() {
    let url = "paged=true";
    this.profitcenter.getProfitCenterlist(url).subscribe((data) => {
      this.profitcenterlist = data.content;


    })

  }

  deleteProject(data: any,type:any) {

    const dialogRef = this.dialog.open(DeletepopupConfirmComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {

      if (result) {
        this.pricingService.deleteProjectPricingType(data,type).subscribe({
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
    let url = "paged=true" + "&page=" + this.pageIndex + "&size=" + this.pageSize;
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
  navigateURL(event:any, e:any) {
    // for (let i = 0; i < this.projectData.length; i++) {
    //   this.typedataList[i] = this.projectData[i].type;
    // }
    if (event == "T&M" || event == "TANDM") {
      this.router.navigate([`/projectPrice/update/${e}`]);
    } else {
      this.router.navigate([`/projectPrice/edit/${e}/${event}`]);
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
  getProjectList() {

    let url = "paged=true"+ "&size=" + "2000";
      this.projectservice.getProjectlist(url).subscribe((data) => {
      this.project = data.content;
      let allData = {name:'All Projects'};
      this.project.push(allData);
    });
  } 

}
