import { Component, OnInit } from '@angular/core';

import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-service-child',
  templateUrl: './service-child.component.html',
  styleUrls: ['./service-child.component.scss'],
})
export class ServiceChildComponent implements OnInit {
  list: string[] = [];

  constructor(private listService: ListService) {}

  ngOnInit(): void {
    this.list = this.listService.getList();
  }
}
