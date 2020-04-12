import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { Router } from '@angular/router';
import { Video } from '../model/video';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

video:Array<Video>=[];
id:Number=0;
file:string;
result:boolean;
statusUpdateSuccessMessageFlag:boolean;
deleteSuccessMessageFlag:boolean;

  constructor(private obj:CrudService,private router:Router) { }

  ngOnInit(): void {
    this.listVideo();
  }
  listVideo(){
    this.obj.listVideo().subscribe((result:any)=>
    {
      this.video=result.data;
    }
    );
   
  }

  toggleStatus(id:number){
    this.result=confirm("Are you sure want to toggle the status?");
   if(this.result==true){
    this.obj.toggleStatus(id).subscribe(result=>{
      this.statusUpdateSuccessMessageFlag=true;
      this.listVideo();
    }
    );
  }}

  
  deleteVideo(id: number) {
    this.result=confirm("Are you sure want to delete this video content?");
   if(this.result==true){
    this.obj.deleteVideo(id).subscribe(
        data => {
          this.deleteSuccessMessageFlag=true;
          this.listVideo();
        });
    
    
  }}

  navigateAdd()
  {
    this.router.navigate(['add']);
  }
}
