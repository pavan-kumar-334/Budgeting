import { DatePipe } from '@angular/common';
import { identifierName } from '@angular/compiler';
import { EventEmitter } from '@angular/core';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { RosterService } from '../roster.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectService } from '../project.service';
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-add-roaster',
  templateUrl: './add-roaster.component.html',
  styleUrls: ['./add-roaster.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],

})
export class AddRoasterComponent implements OnInit {
  getResourcenames: any[] = [];
  getProjectsIds: any[] = [];
  projectsNames: any;
  probabilitydata: any;
  roasterSearchDates1:any;
  searchEndDate1:any;
  autoData2: any;
  projectlist: any;
  numSelected: any;
  dataSource2 = new MatTableDataSource<any>();
  displayedColumns = [
    'project',
    'CId',
    'position',
    'weight',
    'symbol',
    'position',
    'weight',
    'symbol',
    'star',
  ];
  savedFormData: any;
  ProjectName1: any;
  
  superForms: FormGroup = this.fb.group({

    resourceId: [''],
    projectId: [''],
    startDate: [''],
    id: [''],
    endDate: [''],
    monday: [''],
    tuesday: [''],
    wednesday: [''],
    thursday: [''],
    friday: [''],
    saturday: [''],
    sunday: [''],
    probability: [''],
    resourceNames: [''],
    selectDate: [''],
    projectIds: [''],
  });
  dateChange: EventEmitter<MatDatepickerInputEvent<any>> = new EventEmitter();

  ELEMENT_DATA: any[] = [
    //{Projects: 'resource 1'},
  ];
  dataSource: any[] = [];
  allDays: any[] = [];
  columns: any[] = [];
  resourceTableHeaderdata: any[] = [];
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  dataSource1: any[] = [];

  dataTable: any[] = [];
  displayedColumns1: any;
  objId!: string;
  newResId: any;
  resourceMapData: any;
  constructor(
    private changeDetectorRefs: ChangeDetectorRef,private projectService: ProjectService,
    private router: Router, private roasterService: RosterService, private route: ActivatedRoute, private fb: FormBuilder, private datePipe: DatePipe) { }

    Resourcelist: MatTableDataSource<any> = new MatTableDataSource<any>();
  selection: SelectionModel<any> = new SelectionModel<any>(true, []);


  ngOnInit(): void {
    this.objId = this.route.snapshot.params['resourceId'];
    this.getProjectList();
    console.log("project-------------->", this.projectlist);
    this.getResourcByIDsAndStartDate(null);
    this.superForms.get('projectIds')?.valueChanges.subscribe(x1 => {
      this.autoData2 = this.projectlist.filter((option1: any) => { return option1.name.toLowerCase().includes(x1.toLowerCase()) });
    })
    
  }
  loadtable() {

  }

  // getAllDaysInMonth(year: number, month: number) {
  //   const date = new Date(year, month, 1);

  //   const dates = [];

  //   while (date.getMonth() === month) {
  //     console.log("date.getMonth()", date.getMonth())
  //     var d = date.getDate().toString().padStart(2, '0') + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getFullYear();
  //     dates.push(d);
  //     date.setDate(date.getDate() + 1);
  //   }

  //   return dates;
  // }

  deleteRoasterItem(row: any, item: any) {
    let index = this.dataSource1.findIndex(object => {
      return object.Resource === row;
    });

    this.dataSource1[index][item] = false;
  }
  deleteTotalRoaster(row: any) {
    let index = this.dataSource1.findIndex(object => {
      return object.Resource === row;
    });
    let objLabel = Object.keys(this.dataSource1[index]);
    for (let t = 0; t < objLabel.length; t++) {
      if (objLabel[t] != 'Resource' && objLabel[t] != 'Action') {
        this.dataSource1[index][objLabel[t]] = false;
      }
    }
  }
  getDayName(date: any) {
    let dateSplit = date.split("-");
    let d = new Date(dateSplit[2], dateSplit[1] - 1, dateSplit[0]);
    return this.days[d.getDay()];
  }
  setData(data: any) {
    localStorage.setItem('curDay', data);
  }




