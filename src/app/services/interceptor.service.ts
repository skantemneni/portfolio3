import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
/*import 'rxjs/add/operator/do';*/
import { tap, map, catchError } from 'rxjs/operators';
import { HttpEvent, HttpInterceptor, HttpResponse, HttpHandler, HttpRequest } from '@angular/common/http';
import { AccountService } from './account.service';
import { Stock } from './stocks.model';
import { ConfigService } from './config.service';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor() { }
}



@Injectable({
  providedIn: 'root'
})
export class StocksInterceptor implements HttpInterceptor {
  handleError: any;
  constructor(private accountService: AccountService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone();
    request.headers.append('Accept', 'application/json');
    return next.handle(request).pipe(tap(event => {
      if (event instanceof HttpResponse && event.url === ConfigService.get('api')) {
        const stocks = event.body as Array<Stock>;
        let symbols = this.accountService.stocks.map(stock => stock.symbol);
        stocks.forEach(stock => {
          this.accountService.stocks.map(item => {
            if (stock.symbol === item.symbol) {
              item.price = stock.price;
              item.change = ((stock.price * 100) - (item.cost * 100)) / 100;
            }
          });
        });
        this.accountService.calculateValue();

        return stocks;
      } else {
        console.log("Some effed up!");
        return Array<Stock>();
      }
    }), catchError(this.handleError.bind(this)),);
  }
}
