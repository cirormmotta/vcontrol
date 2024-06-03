import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorsHandlerComponent } from './errors-handler.component';

describe('ErrorsHandlerComponent', () => {
  let component: ErrorsHandlerComponent;
  let fixture: ComponentFixture<ErrorsHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorsHandlerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ErrorsHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
