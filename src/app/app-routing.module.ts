import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditBookRosterComponent } from './add-edit-book-roster/add-edit-book-roster.component';
import { AddEditCompanyComponent } from './add-edit-company/add-edit-company.component';
import { AddEditCostCenterComponent } from './add-edit-cost-center/add-edit-cost-center.component';
import { AddEditCustomerComponent } from './add-edit-customer/add-edit-customer.component';
import { AddEditProjectComponent } from './add-edit-project/add-edit-project.component';
import { AddRoasterComponent } from './add-roaster/add-roaster.component';
import { AddUpdateCostElementComponent } from './add-update-cost-element/add-update-cost-element.component';
import { AddUpdateCostGroupComponent } from './add-update-cost-group/add-update-cost-group.component';
import { AddUpdateGroupComponent } from './add-update-group/add-update-group.component';
import { AddUpdateProfitCenterComponent } from './add-update-profit-center/add-update-profit-center.component';
import { AddUpdateResourceComponent } from './add-update-resource/add-update-resource.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CostCenterComponent } from './cost-center/cost-center.component';
import { CostElementListComponent } from './cost-element-list/cost-element-list.component';
import { CostGroupListComponent } from './cost-group-list/cost-group-list.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { GroupComponent } from './group/group.component';
import { LoginComponent } from './modules/auth/login/login.component';

//import { AddUpdateCompanyComponent } from './modules/company/add-update-company/add-update-company.component';
import { CompanyComponent } from './modules/company/company/company.component';
import { ProfitCenterListComponent } from './profit-center-list/profit-center-list.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ResourceListComponent } from './resource-list/resource-list.component';
import { RoasterComponent } from './roaster/roaster.component';
//import { UpdateGroupComponent } from './update-group/update-group.component';

