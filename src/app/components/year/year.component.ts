import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.scss']
})
export class YearComponent implements OnInit {
  @Input() public form!: FormGroup;
  constructor() { }
  public years = ['2020', '2021', '2022', '2023'];

  ngOnInit(): void {
  }

}
