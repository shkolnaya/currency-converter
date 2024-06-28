import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentRatesComponent } from './current-rates.component';

describe('CurrentRatesComponent', () => {
  let component: CurrentRatesComponent;
  let fixture: ComponentFixture<CurrentRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentRatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrentRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
