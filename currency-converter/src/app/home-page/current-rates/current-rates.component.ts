import { CurrencyRate } from './../../../core/interfaces/currency-rate.interface';
import { Component, Input, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-current-rates',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './current-rates.component.html',
  styleUrl: './current-rates.component.scss'
})
export class CurrentRatesComponent {

  @Input()
  currencyRate: CurrencyRate;


}
