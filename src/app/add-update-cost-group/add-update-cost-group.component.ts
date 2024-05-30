import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CostCenterService } from '../cost-center.service';
import { CostGroupService } from '../cost-group.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-update-cost-group',
  templateUrl: './add-update-cost-group.component.html',
  styleUrls: ['./add-update-cost-group.component.scss']
})
export class AddUpdateCostGroupComponent implements OnInit {
  constructor(private fb: FormBuilder,
    private costGroupService: CostGroupService,
    private costCenterService: CostCenterService,
    private router: Router,
    private location: Location,
    private toasterService: ToastrService,
    private route: ActivatedRoute,
  ) { }
  countrieslist: any;
  costCenterlist: any;
  companylist: any;
  objId!: string;
  //savedFormData: any;
  receivedFormData: any;
  autoData1: any;

  ngOnInit(): void {
    this.getCostCenterList();
    this.objId = this.route.snapshot.params['id']

    if (this.objId) {
      this.getCostGroupDataById();
    }
    this.superFormsdata.get('costCentreId')?.valueChanges.subscribe(x1 => {
      this.autoData1 = this.costCenterlist.filter((option1: any) => { return option1.name.toLowerCase().includes(x1.toLowerCase()) });
    })
  }

  superFormsdata: FormGroup = this.fb.group({
    // countryId:[''],
    costCentreId: ['', Validators.required],
    //country: ['', Validators.required],
    //company: ['', Validators.required],
    name: ['', Validators.required],
    id: ['']

  });

  onSubmited() {
    const formData = JSON.parse(JSON.stringify(this.superFormsdata.getRawValue()));
    let totalCompanies1 = this.costCenterlist.filter((o: any) => o.name == formData["costCentreId"]);
     if (totalCompanies1.length == 0) {
      this.toasterService.error("Cost Center Invalid");
    }
    if (totalCompanies1.length > 0) {

      formData["costCentreId"] = totalCompanies1[0]['id'];
    }
    
   

    if (formData.id) {
      this.costGroupService.updateCostGroupData(formData).subscribe((data) => {
        this.location.back();
        this.toasterService.success(data.message, 'Success');
      });
    }

    else {

      this.costGroupService.addCostGroup(formData).subscribe({
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
  }

  getCostCenterList() {
    let url = "paged=true";
    this.costCenterService.getCostCenterlist(url).subscribe((data) => {
      this.costCenterlist = data.content;
    })
  }

  getCostGroupDataById() {

    this.costGroupService.getCostGroupdetailsById(this.objId).subscribe((data) => {
      this.receivedFormData = data.data[0];

      this.superFormsdata.patchValue(this.receivedFormData);
      this.superFormsdata.get('costCentreId')?.setValue(this.receivedFormData.costCentreName);


    });
  }

}
