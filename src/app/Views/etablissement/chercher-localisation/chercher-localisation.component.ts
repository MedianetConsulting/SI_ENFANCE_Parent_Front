import { Component, OnInit } from '@angular/core';
import { Etablissement } from 'src/app/Models/etablissement';
import { NomenclatureEtablissement } from 'src/app/Models/nomenclatureEtablissement';
import { NomenclatureGouvernorat } from 'src/app/Models/nomenclatureGouvernorat';
import { NomenclatureTypeEtablissement } from 'src/app/Models/nomenclatureTypeEtablissement';
import { EtablissementService } from 'src/app/Services/etablissement.service';
import * as L from 'leaflet';
import { NomenclatureDelegation } from 'src/app/Models/nomenclatureDelegation';
import { delay } from 'rxjs';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;
@Component({
    selector: 'app-chercher-localisation',
    templateUrl: './chercher-localisation.component.html',
    styleUrls: ['./chercher-localisation.component.css'],
    standalone: false
})
export class ChercherLocalisationComponent implements OnInit {

  etablissements: Etablissement[] = [];
  typesEtablissement: NomenclatureTypeEtablissement[] = []
  gouvernorats: NomenclatureGouvernorat[] = []
  delegations:NomenclatureDelegation[]=[]
  etablissement: Etablissement;
  selectedType: any = '';
  codeGouv: any;
  selectedGouv: any = '';
  selectedDele: any = '';
  selectedEtab: any = '';

  //Map
  private map;
  private lnt:any;
  private lng:any;

  getCurrentPosition() {
    this._service.getCurrentPosition().subscribe({
      next: (position) => {
        this.map = L.map('map', {
          center: [ position.coords.latitude,position.coords.longitude],
          zoom: 11
        });
    
        const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          minZoom: 3,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });

        var greenIcon = L.icon({
          iconUrl: 'assets/marker-icon-green.png',
          shadowUrl: 'assets/marker-shadow.png',
      
         /* iconSize:     [38, 95], // size of the icon
          shadowSize:   [50, 64], // size of the shadow
          iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
          shadowAnchor: [4, 62],  // the same for the shadow
          popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor*/
      });
    
        tiles.addTo(this.map);
        const marker = L.marker([position.coords.latitude,position.coords.longitude],{icon: greenIcon});
        
        marker.addTo(this.map).bindPopup("<h3>الموقع الحالي</h3>");
        this.lnt=position.coords.latitude;
        this.lng=position.coords.longitude;
      },
      error: (error) => {
        console.error('Error getting geolocation:', error);
      },
    });
  }

  getGeoLocation2() {
    this._service.getCurrentPosition().subscribe({
      next: (position) => {
        
        var greenIcon = L.icon({
          iconUrl: 'assets/marker-icon-green.png',
          shadowUrl: 'assets/marker-shadow.png',
      });
        
        const marker = L.marker([position.coords.latitude,position.coords.longitude], {icon: greenIcon});
        
        marker.addTo(this.map).bindPopup("<h3>الموقع الحالي</h3>");
        this.lnt=position.coords.latitude;
        this.lng=position.coords.longitude;
      },
      error: (error) => {
        console.error('Error getting geolocation:', error);
      },
    });
  }

  constructor(private _service: EtablissementService) { }
  ngOnInit(): void {
    //this.codeGouv = 11
    //this.selectedGouv = 'تونس'
    //this.selectedType = 'روضة أطفال'

    this._service.getGouv().subscribe((data: any) => {
      this.gouvernorats = data
    })
    this._service.getTypeEtab().subscribe((data: any) => {
      this.typesEtablissement = data
    })

    /*this._service.getDeleByCodeGouv(this.selectedGouv).subscribe((data:any)=>{
      this.gouvernorats.forEach((gouv:any)=>{
        if(this.selectedGouv == gouv.libeGouv){
          this.codeGouv = gouv.codeGouv
        }
      })
      //const selectedGouv = this.gouvernorats.find(gouv => gouv.libeGouv === libeGouv);
      this._service.getDeleByCodeGouv(this.codeGouv).subscribe((data:any) => {
        this.delegations = data;
      });  
    })*/

    this._service.getDele().subscribe((data:any)=>{
      this.delegations = data
    }) 
    
    this.getCurrentPosition();
  }

  onGouvSelectionChange(libeGouv:any) {
    this.gouvernorats.forEach((gouv:any)=>{
      if(libeGouv == gouv.libeGouv){
        this.codeGouv = gouv.codeGouv
      }
    })
    if(this.selectedGouv != ""){
      this._service.getDeleByCodeGouv(this.codeGouv).subscribe((data:any) => {
        this.delegations = data;
      })
    }else{
      this._service.getDele().subscribe((data:any)=>{
        this.delegations = data
      }) 
    }
  }


  onDeleSelectionChange(libeDel: any, libeType: any) {
    this._service.getEtablissementsByLibe(libeDel).pipe(
      delay(5000) // Délai de 500 millisecondes
    ).subscribe((data: any) => {
      this.etablissements = data;
      if(libeType != ""){
        this.etablissements = data.filter(
          (etablissement) => etablissement.libeTypeEtab === libeType
        );
      }
    });
  }

  lstEtab: any[] = []
  
  NomenEtablissement: NomenclatureEtablissement;
  search(codeEtab: any) {
    // Supprimer le calque des marqueurs
    this.map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });
    this.getGeoLocation2();
    // Créer un nouveau calque de marqueurs
    let markerLayer = L.layerGroup().addTo(this.map);
  
    if (codeEtab == '') {
      const criteria = {
        Gouvernorat: this.selectedGouv,
        Delegation: this.selectedDele,
        Type: this.selectedType,
        CodeEtab: this.selectedEtab,
      };
  
      this._service.getEtablissementsByCreteria(criteria).subscribe((data: any) => {
        this.lstEtab = data
        this.lstEtab.forEach((c: any) => {
          this._service.getDetailEtablissement(c.codeEtab).subscribe((d: any) => {
            const NomenEtablissement = d;
  
            const lat = parseFloat(NomenEtablissement.positionX);
            const lon = parseFloat(NomenEtablissement.positionY);

            // Création de l'URL pour Google Maps
            const googleMapsLink = `https://www.google.com/maps?q=${lat},${lon}`;
  
            const marker = L.marker([lat, lon]).addTo(markerLayer).bindPopup(`
              <h4 style="direction: rtl; text-align: right;">${NomenEtablissement.libeEtab}</h4>
              <a href="${googleMapsLink}" target="_blank" >Google Maps عرض الموقع على</a>
            `);
          });
        })
      });
    } else {
      this._service.getDetailEtablissement(codeEtab).subscribe((data: any) => {
        const NomenEtablissement = data;
  
        const lat = parseFloat(NomenEtablissement.positionX);
        const lon = parseFloat(NomenEtablissement.positionY);
  
        const marker = L.marker([lat, lon]).addTo(markerLayer).bindPopup("<h4>" + NomenEtablissement.libeEtab + "</h4>");
      })
    }
  }
  

  
}
