import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

// Injectable 装饰器声明服务
@Injectable({
  // 作用域设定 root 表示默认注入，注入到 AppModule 里面
  providedIn: 'root',
})
export class DataService {
  list: string[] = ['Angular', 'React'];

  // BehaviorSubject 它将时刻返回订阅的当前值
  // 它有一个getValue()方法用来提取最新值作为原始数据（raw data）
  private countSource = new BehaviorSubject<number>(Date.now());
  count = this.countSource.asObservable();

  constructor() {}

  getList() {
    return this.list;
  }

  addListItem(str: string) {
    this.list.push(str);
    this.countSource.next(Date.now());
  }
}
