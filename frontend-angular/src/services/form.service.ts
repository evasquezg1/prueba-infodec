import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  hasErrorsFieldForm(form:FormGroup, field: string, showErrors:boolean = false): boolean{

    if (form.get(field)?.invalid &&  (form.get(field)?.dirty ||
        form.get(field)?.touched || showErrors)) {
          return true
    }

    return false

  }
}
