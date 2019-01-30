import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewaddpurchaseComponent } from './viewaddpurchase.component';

describe('ViewaddpurchaseComponent', () => {
  let component: ViewaddpurchaseComponent;
  let fixture: ComponentFixture<ViewaddpurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewaddpurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewaddpurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
