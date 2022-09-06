import { Component, OnInit } from '@angular/core';

import { DataService } from './data.service';

@Component({
  selector: 'app-service-demo',
  templateUrl: './service-demo.component.html',
  styleUrls: ['./service-demo.component.scss'],
})
export class ServiceDemoComponent implements OnInit {
  list: string[] = [];
  count = 0;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // this.list = this.DataService.getList();
    this.list = this.dataService.list;

    this.dataService.count.subscribe((count) => {
      this.count = count;
    });
  }

  addItem() {
    this.dataService.addListItem('Vue');
  }
}
