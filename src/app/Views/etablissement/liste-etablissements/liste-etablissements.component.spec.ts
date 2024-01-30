import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeEtablissementsComponent } from './liste-etablissements.component';

describe('ListeEtablissementsComponent', () => {
  let component: ListeEtablissementsComponent;
  let fixture: ComponentFixture<ListeEtablissementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeEtablissementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeEtablissementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
