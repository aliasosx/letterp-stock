import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBomComponent } from './add-bom.component';

describe('AddBomComponent', () => {
  let component: AddBomComponent;
  let fixture: ComponentFixture<AddBomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
