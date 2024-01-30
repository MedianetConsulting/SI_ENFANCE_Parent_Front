import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NomenclatureInformateur } from '../Models/nomenclatureInformateur';
import { NomenclatureConcerne } from '../Models/nomenclatureConcerne';
import { NomenclatureGouvernorat } from '../Models/nomenclatureGouvernorat';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalisationService {

  constructor(private http: HttpClient) { }

  getTypeInformateur() {
    return this.http.get<NomenclatureInformateur[]>(environment.URL_CON + '/api/NomenclatureSignalisation/informateurs');
  }
  getTypeConcerne() {
    return this.http.get<NomenclatureConcerne[]>(environment.URL_CON + '/api/NomenclatureSignalisation/concernes');
  }
  getGouv() {
    return this.http.get<NomenclatureGouvernorat[]>(environment.URL_CON + '/api/Etablissement/gouvernorat');
  }

  addSignalisation(signalisation:any){
    return this.http.post(environment.URL_CON + '/api/NomenclatureSignalisation/add',signalisation);
  }

  uploadFile(file: File, codeSignalisation: number) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('codeSignalisation', codeSignalisation.toString());

    return this.http.post(environment.URL_CON +'/api/SignalisationFichier/upload', formData, { responseType: 'text' });
  }
  
}
