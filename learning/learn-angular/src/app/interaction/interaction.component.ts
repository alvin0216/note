import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-interaction',
  templateUrl: './interaction.component.html',
  styleUrls: ['./interaction.component.scss'],
})
export class InteractionComponent implements OnInit {
  count = 1;

  // 通过 viewChild 访问子组件实例
  // <app-title #title></app-title>

  @ViewChild('title') child: any;
  constructor() {}

  ngOnInit(): void {}

  handleClick() {
    this.child.setTitle(`title is setted ${Date.now()}`);
  }

  increaseCount(c: number) {
    this.count = c;
  }
}
