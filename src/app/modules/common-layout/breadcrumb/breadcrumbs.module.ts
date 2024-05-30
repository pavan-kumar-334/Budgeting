import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BreadcrumbsService } from './services/breadcrumbs.service';
import { BreadcrumbsComponent } from './breadcrumb.component';
import { SharedModule } from '../../shared/shared.module';

// @dynamic
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ],
  declarations: [BreadcrumbsComponent],
  exports: [BreadcrumbsComponent],
})
export class BreadcrumbsModule {
  
}