  getResourcByIDsAndStartDate(resourceStartDate: any) {
    this.columns = [];
    let userData: any;
    if (localStorage.getItem('roasterDates') !== null) {
      userData = localStorage.getItem('roasterDates');
      var test = JSON.parse(userData);
      //console.log(test['searchEndDate'])
    }
    var enddatesOfSearch1: any;
    if (test['searchEndDate'] == null && test['searchStartDate'] == null || (test['searchStartDate'] == "" && test['searchStartDate'] == "")) {
      let startDateSearch = '';

      this.roasterService.findbyResourceIDsandstartDate(this.objId, resourceStartDate, startDateSearch, enddatesOfSearch1).subscribe((data) => {
        this.dataTable = data
        this.savedFormData = data.roasterMap;
        this.resourceMapData = data.roasterMap;
        let tempObj: any = {};

        Object.keys(data.roasterMap).forEach((key) => {
          let tempArray: any = {};
          data.roasterMap[key].map((obj: any, i: any) => {
            tempArray[obj['roasterLineDate']] = { 'projectName': obj['projectName'], 'probability': obj['probability'], 'id': obj['id'], 'resourceId': obj['resourceId'] }
            this.probabilitydata = obj['probability']
            this.newResId = obj['resourceId'];
          })

          tempObj[key] = tempArray;
        });
        this.savedFormData = tempObj
        this.resourceTableHeaderdata = data.startDate
        this.getResourcenames = data.resourceNames
        for (let i = 0; i < this.getResourcenames.length; i++) {
          this.ELEMENT_DATA[i] = {
            Resource: this.getResourcenames[i]
          };
        }
        this.allDays = this.getDaysBetweenDates(new Date(data.startDate), new Date(data.endDate))
        for (let s = 0; s < this.ELEMENT_DATA.length; s++) {
          for (let d = 0; d < this.allDays.length; d++) {
            this.ELEMENT_DATA[s][this.allDays[d]] = false;
          }

        }
        Object.keys(this.ELEMENT_DATA[0]).map((data) => {
          let temp = {
            columnDef: data,
            header: data,
            cell: (element: any) => `${element[data]}`,
            cc: 1
          }

          this.columns.push(temp);
        })
        this.dataSource1 = [];
        this.dataSource1 = this.ELEMENT_DATA;
        this.displayedColumns1 = this.columns.map(c => c.columnDef);
      });
    } else {

      var startDateSearch: any
      this.searchEndDate1 = this.datePipe.transform(test['searchEndDate'], 'MM/dd/YYYY');
      this.roasterSearchDates1 = this.datePipe.transform(test['searchStartDate'], 'MM/dd/YYYY');
      if(this.searchEndDate1 == null){
        this.searchEndDate1 ='';
      }
      if(this.roasterSearchDates1 == null){
        this.roasterSearchDates1 ='';
      }
      
      this.roasterService.findbyResourceIDsandstartDate(this.objId, resourceStartDate, this.searchEndDate1, this.roasterSearchDates1).subscribe((data) => {
        this.dataTable = data
        this.savedFormData = data.roasterMap;
        this.resourceMapData = data.roasterMap;
        let tempObj: any = {};

        Object.keys(data.roasterMap).forEach((key) => {
          let tempArray: any = {};
          data.roasterMap[key].map((obj: any, i: any) => {
            tempArray[obj['roasterLineDate']] = { 'projectName': obj['projectName'], 'probability': obj['probability'], 'id': obj['id'], 'resourceId': obj['resourceId'] }
            this.probabilitydata = obj['probability']
            this.newResId = obj['resourceId'];
          })

          tempObj[key] = tempArray;
        });
        this.savedFormData = tempObj
        this.resourceTableHeaderdata = data.startDate
        this.getResourcenames = data.resourceNames
        for (let i = 0; i < this.getResourcenames.length; i++) {
          this.ELEMENT_DATA[i] = {
            Resource: this.getResourcenames[i]
          };
        }
        if(resourceStartDate == "" || resourceStartDate == null){
        this.allDays = this.getDaysBetweenDates(new Date(this.roasterSearchDates1), new Date(this.searchEndDate1))
        }else{
          this.allDays = this.getDaysBetweenDates(new Date(resourceStartDate), new Date(this.searchEndDate1))
        }
        for (let s = 0; s < this.ELEMENT_DATA.length; s++) {
          for (let d = 0; d < this.allDays.length; d++) {
            this.ELEMENT_DATA[s][this.allDays[d]] = false;
          }

        }
        Object.keys(this.ELEMENT_DATA[0]).map((data) => {
          let temp = {
            columnDef: data,
            header: data,
            cell: (element: any) => `${element[data]}`,
            cc: 1
          }

          this.columns.push(temp);
        })
        this.dataSource1 = [];
        this.dataSource1 = this.ELEMENT_DATA;
        this.displayedColumns1 = this.columns.map(c => c.columnDef);
      });

    }
  }





