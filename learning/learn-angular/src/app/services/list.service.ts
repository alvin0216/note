import { Injectable } from '@angular/core';

// Injectable 装饰器声明服务
@Injectable({
  // 作用域设定 root 表示默认注入，注入到 AppModule 里面
  providedIn: 'root',
})
export class ListService {
  list: string[] = ['Angular', 'React'];
  constructor() {}

  getList() {
    return this.list;
  }

  addListItem(str: string) {
    this.list.push(str);
  }
}
