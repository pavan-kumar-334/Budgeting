import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_helpers/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoaderService } from '../../_helpers/loader.service';
import { ConfirmedDialogServiceService } from 'src/app/confirmed-dialog-service.service';


@Component({
    selector     : 'login',
    templateUrl  : './login.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup = this._formBuilder.group({
      username   : ['', Validators.required],
      password: ['', Validators.required],
      ...(environment.env==='production' && {recaptcha: ['', Validators.required]})
     
  });
    returnUrl: string = 'roster';
    error = '';
    isLoggedOut = false;
    isLocked = false;
    firstName = '';
    errMsg = '';
    siteKey : string = environment.siteKey;
    environment = environment;
    constructor(
        private _formBuilder: FormBuilder,
        private _matDialog: MatDialog,
        private authService: AuthService,
        private confirmDialogService: ConfirmedDialogServiceService,
        private route: ActivatedRoute,
        private router: Router,
        private loadingService: LoaderService
    )
    {
    }

    resetSession(): void
    {
        this.isLoggedOut = false;
        this.isLocked = false;
        this.authService.clearAll();
        this.loginForm.reset();
    }

    private setLoginFormData(currentUser: any): void
    {
       
        this.loginForm.patchValue({email: currentUser.emailAddress});
        this.firstName = currentUser.firstName;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
      
        this.errMsg = '';
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/roster'; // NEED TO REDIRECT TO DASHBOARD HERE

        this.loginForm.valueChanges.subscribe(val => {
            this.error = '';
        });

        this.route.params.subscribe((params: Params) => {
            if ( this.authService.currentUserValue )
            {
              this.setLoginFormData(this.authService.currentUserValue);
            }
        });
        // console.log("environment.production==="+environment.production)
        // console.log("environment.siteKey==="+environment.siteKey)
        // console.log("environment.env==="+environment.env)
    }

    onSubmit(): void
    {
        this.errMsg = '';
        // stop here if form is invalid
        // this.errMsg = '';
        // if ( this.loginForm.invalid )
        // {
        //     return;
        // }
        // this.router.navigate([this.returnUrl]);

    //     this.loadingService.setLoading(true);
    //     this.authService.login(this.loginForm.value)
    //         .pipe(first())
    //         .subscribe(
    //             (data: any) => {
    //                 if ( !data.error)
    //                 {
    //                   this.router.navigate([this.returnUrl]);
    //                 }
                   
    //                 else
    //                 {
    //                     // this.error = 'Incorrect email address or password!';
    //                     this.errMsg ='Incorrect Username address or password!';
    //                 }
    //                 this.loadingService.setLoading(false);
    //             }, (err:any) => {
    //                 this.errMsg =  'Incorrect Username address or password!';
    //                 this.loadingService.setLoading(false);
    //             });


    this.authService.signIn(this.loginForm.value).subscribe((data) => {
        if (data) {
         localStorage.setItem("token",data.accessToken)
         this.router.navigate(['/roster']);  
        // this.router.navigate(['/company']);         
        }
        
      },error=>{
      this.errMsg =  'Incorrect email address or password!';
      // location.reload();     
      }
      );
     }
}