  getDaysBetweenDates(startDate: Date, endDate: Date) {
    const startDateFormat = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const endDateFormat = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
    const dates = [];
    while (startDateFormat <= endDateFormat) {
      var d = startDateFormat.getDate().toString().padStart(2, '0') + '-' + (startDateFormat.getMonth() + 1).toString().padStart(2, '0') + '-' + startDateFormat.getFullYear();
      dates.push(d);
      startDateFormat.setDate(startDateFormat.getDate() + 1);
    }
    return dates;
  }

  getProjectname(date: string, resourceName: string) {
    this.ProjectName1 = '';
    let d = date.split('-')
    if (new Date(d[1] + "/" + d[0] + "/" + d[2])) {
      let resourceDate = this.datePipe.transform(new Date(d[1] + "/" + d[0] + "/" + d[2]), 'MM/dd/YYYY');
      if (this.savedFormData[resourceName] !== '' &&
        typeof (this.savedFormData[resourceName]) !== 'undefined' && this.savedFormData[resourceName][resourceDate ?? ''] !== '' &&
        typeof (this.savedFormData[resourceName][resourceDate ?? '']) !== 'undefined') {
        this.ProjectName1 = this.savedFormData[resourceName][resourceDate ?? '']['projectName']
      }
    }

    //for trimming the project name

    if(this.ProjectName1 != '' && this.ProjectName1 != null){
let result = this.ProjectName1.substring(0, 3);
return result;
}
return '';
}

  getProbability(date: string, resourceName: string) {
    let probability = '';
    let d = date.split('-')
    if (new Date(d[1] + "/" + d[0] + "/" + d[2])) {
      let resourceDate = this.datePipe.transform(new Date(d[1] + "/" + d[0] + "/" + d[2]), 'MM/dd/YYYY');
      if (this.savedFormData[resourceName] !== '' &&
        typeof (this.savedFormData[resourceName]) !== 'undefined' && this.savedFormData[resourceName][resourceDate ?? ''] !== '' &&
        typeof (this.savedFormData[resourceName][resourceDate ?? '']) !== 'undefined') {
        probability = this.savedFormData[resourceName][resourceDate ?? '']['probability']
      }
    }

    return probability
  }

  handleEdit(date: string, resourceName: string, row: any) {
    localStorage.removeItem("BookDate")
    localStorage.setItem("BookDate", date);
    this.newResId = this.resourceMapData[resourceName][0]['resourceId'];
    let resR: any = JSON.stringify(this.savedFormData[resourceName]);
    let probability = '';
    let empty = '';
    let id = '';
    let d = date.split('-')

    if (empty == '' || empty == null || empty == "" || empty == undefined) {
      this.router.navigate([`/roster/book/edit/${this.savedFormData.resourceId}/${this.newResId}`])
    }
    empty = this.savedFormData['id']
    if (new Date(d[1] + "/" + d[0] + "/" + d[2])) {
      let resourceDate = this.datePipe.transform(new Date(d[1] + "/" + d[0] + "/" + d[2]), 'MM/dd/YYYY');
      console.log("Form Data==> " + JSON.stringify(this.savedFormData));

      this.savedFormData[resourceName][date]
      if (this.savedFormData[resourceName][resourceDate ?? ''] !== '' &&
        typeof (this.savedFormData[resourceName][resourceDate ?? '']) !== 'undefined') {
        id = this.savedFormData[resourceName][resourceDate ?? '']['id']
      }
      if (id == null || id == '') {
        id = '0';
      }

      this.router.navigate([`/roster/book/edit/${id}/${this.newResId}`])



    }


  }

