import { HttpClient, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-add-signalisationfichier',
  templateUrl: './add-signalisationfichier.component.html',
  styleUrls: ['./add-signalisationfichier.component.css']
})
export class AddSignalisationfichierComponent implements OnInit{
  uploadingProgress:any;
  selectedFiles:File[]=[];
  uploading = false;
  errorMsg ='';
  codeSignalisation = sessionStorage.getItem('codeSignalisation');
  constructor(private httpClient:HttpClient, private router:Router){}
  ngOnInit(): void {}

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
  }

  uploadFiles(){
    const formData = new FormData();
    this.selectedFiles.forEach((file)=> formData.append('lstFiles',file));
    const req = new HttpRequest(
      'POST', 'https://localhost:7266/api/SignalisationFichier/upload/'+ this.codeSignalisation,formData,
      {
        reportProgress: true,
      }
    );
    this.uploading =true;
    this.httpClient.request(req).pipe(
      finalize(()=>{
        this.uploading = false;
        this.selectedFiles = [];
      })
    )
    .subscribe((event)=>{
      if(event.type === HttpEventType.UploadProgress){
        this.uploadingProgress = Math.round(
          (100* event.loaded) / event.total!
        );
      } else if (event instanceof HttpResponse){}
      //this.router.navigate(['/signalisation/add'])
    })
  }
}
