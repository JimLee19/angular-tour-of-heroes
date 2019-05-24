import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

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
                    case 200:
                        // 业务层级错误处理
                        console.error('业务错误', `错误代码为：${err.error.code}`);
                        break;
                    case 404:
                        console.error('404', `API不存在`);
                        break;
                    default:
                        console.error(`请求超时`);
                        break;
                }
                const error = err.error.message || err.statusText;
                return throwError(error);
            })
        );
    }
}
