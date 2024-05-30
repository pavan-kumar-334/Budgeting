import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfitCenterService } from '../profit-center.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-update-profit-center',
  templateUrl: './add-update-profit-center.component.html',
  styleUrls: ['./add-update-profit-center.component.scss']
})
export class AddUpdateProfitCenterComponent implements OnInit {

  constructor(private fb: FormBuilder,private location: Location, private router: Router, private profitcenter: ProfitCenterService, private route: ActivatedRoute, private toasterService: ToastrService,) { }

  countrieslist: any;
  companylist: any;
  objId!: string;
  savedFormData: any;
  autoData: any;
  autoData1: any;

  ngOnInit(): void {
    this.getCompaniyList();
    this.getCountries();
    this.objId = this.route.snapshot.params['id']

    if (this.objId) {
      this.getProfitCenterDetailsbyId();
    }
    this.superFormsdata.get('companyId')?.valueChanges.subscribe(x => {

      this.autoData = this.companylist.filter((option: any) => { return option.name.toLowerCase().includes(x.toLowerCase()) });

    })

    this.superFormsdata.get('countryId')?.valueChanges.subscribe(x1 => {
      this.autoData1 = this.countrieslist.filter((option1: any) => { return option1.name.toLowerCase().includes(x1.toLowerCase()) });
    })

  }

  superFormsdata: FormGroup = this.fb.group({
    // countryId:[''],

    countryId: ['', Validators.required],
    companyId: ['', Validators.required],
    name: ['', Validators.required],
    id: [0]

  });




  close() {
    this.location.back();
    // this.router.navigate(['/profitCenter']);
  }


  onSubmited() {

    const formData = JSON.parse(JSON.stringify(this.superFormsdata.getRawValue()));
    // if(formData.id == ""){
    //   delete formData["id"];
    // }
    let totalCompanies = this.companylist.filter((o: any) => o.name == formData["companyId"]);
    if (totalCompanies.length == 0) {
      this.toasterService.error("Company Invalid");
    }
    if (totalCompanies.length > 0) {

      formData["companyId"] = totalCompanies[0]['id'];
    }

    let totalCompanies1 = this.countrieslist.filter((o: any) => o.name == formData["countryId"]);
    if (totalCompanies1.length == 0) {
      this.toasterService.error("Country Invalid");
    }
    if (totalCompanies1.length > 0)

      formData["countryId"] = totalCompanies1[0]['id'];
    if (formData.id) {

      this.profitcenter.updateProfitCenter(formData).subscribe((data) => {
        this.location.back();
        this.toasterService.success(data.message, 'Success');

      });
    }
    else {
      this.profitcenter.addProfitCenter(formData).subscribe({
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

  getCountries() {
    this.profitcenter.getCountrylist().subscribe((data) => {
      if (data) {
        this.countrieslist = data;
        // this.countrieslist=data;

      }
    })
  }
  getCompaniyList() {
    let url = ""
    this.profitcenter.getCompanylist(url).subscribe((data) => {
      let x = JSON.stringify(data);
      this.companylist = data.content
    })
  }

  getProfitCenterDetailsbyId() {

    this.profitcenter.getprofitCenterdetailsById(this.objId).subscribe((data) => {

      if (data) {
        this.savedFormData = data

        this.superFormsdata.patchValue(this.savedFormData)
        this.superFormsdata.get('countryId')?.setValue(this.savedFormData.country);
        this.superFormsdata.get('companyId')?.setValue(this.savedFormData.company);


      }

    });
  }




}
