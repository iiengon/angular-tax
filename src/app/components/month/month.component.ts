import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {
  @Input()
  public form!: FormGroup;
  public currentMonth: any;
  public months = [
    {
      'label': 'January',
      'value': '01'
    },
    {
      'label': 'February',
      'value': '02'
    },
    {
      'label': 'March',
      'value': '03'
    },
    {
      'label': 'April',
      'value': '04'
    },
    {
      'label': 'May',
      'value': '05'
    },
    {
      'label': 'June',
      'value': '06'
    },
    {
      'label': 'July',
      'value': '07'
    },
    {
      'label': 'August',
      'value': '08'
    },
    {
      'label': 'September',
      'value': '09'
    },
    {
      'label': 'October',
      'value': '10'
    },
    {
      'label': 'November',
      'value': '11'
    },
    {
      'label': 'December',
      'value': '12'
    }
  ]
  constructor() { }

  ngOnInit(): void {
    const d = new Date();
    this.currentMonth = d.getMonth() + 1;

  }

  checkOverMonth() {
    console.log(this.months);
  }
}
