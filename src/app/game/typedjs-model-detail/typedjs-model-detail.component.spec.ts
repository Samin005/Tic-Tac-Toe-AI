import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypedjsModelDetailComponent } from './typedjs-model-detail.component';

describe('TypedjsModelDetailComponent', () => {
  let component: TypedjsModelDetailComponent;
  let fixture: ComponentFixture<TypedjsModelDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypedjsModelDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypedjsModelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
