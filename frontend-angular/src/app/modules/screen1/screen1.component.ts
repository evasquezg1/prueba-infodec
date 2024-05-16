import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormService } from '../../../services/form.service';
import { CurrencyConverterService } from '../../../services/currency.service';

@Component({
  selector: 'app-screen1',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './screen1.component.html',
  styleUrl: './screen1.component.css'
})
export class Screen1Component implements OnInit{

  countries         : any = [];
  cities            : any = [];
  weather           : any = [];

  countrySelected   : any;
  cityelected       : any;

  showErrors        : boolean = false;

  activeScreen      : string = "screen_one";

  priceCurrency     : number = 0;
  budgetConverter   : any;

  screenOne : FormGroup = this.fb.group({
    name: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    budget: new FormControl('')
  })

  constructor(private apiService: ApiService, private fb: FormBuilder, private formService: FormService, private currencyConverter: CurrencyConverterService){}

  ngOnInit(): void {
    this.init();
  }

  async init(){
    this.countries = await this.apiService.getCountries();
  }

  async chooseCountry(event: any){
    this.countrySelected = event.target.value;
    this.cities = await this.apiService.getCities(this.countries[this.countrySelected]?.id);
  }

  validateForm(){
    if(this.screenOne.valid){
      this.activeScreen = 'screen_two';

      this.screenOne.controls['budget'].setValidators(Validators.compose([Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]));
      this.screenOne.controls['budget'].updateValueAndValidity();
    }
  }

  async validateFormTwo(){
    if(this.screenOne.valid){
      this.activeScreen = 'screen_three';

      this.weather = await this.apiService.getWeather(this.screenOne.controls['city'].value)
      this.priceCurrency = await this.currencyConverter.getCurrencyConverter(this.countries[this.countrySelected]?.currency);
      this.budgetConverter = this.screenOne.controls['budget'].value/this.priceCurrency;

      const { name, country, city, budget } = this.screenOne.getRawValue();

      const data_ = {
        name,
        country: this.countries[this.countrySelected]?.name_country,
        city,
        budget,
        weather: this.weather?.current?.feelslike_c,
        local_currency: this.countries[this.countrySelected]?.currency,
        symbol_currency: this.countries[this.countrySelected]?.symbol_currency,
        budget_local: this.budgetConverter,
        exchange_rate: this.priceCurrency
      }

      const resp = await this.apiService.saveHistory(data_);

    }
  }

  goToBack(screen: any){
    this.activeScreen = screen;
    switch(screen){
      case 'screen_one':
        this.screenOne.controls['budget'].setValidators(null);
        this.screenOne.controls['budget'].updateValueAndValidity();
      break;
    }
  }

  hasErrorsFieldForm(field: string): Boolean {
    const form = this.screenOne;
    return this.formService.hasErrorsFieldForm(form, field, this.showErrors);
  }

}
