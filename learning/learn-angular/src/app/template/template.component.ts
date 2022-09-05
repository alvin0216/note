import {
  Component,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
})
export class TemplateComponent implements OnInit {
  list = [
    { name: 'A', value: 1 },
    { name: 'B', value: 2 },
    { name: 'C', value: 3 },
    { name: 'D', value: 4 },
  ];

  count = 1;

  constructor() {}

  ngOnInit(): void {}

  addItem(len: number) {
    this.list.push({ name: `${len}`, value: len });
  }

  increaseCount() {
    this.count++;
  }
}
