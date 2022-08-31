import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pipe',
  templateUrl: './pipe.component.html',
  styleUrls: ['./pipe.component.scss'],
})
export class PipeComponent implements OnInit {
  now = Date.now();
  a: number = 0.259;
  b: number = 1.3495;

  constructor() {}

  ngOnInit(): void {}
}
