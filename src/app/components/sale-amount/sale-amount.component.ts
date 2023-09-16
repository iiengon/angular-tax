import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-sale-amount',
  templateUrl: './sale-amount.component.html',
  styleUrls: ['./sale-amount.component.scss']
})
export class SaleAmountComponent implements OnInit {

  @Input()
  public form!: FormGroup;
  @Output() onChangeInput: EventEmitter<string> = new EventEmitter<string>();
  constructor(

  ) { }

  ngOnInit(): void {
  }
  onFormatNumberDecimal() {
    this.onChangeInput.emit();
  }
}
