import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './Views/header/header.component';
import { AddSignalisationComponent } from './Views/signalisation/add-signalisation/add-signalisation.component';
import { HomeComponent } from './Views/home/home.component';
import { ListeEtablissementsComponent } from './Views/etablissement/liste-etablissements/liste-etablissements.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AddSignalisationfichierComponent } from './Views/signalisation/add-signalisationfichier/add-signalisationfichier.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddSignalisationComponent,
    HomeComponent,
    ListeEtablissementsComponent,
    AddSignalisationfichierComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
