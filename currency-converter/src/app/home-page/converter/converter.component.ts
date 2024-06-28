import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CurrencyService } from '../../services/currency.service';
import { debounceTime } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatSelectModule, CommonModule, MatIconModule],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.scss'
})
export class ConverterComponent implements OnInit{

  rateCoef = 2;

  convertForm: FormGroup;

  currencies: string[] = [
    'UAH', 'USD', 'EUR', 'GBP'
  ]

  constructor( private currencyService: CurrencyService){}

  ngOnInit(): void {
    this.convertForm = new FormGroup({
      firstAmount: new FormControl(''),
      firstCurrency: new FormControl('UAH'),
      secondAmount: new FormControl(''),
      secondCurrency: new FormControl('USD')
    });

    this.convertForm.get('firstAmount')!.valueChanges
    .pipe(
      debounceTime(500)
    )
    .subscribe((value)=> {
      this.onFirstAmountChange(value);
    });
  
    this.convertForm.get('firstCurrency')!.valueChanges.subscribe((value)=> {
      this.onFirstCurrencyChange(value);
    });
  
    this.convertForm.get('secondAmount')!.valueChanges
    .pipe(
      debounceTime(500)
    )
    .subscribe(value => {
      this.onSecondAmountChange(value);
    });
  
    this.convertForm.get('secondCurrency')!.valueChanges.subscribe((value)=> {
      this.onSecondCurrencyChange(value);
    });
  }

  onFirstCurrencyChange(firstCurrencyInputValue: string) {
    const formValues = this.convertForm.getRawValue();

    if (firstCurrencyInputValue != formValues.secondCurrency) {
      this.currencyService.getCurrentRates(firstCurrencyInputValue, formValues.secondCurrency).subscribe(
        res => {
          this.convertForm.patchValue({
            'secondAmount': (formValues.firstAmount * res.conversion_rate).toFixed(3)
          }, {
            emitEvent: false
          });
        }
      )

    } else {
      this.convertForm.patchValue({
        'secondAmount': formValues.firstAmount
      }, {
        emitEvent: false
      });
    }
  }

  onSecondCurrencyChange(secondCurrencyInputValue: string) {
    const formValues = this.convertForm.getRawValue();

    if (formValues.firstCurrency != secondCurrencyInputValue) {
      this.currencyService.getCurrentRates(formValues.firstCurrency, secondCurrencyInputValue).subscribe(
        res => {
          this.convertForm.patchValue({
            'secondAmount': (formValues.firstAmount * res.conversion_rate).toFixed(3)
          }, {
            emitEvent: false
          });
        }
      )
    } else {
      this.convertForm.patchValue({
        'secondAmount': formValues.firstAmount
      }, {
        emitEvent: false
      });
    }
  }

  onFirstAmountChange(fistInputValue: number) {
    const formValues = this.convertForm.getRawValue();

    if (formValues.firstCurrency != formValues.secondCurrency){
      this.currencyService.getCurrentRates(formValues.firstCurrency, formValues.secondCurrency).subscribe(
        res => {
          this.convertForm.patchValue({
            'secondAmount': (fistInputValue * res.conversion_rate).toFixed(3)
          }, {
            emitEvent: false
          });
        }
      )
    } else {
      this.convertForm.patchValue({
        'secondAmount': fistInputValue
      }, {
        emitEvent: false
      });
    }
  }

  onSecondAmountChange(secondInputValue: number) {
    const formValues = this.convertForm.getRawValue()
    if (formValues.firstCurrency != formValues.secondCurrency){
      this.currencyService.getCurrentRates(formValues.firstCurrency, formValues.secondCurrency).subscribe(
        res => {
          this.convertForm.patchValue(
            {
              'firstAmount': (secondInputValue / res.conversion_rate).toFixed(3)
            }, {
              emitEvent: false
            }        
          );
        }
      )

    } else {
      this.convertForm.patchValue({
        'firstAmount': secondInputValue
      }, {
        emitEvent: false
      })
    }
  }


}
