import { Component, Directive, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { ProjectPricingService } from '../project-pricing.service';
import { ResourceService } from '../resource.service';
import { MomentDateAdapter,MAT_MOMENT_DATE_ADAPTER_OPTIONS,MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import * as Moment from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import * as moment from 'moment';
import { Location } from '@angular/common';
//import * as moment from 'moment';


export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/DD/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

// export const DATE_FORMAT_3 = {
//   parse: {
//     dateInput: 'YYYY.MM.DD',
//   },
//   display: {
//     dateInput: 'YYYY.MM.DD',
//     monthYearLabel: 'MMM YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'MMMM YYYY',
//   },
// };

// @Directive({
//   selector: '[dateFormat3]',
//   providers: [
//     {provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT_3},
//   ],
// })

@Component({
  selector: 'app-updateproject-price-by-type',
  templateUrl: './updateproject-price-by-type.component.html',
  styleUrls: ['./updateproject-price-by-type.component.scss'],
  providers: [
  
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})




export class UpdateprojectPriceByTypeComponent implements OnInit {
  testEnter: boolean = false;
  objId: any;
  dataa: any
  projectId: any;
  retrivedData: any;
  resourceList: any;
  projectName: any;
  profitCenter: any;
  projectTandM: any;
  date = new FormControl(moment([2017, 0, 1]));
  visitorsCurrentDate:any;
  superForms: FormGroup = this.fb.group({
    tandmCreateDTOList: this.fb.array([]),
    projectPricingMonthWiseCreateDTOS: this.fb.array([])
  });

  dataSource2 = new MatTableDataSource<any>();
  displayedColumns = [
    'project',
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  ELEMENT_DATA = [
    { project: 'Month' },
    { project: 'Revenue' },
    { project: 'Cost' },

  ];
  autoData: any;

  dataForAddEmptyField: any = [{}]

  constructor(private router: Router,
    private fb: FormBuilder,
    private pricingservice: ProjectPricingService,
    private toasterService: ToastrService,
    private route: ActivatedRoute,
    private location: Location,
    private resourceService: ResourceService) { }

    public setPatientsVisitsDateTiming(date:any){
      this.visitorsCurrentDate = moment(date, "D-M-YYYY").format("DD/MM/YYYY");
  }

  ngOnInit(): void {
    //this.ELEMENT_DATA.push(this.dataForAddEmptyField)

    //this.addCurrencyForTM();
    this.getResourceList();
    this.objId = this.route.snapshot.params['type'];
    this.projectId = this.route.snapshot.params['id'];
    this.getprojectPricingDetailsById();
//     var dataa: any;
//     let formArr: FormArray = this.superForms.get('tandmCreateDTOList') as FormArray
//     for (let i = 0; i < formArr.controls.length; i++) {
//       this.dataa = formArr.controls[i].get('resourceId')
//     this.dataa?.valueChanges.subscribe((x: any) => {
//      
//       this.autoData = this.resourceList.filter((option: any) => { return option.name.toLowerCase().includes(x.toLowerCase()) });
// })
 // }


  }
  // setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
  //   let formArr: FormArray = this.superForms.get('tandmCreateDTOList') as FormArray;
  //   let effectiveDateChange = formArr.controls.get('resourceId');
  //   const ctrlValue = this.date.value!;
  //   ctrlValue.month(normalizedMonthAndYear.month());
  //   ctrlValue.year(normalizedMonthAndYear.year());
  //   this.date.setValue(ctrlValue);
  //   datepicker.close();
  // }
  currentFormArrayIndex(index:number){
    let formArr: FormArray = this.superForms.get('tandmCreateDTOList') as FormArray;
    this.dataa = formArr.controls[index].get('resourceId');
    this.dataa?.valueChanges.subscribe((x: any) => {
      this.autoData = this.resourceList.filter((option: any) => { return option.name.toLowerCase().includes(x.toLowerCase()) });
})
  }
 
  onSubmited() {
    if (this.superForms.invalid) {
      return;
    }
    const formData = JSON.parse(JSON.stringify(this.superForms.getRawValue()));

    //save except T&M
    var monthVales: any[] = [];
  
    formData.projectPricingMonthWiseCreateDTOS.map((data: any, index: any) => {
      monthVales.push(data.month);
    });
   
    if (monthVales[monthVales.length - 2] != "" && monthVales[monthVales.length - 1] != "" && monthVales[monthVales.length - 2] != null && monthVales[monthVales.length - 1] != null) {
      const uniqueValues = new Set(monthVales.map(v => v));
      if (uniqueValues.size < monthVales.length) {
        this.toasterService.error("month Is Already Exist");
        return;
      }
    }

    for (let i = 0; i < formData.projectPricingMonthWiseCreateDTOS.length; i++) {
      formData.projectPricingMonthWiseCreateDTOS[i].type = this.objId;
      formData.projectPricingMonthWiseCreateDTOS[i].project = this.projectId;
    }
    let odj ={
      project : this.projectId,
    }
    var data: any[] = [];
    
    for (let i = 0; i < formData.projectPricingMonthWiseCreateDTOS.length; i++) {
      if (formData.projectPricingMonthWiseCreateDTOS[i].month != "" && formData.projectPricingMonthWiseCreateDTOS[i].month != null) {
        data.push(formData.projectPricingMonthWiseCreateDTOS[i]);
      }
      
    }
    formData.projectPricingMonthWiseCreateDTOS = data;
    let data3: any[] = [];
    if (formData.projectPricingMonthWiseCreateDTOS) {
      delete formData['tandmCreateDTOList'];
    }
  
   

// let formArr: FormArray = this.superForms.get('projectPricingMonthWiseCreateDTOS') as FormArray;
// let d:any = formArr.controls[0].get('month');
// console.log(d?.value,"<===========")
//  if(d.value['_i'].month !=''){
 
    if(formData.projectPricingMonthWiseCreateDTOS.length == 0) {
      let obj ={
        project : this.projectId,
        month: '',
        revenue: "",
        id:"",
        type:"MS",
        cost: "",
      }
     
      formData.projectPricingMonthWiseCreateDTOS.push(obj);
   // }
  }
  
  var convertedDate = [];
  for(let i=0; i<formData.projectPricingMonthWiseCreateDTOS.length;i++){
    var resultDate = this.formatDate1(formData.projectPricingMonthWiseCreateDTOS[i].month)
    convertedDate.push(resultDate);
    //formData1.tandmCreateDTOList[i].get('effectiveDate')?.setValue(resultDate);
    //formData1.tandmCreateDTOList[i].effectiveDate.patchValue(resultDate);
  }
  for(let i=0; i<convertedDate.length;i++){
    formData.projectPricingMonthWiseCreateDTOS[i].month = convertedDate[i];
  }
    this.pricingservice.addProjectPriceType(formData).subscribe((data) => {
      this.toasterService.success(data.message, 'Success');
      // this.router.navigate(['/projectPrice'])
    })

    //save T&M
    const formData1 = JSON.parse(JSON.stringify(this.superForms.getRawValue()));
    var resourceName: any[] = [];
    formData1.tandmCreateDTOList.map((data: any, index: any) => {
      resourceName.push(data.resourceId);
    });
    const uniqueValues = new Set(resourceName.map(v => v));
    if (resourceName[resourceName.length - 2] != "" && resourceName[resourceName.length - 1] != "") {
      if (uniqueValues.size < resourceName.length) {
        this.toasterService.error("Resource Is Already Exist");
        return;
      }
    }
    var data: any[] = [];
    //let tandM =formData.tandmCreateDTOList;
    if (formData1.tandmCreateDTOList) {
      delete formData1['projectPricingMonthWiseCreateDTOS'];
    }
    let resourceListArray:FormArray = this.superForms.get('tandmCreateDTOList') as FormArray;
    let resourceIdArray = []
    //console.log("---------------------->",resourceListArray);
    for(let r=0; r< resourceListArray.controls.length;r++){
      let arrayId:any = resourceListArray.controls[r].get('resourceId');
      //alert(arrayId[''])
      resourceIdArray = this.resourceList.filter((data:any)=>{ return data.name === arrayId['value']});

      console.log("----------------------->",resourceIdArray);
      if(resourceIdArray.length > 0){
        let dataArray:any = '';
        dataArray = resourceIdArray[0]['resourceId'];
        console.log("---------------->",dataArray)
        resourceListArray.controls[r].get('resourceId')?.setValue(dataArray)
      }
    }
    console.log("@@@@@@@@@@@@",resourceListArray.getRawValue(),formData1);
    formData1.tandmCreateDTOList = resourceListArray.getRawValue();
    for (let i = 0; i < formData1.tandmCreateDTOList.length; i++) {
      if ((formData1.tandmCreateDTOList[i].transferPrice != "" && formData1.tandmCreateDTOList[i].effectiveDate != "" && formData1.tandmCreateDTOList[i].salePrice != "" && formData1.tandmCreateDTOList[i].sellCurrency != "" && formData1.tandmCreateDTOList[i].transferCurrency != "") || (formData1.tandmCreateDTOList[i].resourceId != "")) {
        data.push(formData1.tandmCreateDTOList[i]);
      }
    }
    formData1.tandmCreateDTOList = data;
    for (let i = 0; i < formData1.tandmCreateDTOList.length; i++) {
      formData1.tandmCreateDTOList[i].project = this.projectId;
    }
    if(formData1.tandmCreateDTOList.length == 0) {
      let obj ={
        project : this.projectId,
        resourceId: '',
          salePrice: '',
          id: '',
          
          sellCurrency: '',
          transferCurrency: '',
          transferPrice: '',
          effectiveDate: ''
      }
     
      formData1.tandmCreateDTOList.push(obj);
    }
    this.pricingservice.addProjectPriceTypeTandM(formData1).subscribe((data) => {
      this.toasterService.success(data.message, 'Success');
      this.location.back();
    })
  }
  
  getResourceList() {
    let url = "paged=true" + "&size=" + "2000";
    this.resourceService.getResourcelist(url).subscribe((data) => {
      if (data) {
        this.resourceList = data.content;
      }
    })
  }
  getprojectPricingDetailsById() {
    this.pricingservice.getprojectPricingDetailsById(this.projectId).subscribe((data) => {
      this.retrivedData = data;

      if (data == '' || data == "" || data == null || data == undefined || data.length == 0) {
        this.addCurrencyArray();
      }
      
      let dataaa = this.retrivedData
      
      for (let i = 0; i < dataaa.length; i++) {
        this.addCurrencyArray();
        var monthValue = dataaa[i].month;
        var splitDate = [];
        splitDate = monthValue && monthValue.length>0? monthValue.split("/"):[];
        var finalResult = splitDate.length > 0 ?(splitDate[2] + "-" + splitDate[0] + "-" + splitDate[1]):"";

        let obj = {
          month: finalResult,
          revenue: dataaa[i].revenue,
          id: dataaa[i].id,
          project: dataaa[i].project,
          type: dataaa[i].type,
          cost: dataaa[i].cost,
        }
        this.projectPricingMonthWiseCreateDTOS.controls[i].patchValue(obj);
        this.projectName = data[0].projectName;
      this.profitCenter = data[0].profitCentreName;
      }
    })

    this.pricingservice.getprojectPricingDetailsTandMById(this.projectId).subscribe((data) => {
      this.projectTandM = data;
      if (data == null || data == '' || data == undefined || data == "") {
        this.addCurrencyForTM();
      }
      let dataaa = this.projectTandM
      for (let i = 0; i < dataaa.length; i++) {
        this.addCurrencyForTM();

        let obj = {
          resourceId: dataaa[i].resource && dataaa[i].resource.name ? dataaa[i].resource.name :'',
          salePrice: dataaa[i].salePrice,
          id: dataaa[i].id,
          project: dataaa[i].project,
          sellCurrency: dataaa[i].sellCurrency,
          transferCurrency: dataaa[i].transferCurrency,
          transferPrice: dataaa[i].transferPrice,
          effectiveDate: dataaa[i].effectiveDate

        }
        this.tandmCreateDTOList.controls[i].patchValue(obj);
      }
    });

  }
  close() {
    //this.router.navigate(['/projectPrice'])
    this.location.back();
  }
  addCurrencyArray() {
    //this.testEnter = true;
    let initData = this.fb.group({
      month : [''],
      cost: [''],
      revenue: [''],
      project: [''],
      id: [''],
      type: ['']

    });
    (<FormArray>this.superForms.get('projectPricingMonthWiseCreateDTOS')).push(initData);
  }

  formatDate1(inputDate : any) {
    var d = new Date(inputDate)
    var resultDate = [];
    var splitDates = [];

    var convertDate = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes() - d.getTimezoneOffset()).toISOString();
    resultDate = convertDate.split("T");
    splitDates = resultDate[0].split("-");
    var finalResult = (splitDates[1] + "/" + splitDates[2] + "/" + splitDates[0]);

    return finalResult;

  }
  get projectPricingMonthWiseCreateDTOS(): FormArray {
    return this.superForms.get("projectPricingMonthWiseCreateDTOS") as FormArray
  }
  addCurrencyForTM() {

    let initData = this.fb.group({
      resourceId: [''],
      salePrice: [''],
      sellCurrency: [''],
      transferCurrency: [''],
      transferPrice: [''],
      id: [''],
      project: [''],
      effectiveDate: ['']
    });
    (<FormArray>this.superForms.get('tandmCreateDTOList')).push(initData);
  }
  get tandmCreateDTOList(): FormArray {
    return this.superForms.get("tandmCreateDTOList") as FormArray
  }
}

export const DATE_FORMAT_1 = {
  
  parse: {
    dateInput: 'LL',
  },
  display: {
  
    dateInput: 'MMM',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const DATE_FORMAT_2 = {
  parse: {
    dateInput: 'YYYY.MM.DD',
  },
  display: {
    dateInput: 'MMM - YY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Directive({
  selector: '[dateFormat2]',
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT_2},
  ],
})
export class CustomDateFormat2 {
}