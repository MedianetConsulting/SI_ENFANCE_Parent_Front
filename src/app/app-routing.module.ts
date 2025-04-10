import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSignalisationComponent } from './Views/signalisation/add-signalisation/add-signalisation.component';
import { HomeComponent } from './Views/home/home.component';
import { ListeEtablissementsComponent } from './Views/etablissement/liste-etablissements/liste-etablissements.component';
import { EtabLocalisationComponent } from './Views/etablissement/etab-localisation/etab-localisation.component';
import { ChercherLocalisationComponent } from './Views/etablissement/chercher-localisation/chercher-localisation.component';

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
      {
        path: 'positionEtab/:codeEtab',
        component:EtabLocalisationComponent,
      } 
    ] 
  },
  {
    path: 'chercherLocl',
    component:ChercherLocalisationComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
