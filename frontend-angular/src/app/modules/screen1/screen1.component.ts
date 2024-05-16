import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormService } from '../../../services/form.service';

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

  screenOne : FormGroup = this.fb.group({
    name: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    budget: new FormControl('')
  })

  constructor(private apiService: ApiService, private fb: FormBuilder, private formService: FormService){}

  ngOnInit(): void {
    this.init();
  }

  async init(){
    this.countries = await this.apiService.getCountries();
  }

  async chooseCountry(event: any){
    this.countrySelected = event.target.value.split("-");
    this.cities = await this.apiService.getCities(this.countrySelected[0]);
  }

  validateForm(){
    if(this.screenOne.valid){
      this.activeScreen = 'screen_two';

      this.screenOne.controls['budget'].setValidators(Validators.required);
      this.screenOne.controls['budget'].updateValueAndValidity();
    }
  }

  async validateFormTwo(){
    if(this.screenOne.valid){
      this.activeScreen = 'screen_three';

      this.weather = await this.apiService.getWeather(this.screenOne.controls['city'].value)
      console.log(this.weather)
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
