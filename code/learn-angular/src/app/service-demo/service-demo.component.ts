import { Component, OnInit } from '@angular/core';

import { ListService } from '../services/list.service';

@Component({
  selector: 'app-service-demo',
  templateUrl: './service-demo.component.html',
  styleUrls: ['./service-demo.component.scss'],
})
export class ServiceDemoComponent implements OnInit {
  list: string[] = [];

  constructor(private listService: ListService) {}

  ngOnInit(): void {
    this.getList();
  }

  addItem() {
    this.listService.addListItem('Vue');
  }

  getList() {
    this.list = this.listService.getList();
  }
}
