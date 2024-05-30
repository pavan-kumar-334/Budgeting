import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../company.service';
import { CustomersService } from '../customers.service';
import { ProfitCenterService } from '../profit-center.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-edit-customer',
  templateUrl: './add-edit-customer.component.html',
  styleUrls: ['./add-edit-customer.component.scss']
})
export class AddEditCustomerComponent implements OnInit {

  constructor(private fb: FormBuilder,private location: Location, private profitcenter: ProfitCenterService, private toasterService: ToastrService, private router: Router, private companyService: CompanyService, private route: ActivatedRoute, private customerservice: CustomersService) { }
  countrieslist: any;
  companylist: any;
  objId!: string;
  savedFormData: any;
  autoData1:any;
  autoData:any;
  ngOnInit(): void {
    this.getCompaniyList();
    this.getCountries();
    this.objId = this.route.snapshot.params['id']

    if (this.objId) {
      this.getCustomerlistById();
    }
    this.superFormsdata.get('country')?.valueChanges.subscribe(x1 => {
      this.autoData1 = this.countrieslist.filter((option1: any) => { return option1.name.toLowerCase().includes(x1.toLowerCase()) });
    })
    this.superFormsdata.get('company')?.valueChanges.subscribe(x1 => {
      this.autoData = this.companylist.filter((option1: any) => { return option1.name.toLowerCase().includes(x1.toLowerCase()) });
    })
  }

  superFormsdata: FormGroup = this.fb.group({
    // countryId:[''],

    country: ['', Validators.required],
    company: ['', Validators.required],
    name: ['', Validators.required],
    id: ['']

  });
  onSubmited() {

    const formData = JSON.parse(JSON.stringify(this.superFormsdata.getRawValue()));
    let totalCompanies = this.countrieslist.filter((o: any) => o.name == formData["country"]);
    if (totalCompanies.length == 0) {
      this.toasterService.error("Country Name Is Invalid");
    }
    if (totalCompanies.length > 0) {

      formData["country"] = totalCompanies[0]['id'];
    }
    let totalCompanies1 = this.companylist.filter((o: any) => o.name == formData["company"]);
    if (totalCompanies1.length == 0) {
      this.toasterService.error("company name is not created in companies table");
    }
    if (totalCompanies.length > 0) {

      formData["company"] = totalCompanies1[0]['id'];
    }

    if (formData.id) {
      this.customerservice.updateCustomerData(formData).subscribe((data) => {
        this.location.back();
        this.toasterService.success(data.message, 'Success');
      });
    }

    else {


      this.customerservice.addCustomer(formData).subscribe({
        next: (data) => {
          if (data) {
            this.location.back();
            this.toasterService.success(data.message, 'Success');
          }
        },

        error: (err: any) => {
          this.toasterService.error(err.error.message);
        }

      });
    }
  }
  close() {
    this.location.back();
    // this.router.navigate(['/customer']);
  }
  getCountries() {
    this.profitcenter.getCountrylist().subscribe((data) => {
      if (data) {
        this.countrieslist = data;
        // this.countrieslist=data;

      }
    })
  }
  getCompaniyList() {
    let url =""
    this.profitcenter.getCompanylist(url).subscribe((data) => {
      let x = JSON.stringify(data);
      this.companylist = data.content
    })
  }
  getCustomerlistById() {

    this.customerservice.getCustomerdetailsById(this.objId).subscribe((data) => {
      if (data) {
        this.savedFormData = data

        // this.superFormsdata.get('id')?.setValue(this.savedFormData.id);
        this.superFormsdata.patchValue(this.savedFormData)
        this.superFormsdata.get('countryId')?.setValue(this.savedFormData.country);
        this.superFormsdata.get('companyId')?.setValue(this.savedFormData.company);
      }

    });
  }


}
