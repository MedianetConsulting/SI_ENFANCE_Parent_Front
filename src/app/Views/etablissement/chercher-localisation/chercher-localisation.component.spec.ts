import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChercherLocalisationComponent } from './chercher-localisation.component';

describe('ChercherLocalisationComponent', () => {
  let component: ChercherLocalisationComponent;
  let fixture: ComponentFixture<ChercherLocalisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChercherLocalisationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChercherLocalisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
