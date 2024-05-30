import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../group.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-update-group',
  templateUrl: './add-update-group.component.html',
  styleUrls: ['./add-update-group.component.scss'],
})
export class AddUpdateGroupComponent implements OnInit {
  @ViewChild('formDirective')
  private formDirective!: NgForm;

  constructor(private fb: FormBuilder,
    private router: Router,
    private groupService: GroupService,
    private route: ActivatedRoute,
    private location: Location,
    private toasterService: ToastrService,) { }

  objId!: string;
  mode: string = 'Add';
  savedFormData: any;
  // addGroupForm: FormGroup = this.fb.group({
  //   id: [''],
  //   name: [''],
  //   description: ['']
  // })
  


  ngOnInit(): void {
    this.objId = this.route.snapshot.params['id'];
    if (this.objId) {
      this.mode = "Edit";
      this.getGroupDetails();
    }
  }

  superForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    id: ['']
  });

  onSubmit() {
    const formData = JSON.parse(JSON.stringify(this.superForm.getRawValue()));
    if (formData.id) {
      this.groupService.updateGroup(formData).subscribe((data)=>{
       if(data){
          
          this.formDirective.resetForm();
          this.superForm.setErrors(null);
          //this.getGroupDetails();
          this.router.navigate(['/group']);
          this.toasterService.success(data.data[0].message, 'Success');
        }
        
      });
    } else {
      if (this.superForm.invalid) {
        return;
      }
      const formVal = this.superForm.value;
   //    
      /**make API call here */
      this.groupService.addGroup(formVal).subscribe( {
        next: (data) => {
      
        this.router.navigate(['/group']);
        this.toasterService.success(data.message, 'Success');
        
        },
      
    
        error: (err: any) => {
          if(err.error.message.includes('Group already exists with'))
          this.toasterService.error(err.error.message);
        
        }
    });
  }
}
  close() {
    // this.router.navigate(['/group']);
    this.location.back();
  }

  getGroupDetails(): void {

    this.groupService.getGroupDetails(this.objId).subscribe((data) => {



      if (data) {
        this.savedFormData = data.data[0]
        this.superForm.get('id')?.setValue(this.savedFormData.id);
        this.superForm.patchValue(this.savedFormData)

      }

    })
  }

}
 // saveForm()

