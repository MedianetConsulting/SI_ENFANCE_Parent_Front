import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { Etablissement } from 'src/app/Models/etablissement';
import { EtablissementService } from 'src/app/Services/etablissement.service';

@Component({
    selector: 'app-etab-localisation',
    templateUrl: './etab-localisation.component.html',
    styleUrls: ['./etab-localisation.component.css'],
    standalone: false
})
export class EtabLocalisationComponent implements OnInit{
  codeEtab:any;
  nomeEtablissement:Etablissement;
  private map;
  private lnt:any;
  private lng:any;
  constructor(private _route:ActivatedRoute,private _service:EtablissementService){}

  ngOnInit(): void {
    this._route.paramMap.subscribe(
      params => {
        this.codeEtab = params.get('codeEtab');
      }
    );
    this.getCurrentPosition();
    this.getEtabPosition();
  }

  getCurrentPosition() {
    this._service.getCurrentPosition().subscribe({
      next: (position) => {
        this.map = L.map('map', {
          center: [ position.coords.latitude,position.coords.longitude],
          zoom: 10
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

  getEtabPosition() {
    this._service.getDetailEtablissement(this.codeEtab).subscribe((data:any) => {
        
        const lat = parseFloat(data.positionX);
        const lon = parseFloat(data.positionY);
        // Création de l'URL pour Google Maps
        const googleMapsLink = `https://www.google.com/maps?q=${lat},${lon}`;
  
        const marker = L.marker([lat, lon]).addTo(this.map).bindPopup(`
          <h4 style="direction: rtl; text-align: right;">${data.libeEtab}</h4>
          <a href="${googleMapsLink}" target="_blank" >Google Maps عرض الموقع على</a>
        `);
        
        //marker.addTo(this.map).bindPopup("<h4>" + data.libeEtab + "</h4>");
        
      },
    );
  }

}
