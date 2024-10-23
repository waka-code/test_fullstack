import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class IgnoreSelfSignedCertInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const httpsReq = req.clone({
      setHeaders: {
        'X-Ignore-Self-Signed-Cert': 'true'
      }
    });
    return next.handle(httpsReq);
  }
}
