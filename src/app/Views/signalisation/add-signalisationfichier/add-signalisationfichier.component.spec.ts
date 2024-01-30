import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSignalisationfichierComponent } from './add-signalisationfichier.component';

describe('AddSignalisationfichierComponent', () => {
  let component: AddSignalisationfichierComponent;
  let fixture: ComponentFixture<AddSignalisationfichierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSignalisationfichierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSignalisationfichierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
