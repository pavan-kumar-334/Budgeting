import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { ResourceService } from '../resource.service';
import { RosterService } from '../roster.service';
//import { MAT_DATE_FORMATS } from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { LoaderService } from 'src/app/modules/_helpers/loader.service';

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
  selector: 'app-add-edit-book-roster',
  templateUrl: './add-edit-book-roster.component.html',
  styleUrls: ['./add-edit-book-roster.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
 
})
export class AddEditBookRosterComponent implements OnInit {
  resourceList: any;
  projectlist: any;
  currentId: any;
  objId!: string;
  getformData: any;
  resourceId:number=0;
  getDate:any;
  getDate1:any;
  displayBasedOnId:boolean=false;

  bookForm: FormGroup = this.fb.group({
    resourceId: [''],
    projectId: ['', Validators.required],
    
    probability: [''],
    startDate: [''],
    endDate: [''],
    monday: [''],
    friday: [''],
    saturday: [''],
    sunday: [''],
    thursday: [''],
    tuesday: [''],
    wednesday: [''],
    id: ['']

  }
  //{validator: this.checkDates}
  );

  comparisonEnddateValidator(): any {
    let ldStartDate = this.bookForm.value['startDate'];
    let ldEndDate = this.bookForm.value['endDate'];

    let startnew = new Date(ldStartDate);
    let endnew = new Date(ldEndDate);
    if (startnew <= endnew) {
      return this.bookForm.controls['endDate'].setErrors({ 'invaliddaterange': true });
    }

    let oldvalue = startnew;
    this.bookForm.controls['startDate'].reset();
    this.bookForm.controls['startDate'].patchValue(oldvalue);
    return this.bookForm.controls['startDate'].setErrors({ 'invaliddaterange': false });
  }

  comparisonStartdateValidator(): any {
    let ldStartDate = this.bookForm.value['startDate'];
    let ldEndDate = this.bookForm.value['endDate'];

    let startnew = new Date(ldStartDate);
    let endnew = new Date(ldEndDate);
    if (startnew > endnew) {
      return this.bookForm.controls['startDate'].setErrors({ 'invaliddaterange': true });
    }

    let oldvalue = endnew;
    this.bookForm.controls['endDate'].reset();
    this.bookForm.controls['endDate'].patchValue(oldvalue);
    return this.bookForm.controls['endDate'].setErrors({ 'invaliddaterange': false });
  }

  

  curDay: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private resourceService: ResourceService,
    private projectService: ProjectService,
    private roasterService: RosterService,
    private router: Router,
    private datePipe: DatePipe,
    private loaderService:LoaderService

  ) { }

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe(res => {

    //   this.currentId = res['id'];
    //   if(res['id'] && res['id'] != ''){
    //     this.bookForm.patchValue({
    //       resource: 'resource2',
    //       project: 'project2',
    //       probability: 'medium',
    //       startDate: '2022-11-15T00:00:00.000+00:00',
    //       endDate: '2022-11-15T00:00:00.000+00:00'
    //     })
    //     this.curDay = localStorage.getItem('curDay')
    //   }
    // });
   
    this.objId = this.activatedRoute.snapshot.params['id']
    this.resourceId = this.activatedRoute.snapshot.params['resId']

    if (this.objId) {
      this.getRosterDetailsForUpdate();
    }
    if(parseInt(this.objId) > 0){
      this.displayBasedOnId =true;
    }

    this.getResourceList();
    //this.getProjectList(resourceId:any);
  }
  onChangeDay(event: any) {

  }

  getResourceList() {
    let url ="paged=true" +"&size="+"2000";
    this.resourceService.getResourcelist(url).subscribe((data) => {
      if (data) {
        this.resourceList = data.content;
        // this.countrieslist=data;

      }
    })
  }

  getProjectList(resourceId:any) {
    this.roasterService.getProjectbasedOnResource(resourceId).subscribe((data) => {
      this.projectlist = data;
    })

  }
  deleteRoaster(){
    const formData = JSON.parse(JSON.stringify(this.bookForm.getRawValue()));
    this.roasterService.deleteRoaster(this.objId).subscribe((data) =>{
      this.router.navigate([`roster/edit/${formData.resourceId}`])
    })
  }
  getRosterDetailsForUpdate() {
   
    
    this.roasterService.getRoasterDetails(this.objId).subscribe((data) => {
      if (data.resourceId!= null && data.resourceId != '' && data.resourceId!=="0") {
        this.getformData = data;
        //console.log("data.."+data.startDate)
        this.bookForm?.get('resourceId')?.disable();
       // 12/31/2022
        this.bookForm.patchValue(this.getformData)
        this.bookForm.get('startDate')?.setValue(new Date(data.startDate));
        this.bookForm.get('endDate')?.setValue(new Date(data.endDate));
       // console.log("data......"+JSON.stringify(this.bookForm.value))
      }
      else{
        const obj1={
          'resourceId': Number(this.resourceId)
        }
        this.bookForm?.get('resourceId')?.disable();
        this.bookForm.patchValue(obj1)
        this.getDate=localStorage.getItem("BookDate")
        var splitDate1 = this.getDate.split('-');
        var year1  = splitDate1[2]; 
        var month1 = splitDate1[1];
        var day1 = splitDate1[0];
        this.getDate = month1+"/"+day1+"/"+year1;   
        this.getDate1=localStorage.getItem("BookDate")
        
        this.bookForm.get('startDate')?.setValue(new Date(this.getDate));
        this.bookForm.get('endDate')?.setValue(new Date(this.getDate));
      }
    })

  }
  
  onSubmited() {
    if (this.bookForm.invalid) {
      return;
    }
     let resourceStartDate =  this.datePipe.transform(this.bookForm.value.startDate, 'MM/dd/YYYY');
     let resourceEndDate =  this.datePipe.transform(this.bookForm.value.endDate, 'MM/dd/YYYY');

    const formData = JSON.parse(JSON.stringify(this.bookForm.getRawValue()));
    // const newObj={
    //   "startDate":resourceStartDate,
    //   "endDate":resourceEndDate
    // }
    // console.log("this.bookForm..1.."+JSON.stringify(this.bookForm.value))
    // this.bookForm.patchValue(newObj);    
    // console.log("this.bookForm..2.."+JSON.stringify(this.bookForm.value))
    this.loaderService.setLoading(true);
    const formValues = this.bookForm.value;

    formData.startDate = this.datePipe.transform(this.bookForm.value.startDate, 'MM/dd/YYYY');
    formData.endDate = this.datePipe.transform(this.bookForm.value.endDate, 'MM/dd/YYYY');
   // this.bookForm.get('startDate')?.setValue( this.datepipe.transform(this.bookForm.get('startDate'), 'MM/dd/yyyy'));
    
    this.roasterService.addRosterData(formData).subscribe((data) => {
      //console.log('ggggggggggggggggggggggggggggggg'+JSON.stringify(data));
      this.loaderService.setLoading(false);
      this.router.navigate([`roster/edit/${formData.resourceId}`])

    })
    
    
  }
  redirectToBook(){
    const formValues = this.bookForm.value;
    this.router.navigate([`roster/edit/${this.resourceId}`])
  }

}
