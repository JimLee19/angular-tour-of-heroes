import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable() export class HttpConfigInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = localStorage.getItem('token');
        request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                // let data = {};
                // data = {
                //     reason: error && error.error.reason ? error.error.reason : '',
                //     status: error.status
                // };
                switch (error.status) {
                    case 401:
                        // 权限处理
                        location.href = ''; // 重新登录
                        break;
                    case 200:
                        // 业务层级错误处理
                        console.error('业务错误', `错误代码为：${error.error.code}`);
                        break;
                    case 404:
                        console.error('404', `API不存在`);
                        break;
                }
                return throwError(error);
            })
        );
    }
}