import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSignalisationComponent } from './add-signalisation.component';

describe('AddSignalisationComponent', () => {
  let component: AddSignalisationComponent;
  let fixture: ComponentFixture<AddSignalisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSignalisationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSignalisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
