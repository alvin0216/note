import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-http-demo',
  templateUrl: './http-demo.component.html',
  styleUrls: ['./http-demo.component.scss'],
})
export class HttpDemoComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.demo1();
    this.demo2();
  }

  demo1() {
    let params = new HttpParams({
      fromObject: { name: '张三', age: 20 },
      // fromString: 'name=zhangsan&age=20',
    });

    params.append('sex', 'male');

    this.http
      .get('https://jsonplaceholder.typicode.com/users', { params })
      .subscribe(console.log);
  }

  demo2() {
    let headers = new HttpHeaders({ test: 'hello' });
    this.http
      .get('https://jsonplaceholder.typicode.com/users', { headers })
      .subscribe(console.log);

    // 设置相应体

    this.http
      .get('https://jsonplaceholder.typicode.com/users', {
        observe: 'response',
      })
      .subscribe(console.log);
  }
}
