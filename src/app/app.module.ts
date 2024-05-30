import { NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarModule } from './navbar/navbar.module';
//import { ToolbarComponent } from './toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './modules/shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DeleteConfirmationDialog, GroupComponent } from './group/group.component';
//import { CompanyModule} from './modules/company/company.module';
import { AddUpdateGroupComponent } from './add-update-group/add-update-group.component';
import { ToastrModule } from 'ngx-toastr';
import { CompanyListComponent } from './company-list/company-list.component';
import { AddEditCompanyComponent} from './add-edit-company/add-edit-company.component';
import { DeletepopupConfirmComponent } from './deletepopup-confirm/deletepopup-confirm.component';
import { ProfitCenterListComponent } from './profit-center-list/profit-center-list.component';
import { AddUpdateProfitCenterComponent } from './add-update-profit-center/add-update-profit-center.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { AddEditCustomerComponent } from './add-edit-customer/add-edit-customer.component';
import { CostCenterComponent } from './cost-center/cost-center.component';
import { AddEditCostCenterComponent } from './add-edit-cost-center/add-edit-cost-center.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { AddEditProjectComponent } from './add-edit-project/add-edit-project.component';
import { ResourceListComponent } from './resource-list/resource-list.component';
import { AddUpdateResourceComponent } from './add-update-resource/add-update-resource.component';
import { RoasterComponent } from './roaster/roaster.component';
import { AddRoasterComponent } from './add-roaster/add-roaster.component';
import { AddEditBookRosterComponent } from './add-edit-book-roster/add-edit-book-roster.component';
import { BreadcrumbsComponent } from './breadcrumb/breadcrumb.component';
import { BreadcrumbsService } from './breadcrumb/services/breadcrumbs.service';
import { DatePipe } from '@angular/common';
import { CostGroupListComponent } from './cost-group-list/cost-group-list.component';
import { CostElementListComponent } from './cost-element-list/cost-element-list.component';
import { AddUpdateCostElementComponent } from './add-update-cost-element/add-update-cost-element.component';
import { AddUpdateCostGroupComponent } from './add-update-cost-group/add-update-cost-group.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { AuthInterceptor } from './modules/auth/_helpers/auth.interceptor';
import { CurrencyPipe } from '@angular/common';
import { AddCurrencyComponent } from './add-currency/add-currency.component';
import { SpinnerComponent } from './modules/shared/spinner/spinner.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ProjectPriceComponent } from './project-price/project-price.component';
import { UpdateprojectPriceByTMComponent } from './updateproject-price-by-t-m/updateproject-price-by-t-m.component';
import { UpdateprojectPriceByTypeComponent,CustomDateFormat2 } from './updateproject-price-by-type/updateproject-price-by-type.component';
import { ContributionReportComponent } from './contribution-report/contribution-report.component';
import { ProfitCenterActivitySummaryReportComponent } from './profit-center-activity-summary-report/profit-center-activity-summary-report.component';
import { ResourceRelatedActivityComponent } from './resource-related-activity/resource-related-activity.component';
import { PayrollCostsComponent } from './payroll-costs/payroll-costs.component';
import { NonResourceRelatedActivityComponent } from './non-resource-related-activity/non-resource-related-activity.component';
import { WeeklySummaryReportComponent } from './weekly-summary-report/weekly-summary-report.component';
//import { LoginComponent } from './login/login.component';

//import { MaterialModule } from '@angular/material';
const routes = [
  { path: '', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
 
   { path: '**', redirectTo: '/login' }
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    //ToolbarComponent,
    GroupComponent,
    AddUpdateGroupComponent,
    DeleteConfirmationDialog,
    CompanyListComponent,
    AddEditCompanyComponent,
    DeletepopupConfirmComponent,
    ProfitCenterListComponent,
    AddUpdateProfitCenterComponent,
    CustomerListComponent,
    AddEditCustomerComponent,
    CostCenterComponent,
    AddEditCostCenterComponent,
    ProjectListComponent,
    AddEditProjectComponent,
    ResourceListComponent,
    AddUpdateResourceComponent,
    RoasterComponent,
    AddRoasterComponent,
    AddEditBookRosterComponent,
   BreadcrumbsComponent,
    CostGroupListComponent,
    CostElementListComponent,
    AddUpdateCostElementComponent,
    AddUpdateCostGroupComponent,
    AddCurrencyComponent,
    SpinnerComponent,
    ProjectPriceComponent,
    UpdateprojectPriceByTMComponent,
    UpdateprojectPriceByTypeComponent,
    CustomDateFormat2,
    ContributionReportComponent,
    ProfitCenterActivitySummaryReportComponent,
    ResourceRelatedActivityComponent,
    PayrollCostsComponent,
    NonResourceRelatedActivityComponent,
    WeeklySummaryReportComponent
    //LoginComponent
    
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    //CompanyModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MomentDateModule,
    ToastrModule.forRoot()

  ],
 
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    
    BreadcrumbsService,DatePipe,MatDatepickerModule,CurrencyPipe


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }