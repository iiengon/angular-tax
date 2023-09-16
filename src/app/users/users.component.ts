import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaxData, MapTaxDatas } from '../models/tax-data';
import { MatHorizontalStepper } from '@angular/material/stepper/stepper';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private fb: FormBuilder) {

  }
  @ViewChild('stepper') stepper!: MatHorizontalStepper;
  public myForm!: FormGroup;
  public isShowAdditional: boolean = false;
  public isLinear = true;
  public formData: TaxData = {};
  filingTypes = [
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

  ngOnInit(): void {
    this.myForm = this.fb.group({
      filingType: ['0'],
      month: ['', Validators.required],
      year: ['', Validators.required],
      saleAmount: ['', Validators.required],
      taxAmount: ['', Validators.required],
      surcharge: [''],
      penalty: [''],
      totalAmount: ['']

    })
  }
  confirmForm() {



    alert(JSON.stringify(this.formData));


  }
  onChangeSelectFilingType(event: string) {
    console.log('onChangeSelectFilingType', event);
    (event == '1') ? this.isShowAdditional = true : this.isShowAdditional = false;
    this.myForm.get('surcharge')?.disable();
    this.myForm.get('penalty')?.disable();
    this.myForm.get('totalAmount')?.disable();
    this.myForm.reset();
    this.myForm.get('filingType')?.setValue(event);
  }
  onFormatNumberDecimal() {

    if (!this.myForm.get('saleAmount')?.value) {
      return;
    }

    const saleAmountValue = this.myForm.get('saleAmount')?.value.replace(',', '');

    const value = this.numberWithCommas(parseFloat(saleAmountValue).toFixed(2))
    this.myForm.get('saleAmount')?.setValue(`${value} THB`);
    //setvalue taxAmount

    const totalTaxAmountVat = this.numberWithCommas((parseFloat(saleAmountValue) * 0.07).toFixed(2));
    this.myForm.get('taxAmount')?.setValue(`${totalTaxAmountVat} THB`);

    if (this.myForm.get('filingType')?.value == '1') {
      //setValueAdditonal
      this.setValueAdditonal(totalTaxAmountVat);
    }


  }
  numberWithCommas(x: string) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  setValueAdditonal(value: string) {
    const surchargeValue = ((parseFloat(value)) * 0.1).toFixed(2);
    const penaltyValue = (parseFloat('200')).toFixed(2);
    const sumTotalAmount = (parseFloat(surchargeValue) + parseFloat(penaltyValue) + parseFloat(value));
    this.myForm.get('surcharge')?.setValue(`${surchargeValue} THB`);
    this.myForm.get('penalty')?.setValue(`${penaltyValue} THB`);

    this.myForm.get('totalAmount')?.setValue(`${sumTotalAmount} THB`);


  }
  onNextStep() {
    if (!this.myForm.valid) {
      // this should make all invalid fields light up in red
      this.myForm.markAllAsTouched();
      return;
    }
    //getRawValue not send value disable
    this.formData = new MapTaxDatas(this.myForm.getRawValue());
    console.log('formData', this.formData);
    this.stepper.next();
  }
}
