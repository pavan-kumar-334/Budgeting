import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectPricingService } from '../project-pricing.service';
import { ResourceService } from '../resource.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-updateproject-price-by-t-m',
  templateUrl: './updateproject-price-by-t-m.component.html',
  styleUrls: ['./updateproject-price-by-t-m.component.scss']
})
export class UpdateprojectPriceByTMComponent implements OnInit {

  resourceList: any;
  dataa:any;
  objId: any;
  projectId: any;
  projectTandM: any;
  projectName: any;
  profiteCenterName: any;
  superForms: FormGroup = this.fb.group({
    tandmCreateDTOList: this.fb.array([])
  });

  dataSource2 = new MatTableDataSource<any>();
  displayedColumns = [
    'project',
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  dataForAddEmptyField: any = [{}]
  autoData: any;
  constructor(private router: Router, private fb: FormBuilder, private pricingservice: ProjectPricingService, private location:Location,
    private toasterService: ToastrService, private route: ActivatedRoute, private resourceService: ResourceService) { }

  ngOnInit(): void {
    this.getResourceList();
    this.projectId = this.route.snapshot.params['id'];
    this.getprojectPricingDetailsTandMById();
  }
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
    


  //   const formData = JSON.parse(JSON.stringify(this.superForms.getRawValue()));
  //   var resourceName: any[] = [];
  //   formData.tandmCreateDTOList.map((data: any, index: any) => {
  //     resourceName.push(data.resourceId);
  //   });
  //   const uniqueValues = new Set(resourceName.map(v => v));
  //   if(resourceName[resourceName.length-2] != "" &&resourceName[resourceName.length-1] != "" ){
  //   if (uniqueValues.size < resourceName.length) {
  //     this.toasterService.error("Resource Is Already Exist");
  //     return;
  //   }
  // }
  //   for (let i = 0; i < formData.tandmCreateDTOList.length; i++) {
  //     formData.tandmCreateDTOList[i].project = this.projectId;
  //   }
  
    var data: any[] = [];
    for (let i = 0; i < formData1.tandmCreateDTOList.length; i++) {
      if((formData1.tandmCreateDTOList[i].transferPrice != "" && formData1.tandmCreateDTOList[i].effectiveDate != "" && formData1.tandmCreateDTOList[i].salePrice != "" && formData1.tandmCreateDTOList[i].sellCurrency != "" && formData1.tandmCreateDTOList[i].transferCurrency != "") || (formData1.tandmCreateDTOList[i].resourceId != "" )){
        data.push(formData1.tandmCreateDTOList[i]);
      }
    }
    formData1.tandmCreateDTOList = data;
    for (let i = 0; i < formData1.tandmCreateDTOList.length; i++) {
      formData1.tandmCreateDTOList[i].project = this.projectId;
    }
    var convertedDate = [];
    for(let i=0; i<formData1.tandmCreateDTOList.length;i++){
      var resultDate = this.formatDate1(formData1.tandmCreateDTOList[i].effectiveDate)
      convertedDate.push(resultDate);
      //formData1.tandmCreateDTOList[i].get('effectiveDate')?.setValue(resultDate);
      //formData1.tandmCreateDTOList[i].effectiveDate.patchValue(resultDate);
    }
    for(let i=0; i<convertedDate.length;i++){
      formData1.tandmCreateDTOList[i].effectiveDate = convertedDate[i];
    }
    this.pricingservice.addProjectPriceTypeTandM(formData1).subscribe((data) => {
      this.toasterService.success(data.message, 'Success');
      this.location.back();
    })

  }
  close1() {
    //this.router.navigate(['/projectPrice'])
    this.location.back()
  }
  addTandM() {

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

  getResourceList() {
    let url = "paged=true" + "&size=" + "2000";
    this.resourceService.getResourcelist(url).subscribe((data) => {
      if (data) {
        this.resourceList = data.content;
      }
    })
  }
  getprojectPricingDetailsTandMById() {
    this.pricingservice.getprojectPricingDetailsTandMById(this.projectId).subscribe((data) => {
      this.projectTandM = data;
      
      if(data == null || data == '' || typeof(data) == undefined || data == "" || data.length ==0){
        this.addTandM();
      }
      this.projectName = data[0].projectName;
      this.profiteCenterName = data[0].profitCentreName;
      let dataaa = this.projectTandM
      for (let i = 0; i < dataaa.length; i++) {
        this.addTandM();
        var monthValue = dataaa[i].effectiveDate;
        var splitDate = [];
        splitDate = monthValue.split("/");
        var finalResult = (splitDate[2] + "-" + splitDate[0] + "-" + splitDate[1]);
        if(dataaa[i].resource !=null){
        let obj = {
          resourceId: dataaa[i].resource.name,
          salePrice: dataaa[i].salePrice,
          id: dataaa[i].id,
          project: dataaa[i].project,
          sellCurrency: dataaa[i].sellCurrency,
          transferCurrency: dataaa[i].transferCurrency,
          transferPrice: dataaa[i].transferPrice,
          effectiveDate: finalResult

        }
        this.tandmCreateDTOList.controls[i].patchValue(obj);
      }
      }
    });
  }

  formatDate(e: any) {
    if (e.target.value == null || typeof (e.target.value) == undefined || e.target.value == '') {
      return;
    }
    var d = new Date(e.target.value)

    var convertDate = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes() - d.getTimezoneOffset()).toISOString();

    this.superForms.get('effectiveDate')?.setValue(convertDate, { onlyself: true });

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

}
