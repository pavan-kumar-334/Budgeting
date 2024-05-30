import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonLayoutComponent } from './common-layout.component';
import { CommonLayoutRoutingModule } from './common-layout-routing.module';
import { NavbarModule } from './navbar/navbar.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import { BreadcrumbsService } from './breadcrumb/services/breadcrumbs.service';



@NgModule({
  declarations: [
    CommonLayoutComponent,
    
  ],
  imports: [
    CommonModule,
    CommonLayoutRoutingModule,
    NavbarModule,
    ToolbarModule,
  ],
  providers:[BreadcrumbsService],
  exports:[
    CommonLayoutComponent
  ]
})
export class CommonLayoutModule { }
