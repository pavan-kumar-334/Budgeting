import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../company.service';
import { CustomersService } from '../customers.service';
import { ProfitCenterService } from '../profit-center.service';
import { ProjectService } from '../project.service';
import { ResourceService } from '../resource.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-edit-project',
  templateUrl: './add-edit-project.component.html',
  styleUrls: ['./add-edit-project.component.scss']
})
export class AddEditProjectComponent implements OnInit {
  selected = 'AUD';
  @Output() valueChange = new EventEmitter<any>();
  constructor(private currencyPipe: CurrencyPipe, private projectService: ProjectService, private resourceService: ResourceService, private fb: FormBuilder, private profitcenter: ProfitCenterService, private toasterService: ToastrService, private router: Router, private companyService: CompanyService, private route: ActivatedRoute, private location: Location, private customerservice: CustomersService) { }
  countrieslist: any;
  companylist: any;
  data65: any = [];
  customerslist: any;
  projectTypes: any;
  objId!: string;
  savedFormData: any;
  profitcenterlist: any;
  ResourceList: any;
  resourceNames: any = [];
  counter = 0;
  onlyNumbers: any;
  pageIndex = 0;
  pageSize = 10;
  superFormsdata: FormGroup = this.fb.group({
    // countryId:[''],
    projectResources: this.fb.array([]),
    profitcentreid: ['', Validators.required],
    resources: [''],
    customerid: ['', Validators.required],
    type: ['', Validators.required],
    name: ['', Validators.required],
    id: [''],
    salePrice: 0

  });
  autoData: any;
  autoData1: any;
  autoData2: any;

  ngOnInit(): void {

    this.getprofitcenterdropdown();
    this.getCustomersList();
    this.getResourceList();
    this.getProjectTypeList();
    this.objId = this.route.snapshot.params['id']
    if (this.objId) {
      this.getProjectDetailsbyId();
    }
    if (!this.objId) {
      this.addResource();
    }



    this.superFormsdata.get('profitcentreid')?.valueChanges.subscribe((x1: any) => {
      this.autoData1 = this.profitcenterlist.filter((option1: any) => { return option1.name.toLowerCase().includes(typeof(x1) == "number"? x1.toString().toLowerCase(): x1.toLowerCase()) });
    })
    this.superFormsdata.get('customerid')?.valueChanges.subscribe((x1:any) => {
      this.autoData2 = this.customerslist.filter((option1: any) => { return option1.name.toLowerCase().includes(typeof(x1) == "number"? x1.toString().toLowerCase():x1.toLowerCase()) });
    })

  }
  updateCurrencyField(value: string): void {
    this.onlyNumbers = value
    // this.valueChange.emit(Number(this.onlyNumbers));
  }



  onSubmited() {

    const formData = JSON.parse(JSON.stringify(this.superFormsdata.getRawValue()));


    this.resourceNames = [0];
    for (let i = 0; i < formData.projectResources.length; i++) {
      this.resourceNames[i] = formData.projectResources[i].resourceId;
      // let data4 =data[i].filter((object:any)=>(p:any)=> this.data5 == data.electionCandidates[i] )
    }

    const status = this.resourceNames.some((data: any) => {
      this.counter = 0;
      for (const iterator of this.resourceNames) {
        if (iterator === data) {
          this.counter += 1;
        }
      }

      if (this.counter > 1) {
        this.toasterService.error("Duplicate Resources Are Not Allowed.");
      } else {
      }
      return true;
    });
    if (this.counter <= 1) {
      if (formData.resources == null || formData.resources == "") {
        formData["resources"] = [0]
      }
      let totalCompanies = this.profitcenterlist.filter((o: any) => o.name == formData["profitcentreid"]);
      if (totalCompanies.length == 0) {
        this.toasterService.error("Profit Centre Invalid");
      }
      if (totalCompanies.length > 0) {
  
        formData["profitcentreid"] = totalCompanies[0]['id'];
      }
     
      let totalCompanies1 = this.customerslist.filter((o: any) => o.name == formData["customerid"]);
      if (totalCompanies1.length == 0) {
        this.toasterService.error("Customer Name Invalid");
      }
      if (totalCompanies1.length > 0) {
  
        formData["customerid"] = totalCompanies1[0]['id'];
      }
     
      if (formData.id) {

        this.projectService.updateProject(formData).subscribe((data) => {
          this.location.back();
          this.toasterService.success(data.message, 'Success');

        });
      }
      else {

        this.projectService.addProject(formData).subscribe({

          next: (data) => {

            this.location.back();
            this.toasterService.success(data.message, 'Success');
          },
          error: (err: any) => {
            this.toasterService.error(err.error.message);
          }

        });
      }
    }
  }