const routes: Routes = [

  //{ path: '', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  { path: '', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },

  {
    path: '',
    loadChildren: () => import('./modules/common-layout/common-layout.module').then(m => m.CommonLayoutModule)
},

//   {
//     path: 'group',
//     data: {
//       breadcrumbs: [{ text: 'Group', path: '', icon: '' }]
//     },

//     children: [

//       { path: '', component: GroupComponent },
//       {
//         path: 'add',
//         component: AddUpdateGroupComponent,
//         data: {
//           breadcrumbs: [{ text: 'Add', path: '', icon: '' }]
//         }

//       },

//       {
//         path: 'edit/:id',
//         component: AddUpdateGroupComponent,
//         data: {
//           breadcrumbs: [{ text: 'Edit', path: '', icon: '' }]

//         }
//       },

//     ]

//   },

//   {
//     path: 'company',
//     data: {
//       breadcrumbs: [{ text: 'Company', path: '', icon: '' }]
//     },

//     children: [

//        { path: '', component: CompanyListComponent },
//       {
//         path: 'add',
//         component: AddEditCompanyComponent,
//         data: {
//           breadcrumbs: [{ text: 'Add', path: '', icon: '' }]
//         }

//       },

//       {
//         path: 'edit/:id',
//         component: AddEditCompanyComponent,
//         data: {
//           breadcrumbs: [{ text: 'Edit', path: '', icon: '' }]

//         }
//       },

//     ]

//   },

  
// {
//   path: 'profitCenter',
//   data: {
//     breadcrumbs: [{ text: 'profit Center', path: '', icon: '' }]
//   },

//   children: [

//      { path: '', component: ProfitCenterListComponent },
//     {
//       path: 'add',
//       component: AddUpdateProfitCenterComponent,
//       data: {
//         breadcrumbs: [{ text: 'Add', path: '', icon: '' }]
//       }

//     },

//     {
//       path: 'edit/:id',
//       component: AddUpdateProfitCenterComponent,
//       data: {
//         breadcrumbs: [{ text: 'Edit', path: '', icon: '' }]

//       }
//     },

//   ]

// },
  
// {
//   path: 'customer',
//   data: {
//     breadcrumbs: [{ text: 'Customer', path: '', icon: '' }]
//   },

//   children: [

//      { path: '', component: CustomerListComponent },
//     {
//       path: 'add',
//       component: AddEditCustomerComponent,
//       data: {
//         breadcrumbs: [{ text: 'Add', path: '', icon: '' }]
//       }

//     },

//     {
//       path: 'edit/:id',
//       component: AddEditCustomerComponent,
//       data: {
//         breadcrumbs: [{ text: 'Edit', path: '', icon: '' }]

//       }
//     },

//   ]

// },
// {
//   path: 'costCenter',
//   data: {
//     breadcrumbs: [{ text: 'Cost Center', path: '', icon: '' }]
//   },

//   children: [

//      { path: '', component: CostCenterComponent },
//     {
//       path: 'add',
//       component: AddEditCostCenterComponent,
//       data: {
//         breadcrumbs: [{ text: 'Add', path: '', icon: '' }]
//       }

//     },

//     {
//       path: 'edit/:id',
//       component: AddEditCostCenterComponent,
//       data: {
//         breadcrumbs: [{ text: 'Edit', path: '', icon: '' }]

//       }
//     },

//   ]

// },
// {
//   path: 'project',
//   data: {
//     breadcrumbs: [{ text: 'Project', path: '', icon: '' }]
//   },

//   children: [

//      { path: '', component:ProjectListComponent },
//     {
//       path: 'add',
//       component: AddEditProjectComponent,
//       data: {
//         breadcrumbs: [{ text: 'Add', path: '', icon: '' }]
//       }

//     },

//     {
//       path: 'edit/:id',
//       component: AddEditProjectComponent,
//       data: {
//         breadcrumbs: [{ text: 'Edit', path: '', icon: '' }]

//       }
//     },

//   ]

// },
  
// {
//   path: 'resource',
//   data: {
//     breadcrumbs: [{ text: 'Resource', path: '', icon: '' }]
//   },

//   children: [

//      { path: '', component:ResourceListComponent },

//     {
//       path: 'add',
//       component: AddUpdateResourceComponent,
//       data: {
//         breadcrumbs: [{ text: 'Add', path: '', icon: '' }]
//       }

//     },

//     {
//       path: 'edit/:id',
//       component: AddUpdateResourceComponent,
//       data: {
//         breadcrumbs: [{ text: 'Edit', path: '', icon: '' }]

//       }
//     },

//   ]

// },


//   {
//     path: 'roster',
//     component: RoasterComponent,

//   },
//   {
//     path: 'roaster/add',
//     component: AddRoasterComponent,

//   },
//   {

//     path: 'roster/edit/:resourceId',

//     component: AddRoasterComponent,

//   },

//   {
//     path: 'roster/book/add',
//     component: AddEditBookRosterComponent,

//   },

//   {

//     path: 'roster/book/edit/:id',

//     component: AddEditBookRosterComponent,


//   },
//   {

//     path: 'roster',
  
//     data: {
  
//       breadcrumbs: [{ text: 'Roster', path: '', icon: '' }]
  
//     },
  
  
  
//     children: [
  
  
  
//        { path: '', component: RoasterComponent },
  
//       {
  
//         path: 'book/add',
  
//         component: AddEditBookRosterComponent,
  
//         data: {
  
//           breadcrumbs: [{ text: 'Book', path: '', icon: '' }]
  
//         }
  
  
  
//       },
  
  
  
//       {
  
//         path: 'book/edit/:id',
  
//         component: AddEditBookRosterComponent,
  
//         data: {
  
//           breadcrumbs: [{ text: 'Edit', path: '', icon: '' }]
  
  
  
//         }
  
//       },
  
//       {
  
//         path: 'edit/:resourceId',
  
//         component: AddRoasterComponent,
  
//         data: {
  
//           breadcrumbs: [{ text: 'View', path: '', icon: '' }]
  
  
  
//         }
  
//       },
  
  
  
//     ]
  
  
  
//   },



//   {
//     path: 'costGroup',
//     data: {
//       breadcrumbs: [{ text: 'Cost Group', path: '', icon: '' }]
//     },
  
//     children: [
  
//        { path: '', component:CostGroupListComponent },
  
//       {
//         path: 'add',
//         component: AddUpdateCostGroupComponent,
//         data: {
//           breadcrumbs: [{ text: 'Add', path: '', icon: '' }]
//         }
  
//       },
  
//       {
//         path: 'edit/:id',
//         component: AddUpdateCostGroupComponent,
//         data: {
//           breadcrumbs: [{ text: 'Edit', path: '', icon: '' }]
  
//         }
//       },
  
//     ]
//   },



//   {
//     path: 'costElement',
//     data: {
//       breadcrumbs: [{ text: 'Cost Element', path: '', icon: '' }]
//     },
  
//     children: [
  
//        { path: '', component:CostElementListComponent },
  
//       {
//         path: 'add',
//         component: AddUpdateCostElementComponent,
//         data: {
//           breadcrumbs: [{ text: 'Add', path: '', icon: '' }]
//         }
  
//       },
  
//       {
//         path: 'edit/:id',
//         component:AddUpdateCostElementComponent,
//         data: {
//           breadcrumbs: [{ text: 'Edit', path: '', icon: '' }]
  
//         }
//       },
  
//     ]
//   },

 
  
  




]

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
