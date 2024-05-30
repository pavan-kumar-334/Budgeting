import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company/company.component';
import { AddUpdateCompanyComponent } from './add-update-company/add-update-company.component';



@NgModule({
  declarations: [
    CompanyComponent,
    AddUpdateCompanyComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CompanyComponent,
    AddUpdateCompanyComponent
  ],
})
export class CompanyModule { }
