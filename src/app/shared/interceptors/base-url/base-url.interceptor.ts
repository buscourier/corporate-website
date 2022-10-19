import {Inject, Injectable} from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http'
import {Observable} from 'rxjs'
import {BASE_URL} from '../../tokens/base-url.token'

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  constructor(@Inject(BASE_URL) private baseUrl: string) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const newRequest = request.clone({
      url: this.baseUrl + request.url,
      // setHeaders: {
      //   'Access-Control-Allow-Origin': '*',
      //   'Access-Control-Allow-Credentials': 'true',
      //   'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
      //   'Access-Control-Allow-Headers':
      //     'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      // },
    })

    return next.handle(newRequest)
  }
}
