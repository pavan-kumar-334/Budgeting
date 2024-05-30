import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { NgxCaptchaModule } from 'ngx-captcha';

const authRoutes: Route[] = [
  { path: '', component: AuthComponent, children: [
      {path: 'login', component: LoginComponent},
      {path: '', redirectTo: 'login', pathMatch: 'full'}
      ]
  } 
];


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forChild(authRoutes),
    CommonModule,
    SharedModule,
   // NgxCaptchaModule
  ]
})
export class AuthModule { }
