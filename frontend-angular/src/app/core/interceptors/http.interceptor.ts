import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {

  let request = req;

    request = req.clone({
      setHeaders: {
        'x-api-key': 'test'
      }
    });

  return next(request);
  
};
