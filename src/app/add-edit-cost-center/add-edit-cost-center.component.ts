import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CostCenterService } from '../cost-center.service';
import { ProfitCenterService } from '../profit-center.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-edit-cost-center',
  templateUrl: './add-edit-cost-center.component.html',
  styleUrls: ['./add-edit-cost-center.component.scss']
})
export class AddEditCostCenterComponent implements OnInit {
  profitcenterlist: any;

  constructor(private toasterService: ToastrService,private location:Location, private costcenterService: CostCenterService, private fb: FormBuilder, private router: Router, private profitcenter: ProfitCenterService, private route: ActivatedRoute) { }


  countrieslist: any;
  companylist: any;
  objId!: string;
  savedFormData: any;
  pageIndex = 0;
  pageSize = 10;
  autoData1:any;
  autoData:any;

  superFormsdata: FormGroup = this.fb.group({
    country: ['', Validators.required],
    profitcentre: ['', Validators.required],
    name: ['', Validators.required],
    id: ['']

  });
  ngOnInit(): void {
    this.getCountries();
    this.getprofitcenterdropdown();
    this.objId = this.route.snapshot.params['id']
    if (this.objId) {
      this.getcostcenterDetails();
    }
    this.superFormsdata.get('country')?.valueChanges.subscribe(x1 => {
      this.autoData1 = this.countrieslist.filter((option1: any) => { return option1.name.toLowerCase().includes(x1.toLowerCase()) });
    })

    this.superFormsdata.get('profitcentre')?.valueChanges.subscribe(x => {
      this.autoData = this.profitcenterlist.filter((option: any) => { return option.name.toLowerCase().includes(x.toLowerCase()) });
    })
  }
  onSubmited() {

    const formData = JSON.parse(JSON.stringify(this.superFormsdata.getRawValue()));

    let totalCompanies1 = this.countrieslist.filter((o: any) => o.name == formData["country"]);
    if (totalCompanies1.length == 0) {
      this.toasterService.error("Country Invalid");
    }
    if (totalCompanies1.length > 0) {

      formData["country"] = totalCompanies1[0]['id'];
    }
   
    let totalCompanies = this.profitcenterlist.filter((o: any) => o.name == formData["profitcentre"]);
    if (totalCompanies.length == 0) {
      this.toasterService.error("profit Centre Invalid");
    }
    if (totalCompanies.length > 0) {

      formData["profitcentre"] = totalCompanies[0]['id'];
    }
    

    if (formData.id) {

      this.costcenterService.updateCostCenter(formData).subscribe((data) => {
        this.location.back();
        this.toasterService.success(data.message, 'Success');
      });
    }
    else {
    

      /**make API call here */
      this.costcenterService.addCostCenter(formData).subscribe({
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
    // this.router.navigate(['/costCenter']);
  }

  getCountries() {
    this.profitcenter.getCountrylist().subscribe((data) => {
      if (data) {
        this.countrieslist = data;
        // this.countrieslist=data;

      }
    })
  }
  getprofitcenterdropdown() {
    let url = "";
    this.profitcenter.getProfitCenterlist(url).subscribe((data) => {
      //console.log("profitcenter..."+data)
      this.profitcenterlist = data.content;


    })

  }
  getcostcenterDetails() {

    this.costcenterService.getCostcenterDetails(this.objId).subscribe((data) => {
      if (data) {

        this.savedFormData = data

        this.superFormsdata.patchValue(this.savedFormData)
        this.superFormsdata.get('countryId')?.setValue(this.savedFormData.country);
        this.superFormsdata.get('profitcentreId')?.setValue(this.savedFormData.profitcentre);


      }

    })
  }


}
