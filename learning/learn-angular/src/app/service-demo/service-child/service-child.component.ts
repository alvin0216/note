import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';

@Component({
  selector: 'app-service-child',
  templateUrl: './service-child.component.html',
  styleUrls: ['./service-child.component.scss'],
})
export class ServiceChildComponent implements OnInit {
  list: string[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.list = this.dataService.getList();
  }
}
