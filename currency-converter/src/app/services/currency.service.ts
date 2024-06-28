import { CurrencyRate } from './../../core/interfaces/currency-rate.interface';
import { Injectable } from '@angular/core';
import { BaseService } from '../../core/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService extends BaseService{

  constructor ( httpClient: HttpClient ) {
    super(httpClient)
  }

  getCurrentRates(baseCurrency: string, targetCurrency: string): Observable<CurrencyRate>{
    return this.get<CurrencyRate>(`pair/${baseCurrency}/${targetCurrency}`);
  }
}
