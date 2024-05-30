import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonLayoutComponent } from './common-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { RoasterComponent } from 'src/app/roaster/roaster.component';
import { AddEditBookRosterComponent } from 'src/app/add-edit-book-roster/add-edit-book-roster.component';
import { AddRoasterComponent } from 'src/app/add-roaster/add-roaster.component';
import { AddUpdateGroupComponent } from 'src/app/add-update-group/add-update-group.component';
import { GroupComponent } from 'src/app/group/group.component';
import { AddEditCompanyComponent } from 'src/app/add-edit-company/add-edit-company.component';
import { CompanyListComponent } from 'src/app/company-list/company-list.component';
import { AddUpdateProfitCenterComponent } from 'src/app/add-update-profit-center/add-update-profit-center.component';
import { ProfitCenterListComponent } from 'src/app/profit-center-list/profit-center-list.component';
import { AddEditCustomerComponent } from 'src/app/add-edit-customer/add-edit-customer.component';
import { CustomerListComponent } from 'src/app/customer-list/customer-list.component';
import { AddEditCostCenterComponent } from 'src/app/add-edit-cost-center/add-edit-cost-center.component';
import { CostCenterComponent } from 'src/app/cost-center/cost-center.component';
import { AddEditProjectComponent } from 'src/app/add-edit-project/add-edit-project.component';
import { ProjectListComponent } from 'src/app/project-list/project-list.component';
import { AddUpdateResourceComponent } from 'src/app/add-update-resource/add-update-resource.component';
import { ResourceListComponent } from 'src/app/resource-list/resource-list.component';
import { AddUpdateCostGroupComponent } from 'src/app/add-update-cost-group/add-update-cost-group.component';
import { CostGroupListComponent } from 'src/app/cost-group-list/cost-group-list.component';
import { AddUpdateCostElementComponent } from 'src/app/add-update-cost-element/add-update-cost-element.component';
import { CostElementListComponent } from 'src/app/cost-element-list/cost-element-list.component';
import { AddCurrencyComponent } from 'src/app/add-currency/add-currency.component';
import { ProjectPriceComponent } from 'src/app/project-price/project-price.component';
import { UpdateprojectPriceByTMComponent } from 'src/app/updateproject-price-by-t-m/updateproject-price-by-t-m.component';
import { UpdateprojectPriceByTypeComponent } from 'src/app/updateproject-price-by-type/updateproject-price-by-type.component';
import { ContributionReportComponent } from 'src/app/contribution-report/contribution-report.component';
import { ProfitCenterActivitySummaryReportComponent } from 'src/app/profit-center-activity-summary-report/profit-center-activity-summary-report.component';
import { ResourceRelatedActivityComponent } from 'src/app/resource-related-activity/resource-related-activity.component';
import { PayrollCostsComponent } from 'src/app/payroll-costs/payroll-costs.component';
import { NonResourceRelatedActivityComponent } from 'src/app/non-resource-related-activity/non-resource-related-activity.component';
import { WeeklySummaryReportComponent } from 'src/app/weekly-summary-report/weekly-summary-report.component';
const routes: Routes = [
 
  {
    path: '',
   // canActivate: [AuthGuard],
    component: CommonLayoutComponent,
    children: [


      {
        path: 'ContributionReport',
        data: {
          breadcrumbs: [{ text: 'Contribution Report', path: '', icon: '' }]
        },
    
        children: [
    
           { path: '', component: ContributionReportComponent },
          {
            path: 'add',
            component: ProfitCenterActivitySummaryReportComponent,
            data: {
              breadcrumbs: [{ text: 'Add', path: '', icon: '' }]
            }
    
           },
    
        ]
    
      },
      {
        path: 'summary-report',
        data: {
          breadcrumbs: [{ text: 'Weekly Summary Report', path: '', icon: '' }]
        },
    
        children: [
    
           { path: '', component: WeeklySummaryReportComponent },    
    
        ]
    
      },
      {
        path: 'ResourceRelatedActivity',
        data: {
          breadcrumbs: [{ text: 'Resource Related Activity', path: '', icon: '' }]
        },
    
        children: [
    
           { path: '', component: ResourceRelatedActivityComponent },    
    
        ]
    
      },
      {
        path: 'PayrollCosts',
        data: {
          breadcrumbs: [{ text: 'Payroll Costs', path: '', icon: '' }]
        },
    
        children: [
    
           { path: '', component: PayrollCostsComponent },    
    
        ]
    
      },
      {
        path: 'ProfitCentreActivitySummaryReport',
        data: {
          breadcrumbs: [{ text: 'Profit Centre Activity Summary Report', path: '', icon: '' }]
        },
    
        children: [
    
           { path: '', component: ProfitCenterActivitySummaryReportComponent },    
    
        ]
    
      },
      {
        path: 'NonResourceRelatedActivity',
        data: {
          breadcrumbs: [{ text: 'Non-Resource Related Activity', path: '', icon: '' }]
        },
    
        children: [
    
           { path: '', component: NonResourceRelatedActivityComponent },    
    
        ]
    
      },

      {

        path: 'roster',
      
        data: {
      
          breadcrumbs: [{ text: 'Roster', path: '', icon: '' }]
      
        },
      
      
      
        children: [
      
      
      
           { path: '', component: RoasterComponent },
      
          {
      
            path: 'book/add',
      
            component: AddEditBookRosterComponent,
      
            data: {
      
              breadcrumbs: [{ text: 'Book', path: '', icon: '' }]
      
            }
      
      
      
          },
      
      
      
          {
      
            path: 'book/edit/:id/:resId',
      
            component: AddEditBookRosterComponent,
      
            data: {
      
              breadcrumbs: [{ text: 'Edit', path: '', icon: '' }]
      
      
      
            }
      
          },
      
          {
      
            path: 'edit/:resourceId',
      
            component: AddRoasterComponent,
      
            data: {
      
              breadcrumbs: [{ text: 'View', path: '', icon: '' }]
      
      
      
            }
      
          },
      
      
      
        ]
      
      
      
      },

      {
            path: 'group',
            data: {
              breadcrumbs: [{ text: 'Group', path: '', icon: '' }]
            },
        
            children: [
        
              { path: '', component: GroupComponent },
              {
                path: 'add',
                component: AddUpdateGroupComponent,
                data: {
                  breadcrumbs: [{ text: 'Add', path: '', icon: '' }]
                }
        
              },
        
              {
                path: 'edit/:id',
                component: AddUpdateGroupComponent,
                data: {
                  breadcrumbs: [{ text: 'Edit', path: '', icon: '' }]
        
                }
              },
        
            ]
        
          },

   {
    path: 'company',
    data: {
      breadcrumbs: [{ text: 'Company', path: '', icon: '' }]
    },

    children: [

       { path: '', component: CompanyListComponent },
      {
        path: 'add',
        component: AddEditCompanyComponent,
        data: {
          breadcrumbs: [{ text: 'Add', path: '', icon: '' }]
        }

      },

      {
        path: 'edit/:id',
        component: AddEditCompanyComponent,
        data: {
          breadcrumbs: [{ text: 'Edit', path: '', icon: '' }]

        }
      },

    ]

  },
  {
    path: 'currency',
    data: {
      breadcrumbs: [{ text: 'Currency', path: '', icon: '' }]
    },

    children: [

      { path: '', component: AddCurrencyComponent },
      // {
      //   path: 'add',
      //   component: AddUpdateGroupComponent,
      //   data: {
      //     breadcrumbs: [{ text: 'Add', path: '', icon: '' }]
      //   }

      // },

      // {
      //   path: 'edit/:id',
      //   component: AddUpdateGroupComponent,
      //   data: {
      //     breadcrumbs: [{ text: 'Edit', path: '', icon: '' }]

      //   }
      // },

    ]

  },

  {
  path: 'profitCenter',
  data: {
    breadcrumbs: [{ text: 'profit Center', path: '', icon: '' }]
  },

  children: [

     { path: '', component: ProfitCenterListComponent },
    {
      path: 'add',
      component: AddUpdateProfitCenterComponent,
      data: {
        breadcrumbs: [{ text: 'Add', path: '', icon: '' }]
      }

    },

    {
      path: 'edit/:id',
      component: AddUpdateProfitCenterComponent,
      data: {
        breadcrumbs: [{ text: 'Edit', path: '', icon: '' }]

      }
    },

  ]

},

{
  path: 'customer',
  data: {
    breadcrumbs: [{ text: 'Customer', path: '', icon: '' }]
  },

  children: [

     { path: '', component: CustomerListComponent },
    {
      path: 'add',
      component: AddEditCustomerComponent,
      data: {
        breadcrumbs: [{ text: 'Add', path: '', icon: '' }]
      }

    },

    {
      path: 'edit/:id',
      component: AddEditCustomerComponent,
      data: {
        breadcrumbs: [{ text: 'Edit', path: '', icon: '' }]

      }
    },

  ]

},


{
  path: 'costCenter',
  data: {
    breadcrumbs: [{ text: 'Cost Center', path: '', icon: '' }]
  },

  children: [

     { path: '', component: CostCenterComponent },
    {
      path: 'add',
      component: AddEditCostCenterComponent,
      data: {
        breadcrumbs: [{ text: 'Add', path: '', icon: '' }]
      }

    },

    {
      path: 'edit/:id',
      component: AddEditCostCenterComponent,
      data: {
        breadcrumbs: [{ text: 'Edit', path: '', icon: '' }]

      }
    },

  ]

},

{
  path: 'project',
  data: {
    breadcrumbs: [{ text: 'Project', path: '', icon: '' }]
  },

  children: [

     { path: '', component:ProjectListComponent },
    {
      path: 'add',
      component: AddEditProjectComponent,
      data: {
        breadcrumbs: [{ text: 'Add', path: '', icon: '' }]
      }

    },

    {
      path: 'edit/:id',
      component: AddEditProjectComponent,
      data: {
        breadcrumbs: [{ text: 'Edit', path: '', icon: '' }]

      }
    },

  ]

},

{
  path: 'resource',
  data: {
    breadcrumbs: [{ text: 'Resource', path: '', icon: '' }]
  },

  children: [

     { path: '', component:ResourceListComponent },

    {
      path: 'add',
      component: AddUpdateResourceComponent,
      data: {
        breadcrumbs: [{ text: 'Add', path: '', icon: '' }]
      }

    },

    {
      path: 'edit/:id',
      component: AddUpdateResourceComponent,
      data: {
        breadcrumbs: [{ text: 'Edit', path: '', icon: '' }]

      }
    },

  ]

},

  {
    path: 'costGroup',
    data: {
      breadcrumbs: [{ text: 'Cost Group', path: '', icon: '' }]
    },
  
    children: [
  
       { path: '', component:CostGroupListComponent },
  
      {
        path: 'add',
        component: AddUpdateCostGroupComponent,
        data: {
          breadcrumbs: [{ text: 'Add', path: '', icon: '' }]
        }
  
      },
  
      {
        path: 'edit/:id',
        component: AddUpdateCostGroupComponent,
        data: {
          breadcrumbs: [{ text: 'Edit', path: '', icon: '' }]
  
        }
      },
  
    ]
  },

  {
    path: 'costElement',
    data: {
      breadcrumbs: [{ text: 'Cost Element', path: '', icon: '' }]
    },
  
    children: [
  
       { path: '', component:CostElementListComponent },
  
      {
        path: 'add',
        component: AddUpdateCostElementComponent,
        data: {
          breadcrumbs: [{ text: 'Add', path: '', icon: '' }]
        }
  
      },
  
      {
        path: 'edit/:id',
        component:AddUpdateCostElementComponent,
        data: {
          breadcrumbs: [{ text: 'Edit', path: '', icon: '' }]
  
        }
      },
  
    ]
  },
  {
    path: 'projectPrice',
    data: {
      breadcrumbs: [{ text: 'Project Pricing', path: '', icon: '' }]
    },

    children: [

      { path: '', component: ProjectPriceComponent },
      
      {
        path: 'update/:id',
        component: UpdateprojectPriceByTMComponent,
        data: {
          breadcrumbs: [{ text: 'Update', path: '', icon: '' }]

        }
      },
      {
        path: 'edit/:id/:type',
        component: UpdateprojectPriceByTypeComponent,
        data: {
          breadcrumbs: [{ text: 'Update', path: '', icon: '' }]

        }
      },

    ]

  },




        
    
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonLayoutRoutingModule { }
