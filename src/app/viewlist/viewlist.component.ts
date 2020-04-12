import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../crud.service';
import { DomSanitizer } from '@angular/platform-browser';
import * as FileSaver from "file-saver";
import { Video } from '../model/video';
import { FileNamePipe } from '../file-name.pipe';

@Component({
  selector: 'app-viewlist',
  templateUrl: './viewlist.component.html',
  styleUrls: ['./viewlist.component.css']
})
export class ViewlistComponent implements OnInit {
  video:Array<Video>;
  id:number=0;
  vid:any;
  file:string;
  constructor(private route:ActivatedRoute,private router:Router,private obj:CrudService,private sanitizer:DomSanitizer,private filepipe:FileNamePipe) { }

  ngOnInit(): void {
    this.vid = this.route
    .queryParams
    .subscribe(params => {
      this.id = params['id'];
    });
    this.listVideoById();
  }

  listVideoById(){
    this.obj.listVideoById(this.id).subscribe((result:any)=>
    {
      this.video=new Array(result.data);
    }
    );
  }
  fileName:string;
  downloadFile(file) {
    this.fileName=this.filepipe.transform(file);
    this.obj.downloadFile( this.fileName).subscribe(
        (data) => {
        const FILE_DATA=data.body;
        const DECODED_FILE_DATA=window.atob(FILE_DATA);
        const blob = new Blob([DECODED_FILE_DATA], { type:'application/octet-stream' })
       // this.url = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
        FileSaver.saveAs(blob, this.fileName);   
      });
  }

    back()
    {
       this.router.navigate(['view']);
    }   
}
