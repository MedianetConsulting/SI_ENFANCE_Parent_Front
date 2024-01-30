import { HttpClient, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NomenclatureConcerne } from 'src/app/Models/nomenclatureConcerne';
import { NomenclatureGouvernorat } from 'src/app/Models/nomenclatureGouvernorat';
import { NomenclatureInformateur } from 'src/app/Models/nomenclatureInformateur';
import { NomenclatureSignalisation } from 'src/app/Models/nomenclatureSignalisation';
import { SignalisationService } from 'src/app/Services/signalisation.service';
import { AddSignalisationfichierComponent } from '../add-signalisationfichier/add-signalisationfichier.component';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SignalisationFichier } from 'src/app/Models/signalisationFichier';
@Component({
  selector: 'app-add-signalisation',
  templateUrl: './add-signalisation.component.html',
  styleUrls: ['./add-signalisation.component.css']
})
export class AddSignalisationComponent implements OnInit{

  typesInformateur: NomenclatureInformateur[] = []
  typesConcerne: NomenclatureConcerne[] = []
  gouvernorat: NomenclatureGouvernorat[]=[]

  signalisation:NomenclatureSignalisation = new NomenclatureSignalisation();
  //selectedFile!: File;

  uploadingProgress:any;
  selectedFiles!:File[];
  uploading = false;
  errorMsg ='';

  form: FormGroup = new FormGroup({
    codeSignalisation:new FormControl(''),
    nomInformateur:new FormControl(''),
    tel:new FormControl(''),
    ville:new FormControl(''),
    email:new FormControl(''),
    nomConcerne:new FormControl(''),
    etablissement:new FormControl(''),
    villeConcerne:new FormControl(''),
    adresseConcerne:new FormControl(''),
    message:new FormControl(''),
    dateCreation:new FormControl(),
    codeInformateur:new FormControl(''),
    codeConcerne:new FormControl(''),
    codeGouv:new FormControl(''),
    codeDele:new FormControl(''),
  })

  submitted = false; 
  constructor(private formBuilder: FormBuilder,private httpClient:HttpClient,private _service:SignalisationService,private router: Router,private _snackBar: MatSnackBar){}
  ngOnInit(): void {
    console.log(sessionStorage.getItem('codeSignalisation'));
    //sessionStorage.removeItem('codeSignalisation')

    this.form = this.formBuilder.group(
      {
        codeSignalisation: [['']],
        nomInformateur: [['',Validators.maxLength(100)]],
        tel: [['',Validators.maxLength(8)]],
        ville: [['',Validators.maxLength(45)]],
        email: [['',Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')]],
        nomConcerne: [['',Validators.required,Validators.maxLength(100)]],
        etablissement: [['',Validators.maxLength(1000)]],
        villeConcerne: [['',Validators.required,Validators.maxLength(100)]],
        adresseConcerne: [['',Validators.maxLength(1000)]],
        message: [['',Validators.required,Validators.maxLength(1000)]],
        dateCreation: [['']],
        codeInformateur: [['',Validators.required]],
        codeConcerne: [['',Validators.required,]],
        codeGouv: [['',Validators.required,]],
        codeDele: [['']],
      },
    );

    this._service.getTypeInformateur().subscribe((data:any)=>{
      this.typesInformateur = data
    })

    this._service.getTypeConcerne().subscribe((data:any)=>{
      this.typesConcerne = data
      console.log(this.typesConcerne)
    })

    this._service.getGouv().subscribe((data:any)=>{
      this.gouvernorat = data
    })
    
  }
  /* onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  } */

  get f(){  
    return this.form.controls;  
  } 
  addSignalisation(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.signalisation.dateCreation = new Date();
  
      this._service.addSignalisation(this.signalisation).subscribe(
        (data: any) => {
          console.log(data);
          sessionStorage.setItem('codeSignalisation', data.codeSignalisation);
          this.form.reset();
          this.submitted = false;
          this._snackBar.open('تم إرسال الإشعار بنجاح', 'غلق', {
            duration: 20000,
            panelClass: ['alert-success']
          });
          resolve(data.codeSignalisation); // Resolve with the codeSignalisation value
        },
        (error) => {
          console.log(error);
          this._snackBar.open('تثبت من المعطيات', 'غلق', {
            duration: 20000,
            panelClass: ['error-snackbar']
          });
          reject('Error in addSignalisation');
        }
      );
    });
  }
  

