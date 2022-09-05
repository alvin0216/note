import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-life-cycle',
  templateUrl: './life-cycle.component.html',
  styleUrls: ['./life-cycle.component.scss'],
})
export class LifeCycleComponent implements OnInit {
  count = 1;

  constructor() {}

  ngOnInit(): void {}

  increase() {
    this.count++;
  }
}
