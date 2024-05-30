import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CostElementService } from '../cost-element.service';
import { CostGroupService } from '../cost-group.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-update-cost-element',
  templateUrl: './add-update-cost-element.component.html',
  styleUrls: ['./add-update-cost-element.component.scss']
})
export class AddUpdateCostElementComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private costelementservice:CostElementService,
    private router: Router,
    private location: Location,
    private costGroupService:CostGroupService,
    private toasterService: ToastrService,) { }

  countrieslist: any;
  companylist: any;
  objId!: string;
  receivedFormData: any;
  costGroupList:any;
  pageIndex = 0;
  pageSize = 10;
  autoData1:any;
  
  ngOnInit(): void {
    this.getCostGroupList();
    this.objId = this.route.snapshot.params['id'];
    if (this.objId) {
      this.getCostElementDataById();
    }
    this.superFormsdata.get('costGroupId')?.valueChanges.subscribe((x1) => {
      this.autoData1 = this.costGroupList.filter((option1: any) => { return option1.name.toLowerCase().includes(typeof(x1) == "number"? x1.toString().toLowerCase():x1.toLowerCase()) });
    })
  }

  superFormsdata: FormGroup = this.fb.group({
    // countryId:[''],

    cost: ['', Validators.required],
    costGroupId: ['', Validators.required],
    name: ['', Validators.required],
    id: ['']

  });

  onSubmited(){
    const formData = JSON.parse(JSON.stringify(this.superFormsdata.getRawValue()));
    let totalCompanies1 = this.costGroupList.filter((o: any) => o.name == formData["costGroupId"]);
    if(totalCompanies1.length == 0){
      this.toasterService.error("Cost Group Invalid");
    }
    if (totalCompanies1.length > 0)
    

    formData["costGroupId"] = totalCompanies1[0]['id'];

    if (formData.id) {
       this.costelementservice.updateCostElementData(formData).subscribe((data)=>{
         this.location.back();
           this.toasterService.success(data.message, 'Success');
       });
    }

    else{
    
    this.costelementservice.addCostElement(formData).subscribe({
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





  close(){
    //this.router.navigate(['/costElement']);
    this.location.back();
  }

  getCostElementDataById(){

    this.costelementservice.getCostElementdetailsById(this.objId).subscribe((data)=>{
      this.receivedFormData=data.data[0];

      this.superFormsdata.patchValue(this.receivedFormData);
      this.superFormsdata.get('costGroupId')?.setValue(this.receivedFormData.costGroupName);


    });
  }

// getCostGroupList(){
//   let url = "paged=true" + "&page=" + this.pageIndex + "&size=" + this.pageSize;
//   this.costGroupService.getCostGroupList(url).subscribe((data)=>{
//     this.costGroupList=data.content;
//   });

// }
getCostGroupList(){

  let url = "?" + "paged=true" + "&page="+this.pageIndex+"&size="+this.pageSize;
  this.costGroupService.getCostGroupList(url).subscribe((data)=>{
    //console.log('testtttt'+JSON.stringify(data) );
  this.costGroupList=data.content;


  });

}

}
