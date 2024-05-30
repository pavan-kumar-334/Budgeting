import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { BreadcrumbsModule } from '../breadcrumb/breadcrumbs.module';
import { MaterialModule } from '../../helpers/material.module';
import { ToolbarComponent } from './toolbar.component';



@NgModule({
  declarations: [
   ToolbarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    BreadcrumbsModule,
    MaterialModule
    
    
  ],
  exports:[
    ToolbarComponent
  ]

})
export class ToolbarModule { }
