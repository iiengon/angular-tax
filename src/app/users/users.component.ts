import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaxData } from '../models/tax-data';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  public myForm!: FormGroup;
  public isShowAdditional: boolean = false;
  public isLinear = true;
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
      month: [''],
      year: [''],
      saleAmount: [''],
      taxAmount: [''],
      surcharge: [''],
      penalty: [''],
      totalAmount: ['']

    })
  }
  submitForm() {

    //getRawValue not send value disable
    const formData = new TaxData(this.myForm.getRawValue());
    console.log('formData', formData);


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
}
