import { identifierName } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../company.service';
import { CostCenterService } from '../cost-center.service';
import { ProjectService } from '../project.service';
import { ResourceService } from '../resource.service';
//import { DateAdapter } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Location } from '@angular/common';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CurrencyPipe } from '@angular/common';




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
  selector: 'app-add-update-resource',
  templateUrl: './add-update-resource.component.html',
  styleUrls: ['./add-update-resource.component.scss'],
  providers: [

    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AddUpdateResourceComponent implements OnInit {
  @Output()
  change!: EventEmitter<MatCheckboxChange>;
  countrieslist: any;
  costCenterListlist: any;
  //checkboxfield:boolean=true;
  pageIndex = 0;
  pageSize = 10;
  disabledelement: boolean = false;
  projectlist: any;
  objId!: string;
  receivedData: any;
  mainImg: any;
  mainUploadedImg!: boolean;
  mainUploadBrowse: boolean = true;
  imageSrc!: string;
  uploadImgName!: string;
  fileNameErr!: boolean;
  uploadFormdata: FormData = new FormData();

  superFormsdata: FormGroup = this.fb.group({
    secondSalaryEndDate: [''],
    secondSalaryStartDate: [''],
    active: [false],
    name: ['', Validators.required],
    // country:[''],
    resourceId: [''],
    //projectId:[''],
    costCentreId: ['', Validators.required],
    bonus: [''],
    //countryId: [''],
    //dailyCostRate: new FormControl({ value: '', disabled: false }),
    emailId: ['', Validators.required],
    employee: [''],
    dailyCostRate:[''],
    region: [''],
    roaster: [''],
    role: [''],
    salaryEndDate: [''],
    salaryExclSuper: [''],
    salaryStartDate: [''],
    secondSalary: [''],
    superSalary: [''],
    transferPrice: [''],
    // secondSalary:[''], 
    payrollTaxApplicable: [''],

  });
  autoData: any;

  constructor(private currencyPipe: CurrencyPipe,private location:Location, private projectService: ProjectService, private costcenterService: CostCenterService, private companyService: CompanyService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private resorceService: ResourceService, private toasterService: ToastrService, private dateAdapter: DateAdapter<Date>) { this.dateAdapter.setLocale('en-GB'); }

  ngOnInit(): void {
    this.getCountries();
    this.getCostCenterList();
    this.getProjectList();
    this.transformTotal();


    this.objId = this.route.snapshot.params['id']

    if (this.objId) {
      this.getResourceDetailsById();
    }
    this.superFormsdata.get('costCentreId')?.valueChanges.subscribe((x1:any) => {
      this.autoData = this.costCenterListlist.filter((option1: any) => { return option1.name.toLowerCase().includes(typeof(x1) == 'number' ? x1.toString().toLowerCase():x1.toLowerCase()) });
    })
  }
  onSubmited() {

    var value = this.superFormsdata.value.superSalary;
    if (value == null || value == '' || value == 'undefined') {
      this.superFormsdata.get('superSalary')?.setValue('0');
    } else {
      this.superFormsdata.get('superSalary')?.setValue(value.replace(",", ""));
    }


    // console.log("formdata.." + JSON.stringify(this.superFormsdata.getRawValue()))
    const formData = JSON.parse(JSON.stringify(this.superFormsdata.getRawValue()));
    if (formData.resourceId == null || formData.resourceId == '') {
      delete formData["resourceId"];
    }
    let totalCompanies1 = this.costCenterListlist.filter((o: any) => o.name == formData["costCentreId"]);
    if (totalCompanies1.length == 0) {
      this.toasterService.error("Cost Centre Invalid");
    }
    if (totalCompanies1.length > 0) {
      formData["costCentreId"] = totalCompanies1[0]['id'];
    }

    formData.superSalary = formData.superSalary.replace(',', '');
    if (formData.resourceId) {
      this.uploadFormdata.append('updateResourceData', JSON.stringify(formData));
      this.resorceService.updateResourceDetails(this.uploadFormdata).subscribe((data) => {
        this.location.back();
        this.toasterService.success(data.message, 'Success');
      });
    }

    else {

      if (this.superFormsdata.invalid) {
        //console.log('form invalid');
        return;
      }

      const formValues = this.superFormsdata.value;
      // if (formValues.fileSource == null || formValues.fileSource == undefined || formValues.fileSource == '') {
      //   this.toasterService.error('Photo is required')
      //   return;
      // }
      if (formValues.employee == null || formValues.employee == '') {
        formValues.employee = false;
      }
      if (formValues.roaster == null || formValues.roaster == '') {
        formValues.roaster = false;
      }
      if (formValues.resourceId == null || formValues.resourceId == '') {
        delete formValues["resourceId"];
      }
      let totalCompanies1 = this.costCenterListlist.filter((o: any) => o.name == formValues["costCentreId"]);
      formValues["costCentreId"] = totalCompanies1[0]['id'];
      this.uploadFormdata.append('createResourceDTO', JSON.stringify(formValues));
      //console.log(formValues);

      /**make API call here */
      this.resorceService.addResource(this.uploadFormdata).subscribe({
        next: (data) => {
          if (data) {
            this.location.back();
            this.toasterService.success(data.message, 'Success');
          }
        },
        error: (err: any) => {
          this.toasterService.error(err.error.message);
        },
      });
    }
  }

  close() {
    this.location.back();
   // this.router.navigate(['/resource'])
  }


  getCountries() {

    this.companyService.getCountrylist().subscribe((data) => {
      if (data) {
        this.countrieslist = data;
      }
    })
  }
  getCostCenterList() {
    let url = "";
    this.costcenterService.getCostCenterlist(url).subscribe((data) => {
      if (data) {
        this.costCenterListlist = data.content;
      }
    })
  }
  getProjectList() {
    let url = "";
    this.projectService.getProjectlist(url).subscribe((data) => {
      if (data) {
        this.projectlist = data.content;
      }
    })
  }

  // disableElement(e: MatCheckboxChange) {
  //   if (e.checked) {
  //     this.superFormsdata?.get('dailyCostRate')?.setValue(0);
  //     this.superFormsdata?.get('dailyCostRate')?.disable();
  //   } else {
  //     this.superFormsdata?.get('dailyCostRate')?.enable();
  //   }


  // }

  getDateForUpdate(date: string) {
    if (date == null) {
      return;
    } else {
      return date;
    }
  }
  getResourceDetailsById() {

    this.resorceService.getResourceDetailsById(this.objId).subscribe((data) => {
      this.receivedData = data;

      var d = null;
      var convertDate = null;
      if (this.receivedData.salaryStartDate) {
        d = new Date(this.receivedData.salaryStartDate)
        convertDate = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes() - d.getTimezoneOffset()).toISOString();
      }
      var d1 = null;
      var convertDate1 = null;
      if (this.receivedData.salaryEndDate) {
        d1 = new Date(this.receivedData.salaryEndDate)
        convertDate1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate(), d1.getHours(), d1.getMinutes() - d1.getTimezoneOffset()).toISOString();
      }
      var d2 = null;
      var convertDate2 = null;
      if (this.receivedData.secondSalaryStartDate) {
        d2 = new Date(this.receivedData.secondSalaryStartDate)
        convertDate2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate(), d2.getHours(), d2.getMinutes() - d2.getTimezoneOffset()).toISOString();
      }
      var d3 = null;
      var convertDate3 = null;
      if (this.receivedData.secondSalaryEndDate) {
        d3 = new Date(this.receivedData.secondSalaryEndDate)
        convertDate3 = new Date(d3.getFullYear(), d3.getMonth(), d3.getDate(), d3.getHours(), d3.getMinutes() - d3.getTimezoneOffset()).toISOString();
      }
      this.superFormsdata.patchValue(this.receivedData);
      this.superFormsdata.get('costCentreId')?.setValue(this.receivedData.costCentreName);

      // if (this.receivedData.employee) {
      //   this.superFormsdata?.get('dailyCostRate')?.disable();
      // }
      this.superFormsdata.get('secondSalaryEndDate')?.setValue(convertDate3, { onlyself: true });
      // if(convertDate2 == "1970-01-01T05:30:00.000Z"){
      //   return;
      this.superFormsdata.get('secondSalaryStartDate')?.setValue(convertDate2, { onlyself: true });
      this.superFormsdata.get('salaryStartDate')?.setValue(convertDate, { onlyself: true });
      this.superFormsdata.get('salaryEndDate')?.setValue(convertDate1, { onlyself: true });
      this.transformTotal();
      this.mainImg = this.receivedData.resourcePhotoUrl ? this.receivedData.resourcePhotoUrl : '';
      var timestamp = new Date().getTime();
      this.mainImg = this.mainImg + '?t=' + timestamp;
      if (this.mainImg) {
        this.mainUploadedImg = true;
        this.mainUploadBrowse = false;
      }
    });

  }



  transformTotal() {
    const formValues = this.superFormsdata.value;
    var value = this.superFormsdata.value.superSalary;
    // this.superFormsdata.value.superSalary.setValue(
    //   this.formatMoney(value.replace(/\,/g, "")));
    if (value == null || value == '' || value == 'undefined') {
      this.superFormsdata.get('superSalary')?.setValue('');
    } else {
      this.superFormsdata.get('superSalary')?.setValue(this.formatMoney(value.toString().replace(/\,/g, "")),
        { emitEvent: false });
    }
  }



  formatMoney(value: any) {
    const temp = `${value}`.replace(/\,/g, "");
    return this.currencyPipe.transform(temp)?.replace('$', '');

  }



  keyPressNumbers(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }


  formatDate(e: any) {
    if (e.target.value == null || typeof (e.target.value) == undefined || e.target.value == '') {
      return;
    }
    var d = new Date(e.target.value)
    var convertDate = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes() - d.getTimezoneOffset()).toISOString();
    this.superFormsdata.get('salaryStartDate')?.setValue(convertDate, { onlyself: true });

  }

  formatDate1(e: any) {
    if (e.target.value == null || typeof (e.target.value) == undefined || e.target.value == '') {
      return;
    }
    var d = new Date(e.target.value)

    var convertDate1 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes() - d.getTimezoneOffset()).toISOString();

    this.superFormsdata.get('salaryEndDate')?.setValue(convertDate1, { onlyself: true });

  }

  formatDate2(e: any) {
    if (e.target.value == null || typeof (e.target.value) == undefined || e.target.value == '') {
      return;
    }
    var d = new Date(e.target.value)

    var convertDate2 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes() - d.getTimezoneOffset()).toISOString();

    this.superFormsdata.get('secondSalaryStartDate')?.setValue(convertDate2, { onlyself: true });

  }

  formatDate3(e: any) {
    if (e.target.value == null || typeof (e.target.value) == undefined || e.target.value == '') {
      return;
    }
    var d = new Date(e.target.value)

    var convertDate3 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes() - d.getTimezoneOffset()).toISOString();

    this.superFormsdata.get('secondSalaryEndDate')?.setValue(convertDate3, { onlyself: true });

  }

  onFileUpload(fileEvent: any, decimals = 2) {

    const reader = new FileReader();

    if (fileEvent.target.files && fileEvent.target.files.length) {
      const [file] = fileEvent.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imageSrc = reader.result as string;

        this.superFormsdata.patchValue({
          fileSource: reader.result
        });

      };

    }
    const fileSizeProperties = fileEvent.target.files[0];
    this.uploadImgName = fileSizeProperties.name;
    const fileFormat = fileSizeProperties.name.split('.').pop();
    if (fileFormat == 'png' || fileFormat == 'jpeg' || fileFormat == 'jpg') {
      this.fileNameErr = false;
      this.uploadFormdata.append('files', fileSizeProperties);
    } else {
      this.fileNameErr = true;
    }


  }

}
