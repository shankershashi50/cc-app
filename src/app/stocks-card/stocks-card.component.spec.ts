import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksCardComponent } from './stocks-card.component';

describe('StocksCardComponent', () => {
  let component: StocksCardComponent;
  let fixture: ComponentFixture<StocksCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StocksCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
