import { Component, OnInit } from '@angular/core';
import { CurrentRatesComponent } from './current-rates/current-rates.component';
import { CommonModule } from '@angular/common';
import { CurrencyService } from '../services/currency.service';
import { CurrencyRate } from '../../core/interfaces/currency-rate.interface';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CurrentRatesComponent, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit{

  targetCurrency: string = 'UAH';

  currencies: string[] = ['USD', 'EUR']
  rates: CurrencyRate[] = []

  constructor( private currencyService: CurrencyService ){}

  ngOnInit(): void {
    this.currencies.forEach(
      (currency) => 
        this.currencyService.getCurrentRates(currency, this.targetCurrency).subscribe(
          res => {
            this.rates.push(res);
            console.log(this.rates)
          }
        ))
  }
}
