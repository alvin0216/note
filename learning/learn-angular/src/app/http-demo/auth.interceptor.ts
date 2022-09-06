import { Observable, retry } from 'rxjs';

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('AuthInterceptor');

    // return next.handle(request);
    return next
      .handle(
        request.clone({
          // method: 'post',
          setHeaders: {
            hello: 'hello',
          },
        })
      )
      .pipe(
        // 处理响应
        // 失败重试两次
        retry(2)
      );
  }
}