  selectFile(files: FileList){
    this.selectedFiles = [];
    this.errorMsg='';
    this.uploadingProgress= 0;
    if(files.length ===0){
      return;
    }
    for(let i = 0; i<files.length; i++){
      this.selectedFiles.push(files[i]);
    }
    console.log('Selected Files:', this.selectedFiles); 

  }
  uploadProgress = 0;
  submissionResults: SignalisationFichier[] = [];
  uploadFile() {
    const codeSignalisation = sessionStorage.getItem('codeSignalisation');
    if (!codeSignalisation) {
      console.error('La valeur de codeSignalisation est nulle.');
      // Handle the case where codeSignalisation is null.
      return;
    }
  
    if (!this.selectedFiles || this.selectedFiles.length === 0) {
      this.errorMsg = 'Please choose a file.';
      return;
    }
  
    const formData = new FormData();
    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('lstFiles', this.selectedFiles[i]);
    }
  
    const uploadUrl = `${environment.URL_CON}/api/SignalisationFichier/upload/${codeSignalisation}`;
  
    const req = new HttpRequest('POST', uploadUrl, formData, {
      reportProgress: true,
    });
  
    this.uploading = true;
  
    this.httpClient
      .request(req)
      .pipe(
        finalize(() => {
          this.uploading = false;
          this.selectedFiles = [];
          
        })
      )
      .subscribe(
        (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round((100 * event.loaded) / event.total!);
          } else if (event instanceof HttpResponse) {
            // Handle the response from the server, if needed.
            this.submissionResults = event.body as SignalisationFichier[];
          }
        },
        (error) => {
          // Handle the error, customize the way you want or rethrow it.
          console.error('Error during file upload:', error);
        }
      );
  }
  


  /* uploadFile() {
    const codeSignalisation = sessionStorage.getItem('codeSignalisation');
  
    if (!codeSignalisation) {
      console.error('La valeur de codeSignalisation est nulle.');
      // Ajoutez un gestionnaire d'erreur ou une logique appropriée pour traiter le cas où codeSignalisation est nulle.
      return;
    }
  
    const formData = new FormData();
    this.selectedFiles.forEach((file) => formData.append('lstFiles', file));
    
    const req = new HttpRequest(
      'POST', environment.URL_CON + '/api/SignalisationFichier/upload/' + codeSignalisation, formData,
      {
        reportProgress: true,
      }
    );
  
    this.uploading = true;
    this.httpClient.request(req).pipe(
      finalize(() => {
        this.uploading = false;
        this.selectedFiles = [];
        sessionStorage.removeItem('codeSignalisation');
      })
    )
    .subscribe((event) => {
      if (event.type === HttpEventType.UploadProgress) {
        this.uploadingProgress = Math.round((100 * event.loaded) / event.total!);
      } else if (event instanceof HttpResponse) {
        // Le fichier a été téléchargé avec succès
      }
    });
  } */

  formSubmit() {
    this.submitted = true;
      if (this.form.invalid) {
        return ;
      }
    this.addSignalisation().then(() => {
      this.uploadFile();
      sessionStorage.removeItem('codeSignalisation');
    }).catch(error => {
      console.error('Error in formSubmit:', error);
    });
  }
  /* uploadFile(file: File, codeSignalisation: number) {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('codeSignalisation', codeSignalisation.toString());
  
    this._service.uploadFile(file,codeSignalisation).subscribe((data:any)=>{
      console.log(data);
    })
  } */
}
