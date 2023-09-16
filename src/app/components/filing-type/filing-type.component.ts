import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-filing-type',
  templateUrl: './filing-type.component.html',
  styleUrls: ['./filing-type.component.scss']
})
export class FilingTypeComponent implements OnInit {
  @Input() public form!: FormGroup;
  @Input() public filingTypes: { name: string, value: string }[] = [];
  @Output() aa: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }
  onSelectValue(value: string) {
    this.aa.emit(value);
  }
}
