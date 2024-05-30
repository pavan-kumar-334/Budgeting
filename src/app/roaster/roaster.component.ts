import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CostCenterService } from '../cost-center.service';
import { ProjectService } from '../project.service';
import { ResourceService } from '../resource.service';
import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-roaster',
  templateUrl: './roaster.component.html',
  styleUrls: ['./roaster.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoasterComponent implements OnInit {
  costCenterlist: any;
  resourceList: any;
  projectlist: any;
  numSelected: any;
  resourceprojectlist = [];
  ResourceTotalCount = [];
  projects: any = [];
  filterArray: any = [];
  count = 0
  superForms: FormGroup = this.fb.group({

    costCentreIds: [],
    resourcesIds: [],
    projectIds: [],
    //startDate:[]
    // name: ['']

  });
  searchForm: FormGroup = this.fb.group({
    searchEndDate: [''],
    searchStartDate: ['']
  })


  // 


  urlParams: any = [];
  allComplete: boolean = false;

  displayedColumns: string[] = [
    'select',
    'resourcesIds',
    'Actions',
  ];

  Resourcelist: MatTableDataSource<any> = new MatTableDataSource<any>();
  selection: SelectionModel<any> = new SelectionModel<any>(true, []);



  profitcenterlist: any[] = [];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25];
  totalResult = 0;
  url: string = '';
  pageIndex = 0;
  sortDirection: string = 'DESC';
  sortColumn: string = 'auditSection.createdDate';
  pageEvent!: PageEvent;
  r: any;
  autoData: any;
  autoData1: any;
  autoData2: any;

  constructor(private fb: FormBuilder,
    private resourceService: ResourceService,
    private costCenterService: CostCenterService,
    private projectService: ProjectService,
    private resourceservice: ResourceService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {

    this.getResourceList();
    // this.getCostCenterList();
     //this.getProjectList();
    this.loadTable();
    this.superForms.get('resourcesIds')?.valueChanges.subscribe(x => {

      this.autoData = this.resourceList.filter((option: any) => { return option.name.toLowerCase().includes(x.toLowerCase()) });
    })


    this.superForms.get('costCentreIds')?.valueChanges.subscribe(x1 => {
      this.autoData1 = this.costCenterlist.filter((option1: any) => { return option1.name.toLowerCase().includes(x1.toLowerCase()) });
    })
    this.superForms.get('projectIds')?.valueChanges.subscribe(x1 => {
      this.autoData2 = this.projectlist.filter((option1: any) => { return option1.name.toLowerCase().includes(x1.toLowerCase()) });
    })

  }

  deleteRoaster(id: any) {

  }
  onPaginateChange(e: any) {

  }

  getResourceList() {

    let url = "paged=true" + "&size=" + "2000";
    this.resourceService.getResourcelist(url).subscribe((data) => {
      if (data) {
        this.resourceList = data.content;
        // this.resourceprojectlist=data.content.filter((object:any)=>{} )
        // this.countrieslist=data;
        this.getCostCenterList();
      }
    })
  }

  getCostCenterList() {
    let url = "paged=true"+ "&size=" + "2000";
    this.costCenterService.getCostCenterlist(url).subscribe((data) => {
      this.costCenterlist = data.content;
      this.getProjectList();
    })
  }
  selectdropdown(e: any) {

    this.resourceprojectlist = this.resourceList.filter((object: any) => {
      return this.superForms.get('resourcesIds')?.value.includes(object.resourceId);

    }).map((data: any) => {

      return data.projects;
    });


    this.resourceprojectlist.map((key: any, i) => {
      for (let j = 0; j < key.length; j++) {
        this.projects[i] = key[j];
        i++
      }
    });

    this.projects.map((key: any) => {
      if (this.filterArray.length == 0) {
        this.filterArray[0] = key;
      } else {
        for (let j = 1; j <= this.filterArray.length; j++) {
          if (key.id != this.filterArray[j].id) {
            this.filterArray[j] = key;
          }
        }
      }
    })
  }

  getProjectList() {
    let url = "paged=true"+ "&size=" + "2000";
    this.projectService.getProjectlist(url).subscribe((data) => {
      this.projectlist = data.content;
      let allData = {name:'All Projects'};
      this.projectlist.push(allData);
      this.route.queryParams
      .subscribe(params => {
        if(Object.keys(params).length > 0){
          this.superForms.get('resourceId')?.setValue(params['resourceId']);
          this.superForms.get('projectId')?.setValue(params['projectId']);
          this.superForms.get('costCentreId')?.setValue(params['costCentreId']);
          let totalCompanies = this.projectlist.filter((o: any) => o.id == params['projectId']);
          this.superForms.get('projectIds')?.setValue(totalCompanies[0] != undefined ? totalCompanies[0]['name'] : '');
          totalCompanies = this.costCenterlist.filter((o: any) => o.id == params['costCentreId'] );
          this.superForms.get('costCentreIds')?.setValue(totalCompanies[0] != undefined ? totalCompanies[0]['name'] : '');
          totalCompanies = this.resourceList.filter((o: any) => o.resourceId == params['resourceId'] );
          this.superForms.get('resourcesIds')?.setValue(totalCompanies[0] != undefined ? totalCompanies[0]['name']: '');
          if(params['resourceId'] !== '' ||  params['projectId'] !== '' || params['costCentreId'] !== ''){
            this.filterSearchforRoaster();
          }
        }

    })
  });
}
  sortData(event: any): void {
    this.sortColumn = event.active;
    this.sortDirection = event.direction;
    this.loadTable();
  }

  loadTable(): void {
    //this.loadingService.setLoading(true);
    localStorage.removeItem('roasterDates')
    const formData = JSON.parse(JSON.stringify(this.superForms.getRawValue()));
    if (formData.resourcesIds == null || formData.resourcesIds == "") {
      formData["resourcesIds"] = [
        0
      ];
    }
    if (formData.costCentreIds == null || formData.costCentreIds == "") {
      formData["costCentreIds"] = [0]
    }
    if (formData.projectIds == null || formData.projectIds == "") {
      formData["projectIds"] = [0]
    }
    if (formData.startDate == null || formData.startDate == "") {
      delete formData["startDate"];
    }
    let url = "paged=true" + "&page=" + this.pageIndex + "&size=" + this.pageSize + "&sortBy=" + this.sortColumn + "&sortDirection=" + this.sortDirection;
    this.resourceservice.roasterSearchCriteria(url, formData).subscribe((data) => {
      if (data) {
        this.ResourceTotalCount = data.totalElements
        this.Resourcelist.data = data;
      }
      if (data.pagination) {
        this.totalResult = data.pagination.totalElements;
      }
    });

  }
  //Resourcelist



  isAllSelected() {


    this.numSelected = this.selection.selected.length;
    // console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj' + this.count++)
    const numRows = this.Resourcelist.data.length;

    return this.numSelected === numRows;

  }

  masterToggle() {

    this.isAllSelected()

      ? this.selection.clear()

      : this.Resourcelist.data.forEach((row) => this.selection.select(row));

  }
  bulkViewRoster() {
    const formData = JSON.parse(JSON.stringify(this.searchForm.getRawValue()));
    formData.searchEndDate = this.datePipe.transform(this.searchForm.value.searchEndDate, 'MM/dd/YYYY');
    formData.searchStartDate = this.datePipe.transform(this.searchForm.value.searchStartDate, 'MM/dd/YYYY');

    localStorage.setItem('roasterDates',JSON.stringify(this.searchForm.getRawValue()))
    for (let i = 0; i < this.selection.selected.length; i++) {
      // this.urlParams = this.selection.selected[i].id
      // this.urlParams=this.selection.selected[i].id;
      this.urlParams.push(this.selection.selected[i].resourceId)
      this.router.navigate([`/roster/edit/${this.urlParams}`])
    }
  }
  eyeEdit(){
    const formData = JSON.parse(JSON.stringify(this.searchForm.getRawValue()));
    formData.searchEndDate = this.datePipe.transform(this.searchForm.value.searchEndDate, 'MM/dd/YYYY');
    formData.searchStartDate = this.datePipe.transform(this.searchForm.value.searchStartDate, 'MM/dd/YYYY');

    localStorage.setItem('roasterDates',JSON.stringify(this.searchForm.getRawValue()));
    for (let i = 0; i < this.selection.selected.length; i++) {
      // this.urlParams = this.selection.selected[i].id
      // this.urlParams=this.selection.selected[i].id;
      this.urlParams.push(this.selection.selected[i].resourceId)
      this.router.navigate([`/roster/edit/${this.urlParams}`])
    }
  }


  filterSearchforRoaster() {
    // let resourceStartDate =  this.datePipe.transform(this.superForms.value.startDate, 'MM/dd/YYYY');
    // const newObj={
    //   "startDate":resourceStartDate,
    // } 
    // this.superForms.patchValue(newObj);
    const formData = JSON.parse(JSON.stringify(this.superForms.getRawValue()));
    formData.startDate = this.datePipe.transform(this.superForms.value.startDate, 'MM/dd/YYYY');
    if (formData.resourcesIds == null || formData.resourcesIds == "") {
      delete formData["resourcesIds"];
    }
    else {
      let totalCompanies = this.resourceList.filter((o: any) => o.name == formData["resourcesIds"]);
      formData["resourcesIds"] = [totalCompanies[0]['resourceId']];
    }
    if (formData.costCentreIds == null || formData.costCentreIds == "") {
      delete formData["costCentreIds"];
    } else {
      let totalCompanies = this.costCenterlist.filter((o: any) => o.name == formData["costCentreIds"]);
      formData["costCentreIds"] = [totalCompanies[0]['id']];
    }
    if (formData.projectIds == null || formData.projectIds == "") {
      delete formData["projectIds"];
    } else {
      let totalCompanies = this.projectlist.filter((o: any) => o.name == formData["projectIds"]);
      formData["projectIds"] = [totalCompanies[0]['id']];
    }
    if (formData.startDate == null || formData.startDate == "") {
      delete formData["startDate"];
    }
    var projectId = formData.projectIds != undefined ? formData.projectIds[0] : '';
    var resourceId = formData.resourcesIds != undefined ? formData.resourcesIds[0] : '';
    var costCentreId = formData.costCentreIds != undefined ? formData.costCentreIds[0] : '';
      if(projectId != '' || resourceId != '' || costCentreId != ''){
        const extras: NavigationExtras = {
          relativeTo: this.route,
          queryParams: {projectId: projectId,resourceId:resourceId,costCentreId:costCentreId},
          queryParamsHandling: 'merge'
        };
        this.router.navigate([], extras).then(() => { });
  }
    //const formValues =formData.value;

    let url = "paged=true" + "&page=" + this.pageIndex + "&size=" + this.pageSize + "&sortBy=" + this.sortColumn + "&sortDirection=" + this.sortDirection;;
    this.resourceservice.roasterSearchCriteria(url, formData).subscribe((data) => {
      if (data) {
        this.ResourceTotalCount = data.totalElements
        this.Resourcelist.data = data;
        // console.log('this.GDataaaaaaaaaaaaaaaaaaaaaaaaaaaaa..' + this.Resourcelist);
      }
      if (data.pagination) {
        this.totalResult = data.pagination.totalElements;
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

