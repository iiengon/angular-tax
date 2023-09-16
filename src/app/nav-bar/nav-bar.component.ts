import { Component, OnInit } from '@angular/core';
// import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  // providers: [{ provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false } }]
})
export class NavBarComponent implements OnInit {

  constructor(private fb: FormBuilder) {

    this.myForm = this.fb.group({})
    this.myForm = this.fb.group({
      filterType: ['0'],
      totalValue: [''],
      totalVat: [''],
      surcharge: [''],
      penalty: ['']
    })
  }
  public myForm: FormGroup;
  public isShowAdditional: boolean = false;
  public isLinear = true;
  filterTypes = [
    {
      'name': 'Ordinary Filing',
      'value': '0'
    },
    {
      'name': 'Additional Filling',
      'value': '1'
    }
    ,
  ];


  ngOnInit() {


  }
  onFormatNumberDecimal() {
    if (!this.myForm.get('totalValue')?.value) {
      return;
    }

    const totalValue = this.myForm.get('totalValue')?.value.replace(',', '');
    // console.log('totalValue', totalValue)

    const value = this.numberWithCommas(parseFloat(totalValue).toFixed(2))
    this.myForm.get('totalValue')?.setValue(`${value} THB`);
    this.setValueAdditonal(totalValue);
    //change totalVat

  }

  selectOptions(value: string) {
    (value == '1') ? this.isShowAdditional = true : this.isShowAdditional = false;
    this.myForm.get('surcharge')?.disable();
    this.myForm.get('penalty')?.disable();
    this.myForm.reset();
    this.myForm.get('filterType')?.setValue(value);

  }
  setValueAdditonal(value: string) {
    console.log('setValueAdditonal', value);
    this.myForm.get('surcharge')?.setValue(value);

  }
  numberWithCommas(x: string) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  onSubmit() {
    console.log(this.myForm.value);
  }


}



