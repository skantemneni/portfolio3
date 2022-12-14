import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { CurrencyPipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvestmentsComponent } from './investments/investments.component';
import { TickerComponent } from './ticker/ticker.component';
import { StocksComponent } from './stocks/stocks.component';
import { AlertComponent } from './alert/alert.component';

import { LocalStorageService } from './services/local-storage.service';
import { AccountService } from './services/account.service';
import { StocksInterceptor } from './services/interceptor.service';
import { AlertService } from './services/alert.service';

@NgModule({
  declarations: [
    AppComponent,
    InvestmentsComponent,
    TickerComponent,
    StocksComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ClarityModule,
    AppRoutingModule
  ],
  providers: [
    AlertService,
    LocalStorageService,
    CurrencyPipe,
    AccountService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: StocksInterceptor,
      multi: true
    }
   ],
bootstrap: [AppComponent]
})
export class AppModule { }
