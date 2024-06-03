import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollContentComponent } from './scroll-content.component';

describe('ScrollContentComponent', () => {
  let component: ScrollContentComponent;
  let fixture: ComponentFixture<ScrollContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScrollContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
