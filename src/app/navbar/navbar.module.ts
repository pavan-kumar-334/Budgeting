import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';

import { MaterialModule } from '../material.module';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { SharedModule } from '../modules/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from '../toolbar/toolbar.component';




@NgModule({
  declarations: [
    // NavbarComponent
    //ToolbarComponent
  ],
  imports: [
    SharedModule,
    ToolbarModule,
    RouterModule
   
  ],
  exports: [
  
  ]
})
export class NavbarModule { }