  close() {
    //this.router.navigate(['/project']);
    this.location.back();

  }


  getprofitcenterdropdown() {
    let url = "paged=true" + "&size=" + "2000";
    this.profitcenter.getProfitCenterlist(url).subscribe((data) => {
      //console.log("profitcenter..."+data)
      this.profitcenterlist = data.content;


    })
  }

  getCustomersList() {
    let url = "?";
    this.customerservice.getCustomerslist(url).subscribe((data) => {

      this.customerslist = data.content;
    });


  }
  getResourceList() {
    let url = "paged=true" + "&size=" + "2000";
    this.resourceService.getResourcelist(url).subscribe((data) => {

      this.ResourceList = data.content;
    });


  }
  getProjectDetailsbyId() {

    this.projectService.getprojectdetailsById(this.objId).subscribe((data) => {
      let resourceData = [];

      if (data) {
        this.savedFormData = data.data[0];
        if (this.savedFormData.resources) {
          for (let i of this.savedFormData.resources) {
            resourceData.push(i.resourceId);
          }
        }
        this.superFormsdata.patchValue(this.savedFormData)
        this.superFormsdata.get('customerid')?.setValue(this.savedFormData.customerName);
        this.superFormsdata.get('profitcentreid')?.setValue(this.savedFormData.profitCentreName);
        this.superFormsdata.get('type')?.setValue(this.savedFormData.type);
        this.superFormsdata.get('resources')?.setValue(resourceData);
        this.superFormsdata.get('salePrice')?.setValue(this.savedFormData.salePrice);
        this.projectResources.patchValue(this.savedFormData.projectResources);
        let candidates = this.savedFormData.projectResources;

        for (let i = 0; i < candidates.length; i++) {
          this.addResource();

          let obj = {
            currencyCode: candidates[i].currencyCode,

            resourceId: candidates[i].resources.resourceId,
            salePrice: candidates[i].salePrice,

          }

          this.projectResources.controls[i].patchValue(obj);

          //  }
        }

        //this.disableElement(this.savedFormData.type);
      }

    });
  }
  returnOrder() {

    return 0;

  }
  getProjectTypeList() {
    this.projectService.getProjectTypes().subscribe((data) => {
      this.projectTypes = data;
    })
  }

  disableElement(e: any) {

    if (e != "T&M") {
      this.superFormsdata?.get('salePrice')?.setValue(0);
      this.superFormsdata?.get('salePrice')?.disable();
    } else {
      this.superFormsdata?.get('salePrice')?.enable();

    }
  }
  addResource() {

    let initData = this.fb.group({
      resourceId: [''],
      // partyName: [''],
      currencyCode: [''],
      salePrice: [''],
    });
    (<FormArray>this.superFormsdata.get('projectResources')).push(initData);
  }
  get projectResources(): FormArray {
    return this.superFormsdata.get("projectResources") as FormArray
  }
  removeCandidate(i: number) {
    this.projectResources.removeAt(i);
  }
  // transformTotal() {
  //   const formValues = this.superFormsdata.value;
  //   var value1 = this.superFormsdata.value.projectResources;
  //   for(let i=0; i<value1.length; i++){
  //     this.data65[i] = value1[i].salePrice
  //   }
  //   var value =  this.data65
  //   // this.superFormsdata.value.superSalary.setValue(
  //   //   this.formatMoney(value.replace(/\,/g, "")));
  //   if (value == null || value == '' || value == 'undefined') {
  //     this.superFormsdata.value.projectResources.get('salePrice')?.setValue('0.00');
  //   } else {
  //     this.superFormsdata.value.projectResources.get('salePrice')?.setValue(this.formatMoney(value.toString().replace(/\,/g, "")),
  //       { emitEvent: false });
  //   }
  // }



  // formatMoney(value: any) {
  //   const temp = `${value}`.replace(/\,/g, "");
  //   return this.currencyPipe.transform(temp)?.replace('$', '');

  // }
  // keyPressNumbers(event: any) {
  //   var charCode = (event.which) ? event.which : event.keyCode;
  //   // Only Numbers 0-9
  //   if ((charCode < 48 || charCode > 57)) {
  //     event.preventDefault();
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }



}
