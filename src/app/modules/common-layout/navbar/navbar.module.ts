import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';


import { ToolbarModule } from '../toolbar/toolbar.module';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../helpers/material.module';




@NgModule({
  declarations: [
     NavbarComponent
    //ToolbarComponent
  ],
  imports: [
    SharedModule,
    ToolbarModule,
    RouterModule,
    MaterialModule
   
  ],
  exports: [
  NavbarComponent
  ]
})
export class NavbarModule { }
