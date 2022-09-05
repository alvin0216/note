import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent implements OnInit {
  @Input() count!: number;
  @Output() increaseCount = new EventEmitter<number>();

  title = 'This is title';

  constructor() {}

  ngOnInit(): void {}

  setTitle(str: string): void {
    this.title = str;
  }
}
