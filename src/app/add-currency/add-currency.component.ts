import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../company.service';
import { CurrencyService } from '../currency.service';
import { ResourceService } from '../resource.service';

@Component({
  selector: 'app-add-currency',
  templateUrl: './add-currency.component.html',
  styleUrls: ['./add-currency.component.scss']
})
export class AddCurrencyComponent implements OnInit {
  countryList: any;
  baseCurrencyLatestId: any;
  savedFormData: any;
  checkId:boolean = false;
  superFormsdata: FormGroup = this.fb.group({
    conversionCurrencies: this.fb.array([]),
    baseConvesionRate: ['', Validators.required],
    baseCurrency: ['', Validators.required],
    id: [''],
  });
  selected = 'AUD';
  constructor(private fb: FormBuilder,
    private resourceService: ResourceService,
    private companyService: CompanyService,
    private currencyService: CurrencyService,
    private toasterService:ToastrService
  ) { }

  ngOnInit(): void {
   // this.addResource();
 
    this.getCountries();
   // this.getCurrencyList();
    this.getCurrencyById();
  }
  onSubmited() {
    if (this.superFormsdata.invalid) {
      return;
    }
    let dataa = this.baseCurrencyLatestId.id

    const formData = JSON.parse(JSON.stringify(this.superFormsdata.getRawValue()));
    var currencyName: any[] = [];
    formData.conversionCurrencies.map((data: any, index: any) => {
      currencyName.push(data.currencyCode);
    });
    const uniqueValues = new Set(currencyName.map(v => v));
    if (uniqueValues.size < currencyName.length) {
      this.toasterService.error("Currency Is Already Exist");
      return;
    }
    this.currencyService.addCurrency(formData).subscribe((data) => {
      this.toasterService.success(data.message, 'Success');
    })
  }
  getCurrencyById(){
    let url = "";
    this.currencyService.getCurrency(url).subscribe((data) => {
      this.baseCurrencyLatestId = data.content[0];
   
    let currencyId = this.baseCurrencyLatestId.id;
    this.currencyService.getCurrencyById(currencyId).subscribe((data)=>{
      this.savedFormData = data
      this.superFormsdata.patchValue(this.savedFormData);
      this.conversionCurrencies.patchValue(this.savedFormData.conversionCurrencies);
      let currency  = this.savedFormData.conversionCurrencies;
      for (let i = 0; i < currency.length; i++) {
       // for(let j =0; j<=i-1; j++){
          this.addResource();
        //}
        

        let obj = {
          currencyCode: currency[i].currencyCode,

          conversionRate: currency[i].conversionRate,
         

        }

        this.conversionCurrencies.controls[i].patchValue(obj);

        //  }
      }
    })
  })
  }

  getCountries() {

    this.companyService.getCountrylist().subscribe((data) => {
      if (data) {
        this.countryList = data;
      }
    })
  }

  addResource() {

    let initData = this.fb.group({
      currencyCode: [''],
      conversionRate: ['', Validators.required],
    });
    (<FormArray>this.superFormsdata.get('conversionCurrencies')).push(initData);
  }
  curencySubmit() {

  }
  get conversionCurrencies(): FormArray {
    return this.superFormsdata.get("conversionCurrencies") as FormArray
  }
  removeCandidate(i: number) {
    this.conversionCurrencies.removeAt(i);
  }


}
