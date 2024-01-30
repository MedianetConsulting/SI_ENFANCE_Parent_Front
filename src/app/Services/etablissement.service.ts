import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Etablissement } from '../Models/etablissement';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NomenclatureDelegation } from '../Models/nomenclatureDelegation';
import { NomenclatureGouvernorat } from '../Models/nomenclatureGouvernorat';
import { NomenclatureTypeEtablissement } from '../Models/nomenclatureTypeEtablissement';
import { NomenclatureEtatEtablissement } from '../Models/nomenclatureEtatEtablissement';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
}) 
export class EtablissementService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Etablissement[]>(environment.URL_CON + '/api/Etablissement/etablissements',httpOptions);
  }

  getEtablissementsByLibe(libe: any) {
    return this.http.get<Etablissement[]>(environment.URL_CON + '/api/Etablissement/Libe/'+libe);
  }
  getEtablissementsByCreteria(criteria: any) {
    return this.http.get<Etablissement[]>(environment.URL_CON + '/search',{ params: criteria });
  }
  
  getGouv() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<NomenclatureGouvernorat[]>(
      environment.URL_CON +'/api/Etablissement/gouvernorat',httpOptions);
  }
  getDele() {
    return this.http.get<NomenclatureDelegation[]>(environment.URL_CON +'/api/Etablissement/delegation',httpOptions);
  }
  
  getTypeEtab() {
    return this.http.get<NomenclatureTypeEtablissement[]>(environment.URL_CON + '/api/Etablissement/typesEtablissements',httpOptions);
  }
  getEtatEtab() {
    return this.http.get<NomenclatureEtatEtablissement[]>(environment.URL_CON + '/api/Etablissement/EtatsEtablissements',httpOptions);
  }

  /* getEtablissementsByLibeGouv(libeGouv: any) {
    return this.http.get<Etablissement[]>(`https://localhost:7266/api/Etablissement/Gouv/${libeGouv}`);
  } */
  getDeleByCodeGouv(codeGouv:any) {
    return this.http.get<NomenclatureDelegation[]>(environment.URL_CON +'/api/Etablissement/delegation/' + codeGouv);
  }
  getEtablissementsByGouvDele(libeGouv: any,libeDele:any) {
    return this.http.get<Etablissement[]>(environment.URL_CON + '/api/Etablissement/' +libeGouv + '/' + libeDele);
  }

  getEtablissementsByGouvDeleComm(libeGouv: any,libeDele:any,libeComm:any) {
    return this.http.get<Etablissement[]>(environment.URL_CON + '/api/Etablissement/' + libeGouv + '/' + libeDele + '/' + libeComm);
  }

  /* getEtablissementsByType(LibeTypeEtab: any) {
    return this.http.get<Etablissement[]>(`https://localhost:7266/api/Etablissement/type/${LibeTypeEtab}`);
  }

  getEtablissementsByEtat(LibeEtatEtab: any) {
    return this.http.get<Etablissement[]>(`https://localhost:7266/api/Etablissement/Etat/${LibeEtatEtab}`);
  } */

  
}
