import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Etablissement } from 'src/app/Models/etablissement';
import { NomenclatureDelegation } from 'src/app/Models/nomenclatureDelegation';
import { NomenclatureEtatEtablissement } from 'src/app/Models/nomenclatureEtatEtablissement';
import { NomenclatureGouvernorat } from 'src/app/Models/nomenclatureGouvernorat';
import { NomenclatureTypeEtablissement } from 'src/app/Models/nomenclatureTypeEtablissement';
import { EtablissementService } from 'src/app/Services/etablissement.service';
import { TableUtil } from 'src/app/Utils/tableUtil';

@Component({
    selector: 'app-liste-etablissements',
    templateUrl: './liste-etablissements.component.html',
    styleUrls: ['./liste-etablissements.component.css'],
    standalone: false
})
export class ListeEtablissementsComponent implements OnInit{

  etablissements: Etablissement[] = [];
  typesEtablissement: NomenclatureTypeEtablissement[] =[]
  gouvernorats:NomenclatureGouvernorat[]=[]
  delegations:NomenclatureDelegation[]=[]
  etatEtablissements:NomenclatureEtatEtablissement[]=[]

  selectedEtat: string = '';
  selectedType: string = '';
  selectedDele: string = '';
  selectedGouv:any = '';

  

  displayedColumns: string[] = ['nombre','libeGouv','libeDele','libeEtab','adreEtab','codePost','tele','operation'];
  dataSource!: MatTableDataSource<Etablissement>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;


  constructor(private httpClient:HttpClient,private _service:EtablissementService,private router: Router){}
  ngOnInit(): void {
    /*this.codeGouv = 11
    this.selectedGouv = 'تونس'
    this.selectedEtat = ''; 
    this.selectedType = '';
    this.selectedDele = '';*/
    this.onGouvSelectionChange(this.selectedGouv);
    //this.search()

    this._service.getTypeEtab().subscribe((data:any)=>{
      this.typesEtablissement = data
    })
    this._service.getEtatEtab().subscribe((data:any)=>{
      this.etatEtablissements = data
    })
    this._service.getGouv().subscribe((data:any)=>{
      this.gouvernorats = data
    })
    
    this._service.getDeleByCodeGouv(this.codeGouv).subscribe((data:any)=>{
      this.delegations = data;
    })
    
    
  }

  search(){
    const criteria = {
      Gouvernorat: this.selectedGouv,
      Delegation: this.selectedDele,
      Etat: this.selectedEtat,
      Type: this.selectedType
    };
    this._service.getEtablissementsByCreteria(criteria).subscribe((data: any) => {
      this.etablissements = data;
      
      this.dataSource = new MatTableDataSource(this.etablissements);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  exportTable() {
    TableUtil.exportTableToExcel("listeEatblissements");
  }

  codeGouv:any
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

  positionEtab(codeEtab:any){
    this.router.navigate(['etablissement/positionEtab', codeEtab]);
  }
  diabled:boolean= true
  isPositionAvailable(codeEtab: any): boolean {
    this._service.getDetailEtablissement(codeEtab).subscribe((data:any)=>{
      console.log(data.positionX)
      if(data.positionX != null ||  data.positionY != null){
        this.diabled = false
    
      }
      else{
        this.diabled = true
      }
    })
    
    return this.diabled
    
  }
}
