import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { CompanyService } from '../company.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-edit-company',
  templateUrl: './add-edit-company.component.html',
  styleUrls: ['./add-edit-company.component.scss']
})
export class AddEditCompanyComponent implements OnInit {
  countrieslist: any;
  groupslist: any;
  objId!: string;
  savedFormData: any;
  @ViewChild('formDirective')
  private formDirective!: NgForm;

  constructor(private fb: FormBuilder,private location: Location, private toasterService: ToastrService, private router: Router, private companyService: CompanyService, private route: ActivatedRoute) { }
  ngOnInit(): void {

    this.getCountries();
    this.getGroups();
    this.objId = this.route.snapshot.params['id']

    if (this.objId) {
      this.getcompanyDetails();
    }
    this.superForms.get('groupId')?.valueChanges.subscribe((x:any) => {

      this.autoData = this.groupslist.filter((option: any) => { return option.name.toLowerCase().includes(typeof(x)=="number"? x.toString().toLowerCase():x.toLowerCase()) });
    })


    this.superForms.get('countryId')?.valueChanges.subscribe((x1: any) => {
      this.autoData1 = this.countrieslist.filter((option1: any) => { return option1.name.toLowerCase().includes(typeof(x1) == "number"? x1.toString().toLowerCase():x1.toLowerCase()) });
    })

  }
  superForms: FormGroup = this.fb.group({

    countryId: ['', Validators.required],
    groupId: ['', Validators.required],
    name: ['', Validators.required],
    currencyCode:[''],
    id: ['']

  });
  autoData: any;
  autoData1: any;


  onSubmited() {
    const formData = JSON.parse(JSON.stringify(this.superForms.getRawValue()));

    if (formData.id == null || formData.id == "") {
      delete formData["id"];
    }
    if (formData.countryId != null || formData.countryId != "") {
      let totalCompanies1 = this.countrieslist.filter((o: any) => o.name == formData["countryId"]);
      if(totalCompanies1.length == 0){
        this.toasterService.error("Invalid Country");
      }
      if (totalCompanies1.length > 0)
        
      formData["countryId"] = totalCompanies1[0]['id'];
    }
    



    if (formData.groupId != null || formData.groupId != "") {
      let totalCompanies = this.groupslist.filter((o: any) => o.name == formData["groupId"]);
      if(totalCompanies.length == 0){
        this.toasterService.error("Invalid Group");
      }
      if (totalCompanies.length > 0)
        formData["groupId"] = totalCompanies[0]['id'];
    }

    if (formData.id) {

      this.companyService.updateCompany(formData).subscribe((data) => {


        this.router.navigate(['/company']);
        this.toasterService.success(data.message, 'Success');


      });

    }

    else {
      if (this.superForms.invalid) {
        return;
      }


      /**make API call here */
      this.companyService.addCompany(formData).subscribe({
        next: (data) => {
          if (data) {
            this.router.navigate(['/company']);
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
    // this.router.navigate(['/company']);
  }
  getCountries() {

    this.companyService.getCountrylist().subscribe((data) => {
      if (data) {
        this.countrieslist = data;
        // this.countrieslist=data;
      }
    })
  }

  getGroups() {

    this.companyService.getGrouplist().subscribe((data) => {
      if (data) {
        this.groupslist = data.content;
      }
    })
  }

  getcompanyDetails() {
    this.companyService.getcompanydetails(this.objId).subscribe((data) => {
      if (data) {

        this.savedFormData = data.data[0]
        // this.superForms.get('id')?.setValue(this.savedFormData.id);

        this.superForms.patchValue(this.savedFormData)
        this.superForms.get('countryId')?.setValue(this.savedFormData.countryName);
        this.superForms.get('groupId')?.setValue(this.savedFormData.groupName);

      }

    })
  }
  getCurrencyList(e:any){
    let filterArray = this.countrieslist.filter((k: any) => { return k.name === e });
    this.superForms.get('currencyCode')?.patchValue(filterArray[0].currencyCode)
    this.superForms.get('currencyCode')?.disable();
    console.info("");
  }
  



}
