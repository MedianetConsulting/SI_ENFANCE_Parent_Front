import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtabLocalisationComponent } from './etab-localisation.component';

describe('EtabLocalisationComponent', () => {
  let component: EtabLocalisationComponent;
  let fixture: ComponentFixture<EtabLocalisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtabLocalisationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtabLocalisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
