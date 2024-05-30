import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';

import { SharedModule } from '../modules/shared/shared.module';
import { RouterModule } from '@angular/router';
import { BreadcrumbsModule } from '../modules/common-layout/breadcrumb/breadcrumbs.module';




@NgModule({
  declarations: [
   ToolbarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    BreadcrumbsModule
    
    
  ],
  exports:[ToolbarComponent]


})
export class ToolbarModule { }