  onDateChange(event: any): void {


    let startnew = new Date(event.target.value);
    let resourceStartDate = this.datePipe.transform(startnew, 'MM/dd/YYYY');

    this.getResourcByIDsAndStartDate(resourceStartDate);

    // this.roasterService.findbyResourceIDsandstartDates(this.objId,resourceStartDate).subscribe((data) => {
    //   this.dataTable = data
    //   this.savedFormData = data.roasterMap;
    //   this.resourceMapData = data.roasterMap;
    //   console.log(".......savedFormData...."+this.savedFormData )  
    // //  this.savedFormData.map((data:any)=>{console.log("savedformdata.."+data)})
    //   let tempObj: any = {};
    //   console.log("..roastermap.."+JSON.stringify(data.roasterMap))
    //   Object.keys(data.roasterMap).forEach((key) => {
    //     let tempArray: any = {};
    //     data.roasterMap[key].map((obj: any, i: any) => {
    //       tempArray[obj['roasterLineDate']] = { 'projectName': obj['projectName'], 'probability': obj['probability'], 'id': obj['id'], 'resourceId': obj['resourceId'] }
    //       this.probabilitydata = obj['probability']
    //       this.newResId=obj['resourceId'];
    //     })    

    //     tempObj[key] = tempArray;   
    //   });
    //   this.savedFormData = tempObj
    //   this.resourceTableHeaderdata = data.startDate
    //   this.getResourcenames = data.resourceNames
    //   for (let i = 0; i < this.getResourcenames.length; i++) {
    //     this.ELEMENT_DATA[i] = { Resource: this.getResourcenames[i]   

    //     };
    //     console.log("..this.ELEMENT_DATA[i].."+JSON.stringify(this.ELEMENT_DATA[i])) 
    //   }
    //   this.allDays = this.getDaysBetweenDates(new Date(data.startDate), new Date(data.endDate))
    //   console.log("..this.allDays.."+this.allDays) 
    //   for (let s = 0; s < this.ELEMENT_DATA.length; s++) {
    //      for (let d = 0; d < this.allDays.length; d++) {
    //       this.ELEMENT_DATA[s][this.allDays[d]] = false;

    //     }    
    //   }
    //   console.log("..this.ELEMENT_DATA.320...."+JSON.stringify(this.ELEMENT_DATA)) 
    //   Object.keys(this.ELEMENT_DATA[0]).map((data) => {

    //     let temp = {
    //       columnDef: data,
    //       header: data,
    //       cell: (element: any) => `${element[data]}`,
    //       cc:1
    //     }

    //     this.columns.push(temp);
    //   })
    //   this.dataSource1 = this.ELEMENT_DATA;
    //   console.log("..this.dataSource1 333...."+JSON.stringify(this.dataSource1))
    //   this.displayedColumns1 = this.columns.map(c => c.columnDef);
    // });

  }
  downloadFile(data: any) {
    const replacer = (key:any, value:any) => (value === null ? '' : value); // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    const csv = data.map((row:any) =>{
    return header.map((fieldName,index) => { 
      if(index > 0) { 
         this.getProjectname(fieldName, row.Resource);
         return this.ProjectName1;
      } else {
        return row.Resource
      }
    }).join(',');
       }
    );
    let headerData = header.map((data)=>{
        return data != 'Action' && data !=
              'Resource' ?  "\""+ data +'\n'  + this.getDayName(data)+"\"": data
    });
    csv.unshift(headerData.join(','));
    const csvArray = csv.join('\r\n');
    const a = document.createElement('a');
    const blob = new Blob([csvArray], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = 'myFile.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
  exportRoster(){
    var dataSource1 :any;
    this.downloadFile(this.dataSource1);
  }

  getProjectList() {
    let url = "paged=true"+ "&size=" + "2000";
    this.projectService.getProjectlist(url).subscribe((data) => {
      this.projectlist = data.content;
      console.log("project list", this.projectlist);
      let allData = {name:'All Projects'};
      this.projectlist.push(allData);
    });
}
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
  
 }

}
