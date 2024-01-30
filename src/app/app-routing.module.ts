import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSignalisationComponent } from './Views/signalisation/add-signalisation/add-signalisation.component';
import { HomeComponent } from './Views/home/home.component';
import { ListeEtablissementsComponent } from './Views/etablissement/liste-etablissements/liste-etablissements.component';

const routes: Routes = [
  {
    path: '',
    component:HomeComponent,
  },
  {
    path: 'signalisation',
    children:[
      {
        path: 'add',
        component:AddSignalisationComponent,
      },
    ]
  },
  {
    path: 'etablissement',
    children:[
      {
        path: 'liste',
        component:ListeEtablissementsComponent,
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
