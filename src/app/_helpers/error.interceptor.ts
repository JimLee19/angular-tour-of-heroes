import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private message: NzMessageService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // console.log('event--->>>', event);
                }
                return event;
            }),
            // retry(1),
            catchError((err: HttpErrorResponse) => {
                switch (err.status) {
                    case 401:
                        // 权限处理
                        this.authenticationService.logout();
                        location.reload(true);
                        break;
                    case 406:
                        // 业务层级错误处理
                        this.message.error(`业务错误，错误代码为：${err.error.code}`);
                        break;
                    case 404:
                        this.message.error(`404：API不存在`);
                        break;
                    default:
                        this.message.error(`500：请求超时`);
                        break;
                }
               // const error = err.error.message || err.statusText;
                return throwError(err); // 错误显示在控制台
            })
        );
    }
}
