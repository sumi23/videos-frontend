import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpBackend, HttpResponse } from '@angular/common/http';
import { CrudService } from '../crud.service';
import { DomSanitizer } from '@angular/platform-browser';
import { saveAs } from 'file-saver';
import * as FileSaver from "file-saver";
import { Video } from '../model/video';

@Component({
  selector: 'app-viewlist',
  templateUrl: './viewlist.component.html',
  styleUrls: ['./viewlist.component.css']
})
export class ViewlistComponent implements OnInit {
  video:Array<any>;
  id:number=0;
  vid:any;
  file:string;
  constructor(private route:ActivatedRoute,private router:Router,private obj:CrudService,private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.vid = this.route
    .queryParams
    .subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });
    this.listVideoById();
  }

  listVideoById(){
    this.obj.listVideoById(this.id).subscribe((result:any)=>
    {
      this.video=new Array(result);
      //this.video.url=result.url;
      console.log(this.video);
    }
    );
  }
  downloadFile(file) {
    this.obj.downloadFile(file).subscribe(
        (data) => {
         //console.log(data);
        const FILE_DATA=data.body;
       //console.log(filedata);
        const DECODED_FILE_DATA=window.atob(FILE_DATA);
        const blob = new Blob([DECODED_FILE_DATA], { type:'application/octet-stream' })
       // this.url = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
        FileSaver.saveAs(blob, file);   
      });
  }

    back()
    {
       this.router.navigate(['view']);
    }   
}
