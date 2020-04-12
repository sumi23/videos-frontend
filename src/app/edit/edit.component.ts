import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Level } from '../model/level';
import { Category } from '../model/category';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Video } from '../model/video';
import { CrudService } from '../crud.service';
import { FileNamePipe } from '../file-name.pipe';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  levels: Array<Level>;
  categories: Array<Category>;
  videoForm: FormGroup;
  video: Video;
  level1:Level;
  category1:Category;
  vid:any;
  id:number;
  updateSuccessMessageFlag:boolean;
  submitted = false;
  constructor(private route:ActivatedRoute,private crudservice: CrudService, private formbuilder: FormBuilder,private router:Router,private filepipe:FileNamePipe) { }

  ngOnInit(): void {

    this.vid = this.route
    .queryParams
    .subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });
    this.listVideoById();
    this.initializeForm();
    this.viewLevels();
    this.viewCategories();
    
    
  }

  initializeForm() {
    this.videoForm = this.formbuilder.group({
      name: ['',[Validators.required]],
      displayName: ['',[Validators.required]],
      url: ['',[Validators.required]],
      duration: [''],
      tags: ['',[Validators.required]],
      status:[''],
      description: [''],
      level: this.formbuilder.group({
        id: ['']
      }),
      category: this.formbuilder.group({
        id: ['']
      }),
      transcript: [''],
      referenceArtifact: this.formbuilder.array([this.formbuilder.group(
        {
          name: [''],
          file: [''],
          filename:[''],
          description: ['']
        }
      )]),
      sampleProgram: this.formbuilder.array([this.formbuilder.group(
        {
          name: [''],
          file: [''],
          filename:[''],
          description: ['']
        }
      )]),
      referenceUrl: this.formbuilder.array([this.formbuilder.group(
        {
          name:[''],
          url: [''],
          description: ['']
        }
      )])
    });
  }

get videoControls(){
  return this.videoForm.controls;
}


videoobj:Array<Video>
 listVideoById(){
  this.crudservice.listVideoById(this.id).subscribe(result=>
  {
    this.videoobj=new Array(result.data);
    this.video=result.data;
    this.videoForm.patchValue({
      name :this.video.name,
      displayName:this.video.displayName,
      url:this.video.url,
      duration:this.video.duration,
      tags:this.video.tags,
      status:this.video.status,
      description:this.video.description,
      level: { id: this.video.level.id},
      category: { id: this.video.category.id}
    });
    this.patchRefArt();
    this.patchSamProg();
    this.patchRefUrl();
  });
}

patchRefArt() {
  this.deleteRefArt(0);
  let control = this.videoForm.get('referenceArtifact') as FormArray;
  this.video.referenceArtifact.forEach(x=>{
      control.push(this.formbuilder.group({
          name: x.name,
          file:'',
          filename:this.filepipe.transform(x.file), 
          description: x.description,

      }));
  });
}
patchSamProg() {
  this.deleteSamProg(0);
  let control = this.videoForm.get('sampleProgram') as FormArray;
  this.video.sampleProgram.forEach(x=>{
      control.push(this.formbuilder.group({
          name: x.name,
          file:'', 
          filename:this.filepipe.transform(x.file),    
          description: x.description,
      }));
  });
}

  patchRefUrl() {
    this.deleteRefUrl(0);
    let control = this.videoForm.get('referenceUrl') as FormArray;
    this.video.referenceUrl.forEach(x=>{
        control.push(this.formbuilder.group({
            name: x.name,
            url: x.url,
            description: x.description,
  
        }));
    });
    
   
  }
  result:boolean;
  deleteRefArtById(id: number) {
   this.result=confirm("Are you sure want to delete this video content?");
   if(this.result==true){
  this.crudservice.deleteReferenceArtifactById(id).subscribe(
        data => {
          console.log(data);
        },
        error => console.log(error));
  }
}

  deleteSamProgById(id: number) {
    this.result=confirm("Are you sure want to delete this video content?");
   if(this.result==true){
    this.crudservice.deleteSampleProgramById(id).subscribe(
        data => {
          console.log(data);
        },
        error => console.log(error));
  }}

  deleteRefUrlById(id: number) {
    this.result=confirm("Are you sure want to delete this video content?");
   if(this.result==true){
    this.crudservice.deleteReferenceUrlById(id).subscribe(
        data => {
          console.log(data);
        },
        error => console.log(error));
  }}

  get referenceArtifact() {
    return this.videoForm.get('referenceArtifact') as FormArray;
  }
  addRefArt() {
    this.referenceArtifact.push(this.formbuilder.group({
      name: '',
      file: '',
      description: ''
    }));
  }
  deleteRefArt(index: number) {
    this.referenceArtifact.removeAt(index);
  }

  get sampleProgram() {
    return this.videoForm.get('sampleProgram') as FormArray;
  }
  addSamProg() {
    this.sampleProgram.push(this.formbuilder.group({
      name: '',
      file: '',
      description: ''
    }));
  }
  deleteSamProg(samProgindex: number) {
    this.sampleProgram.removeAt(samProgindex);
  }

  get referenceUrl() {
    return this.videoForm.get('referenceUrl') as FormArray;
  }
  addRefUrl() {
    this.referenceUrl.push(this.formbuilder.group({
      name: '',
      url: '',
      description: ''
    }));
  }
  deleteRefUrl(refUrlindex: number) {
    this.referenceUrl.removeAt(refUrlindex);
  }


  viewLevels() {
    this.crudservice.viewLevels().subscribe((result: any) => {
      this.levels = result.data;
      console.log(this.levels);
    });
  }

  viewCategories() {
    this.crudservice.viewCategories().subscribe((result: any) => {
      this.categories = result.data;
      console.log(this.categories);
    });
  }

  setLevelId(levelId: number) {
    this.videoForm.patchValue({ level: { id: levelId } });
  }

  setCategoryId(categoryId: number) {
    this.videoForm.patchValue({ category: { id: categoryId } });
  }

  upvideo:Video;
  refArtlen:number; 
  save() {
    this.submitted = true;
    if(this.videoForm.invalid){
      return;
    }
    confirm("validated");
    this.upvideo=this.videoForm.value;
    this.upvideo.id=this.video.id;
    this.upvideo.createdOn=this.video.createdOn;
    this.upvideo.createdBy=this.video.createdBy;
    this.refArtlen=this.video.referenceArtifact.length;
    for(let i=0;i< this.refArtlen;i++){
      this.upvideo.referenceArtifact[i].id=this.video.referenceArtifact[i].id;
      this.upvideo.referenceArtifact[i].file=this.filepipe.transform(this.video.referenceArtifact[i].file);
    } 
    const samProglen=this.video.sampleProgram.length;
    for(let i=0;i< samProglen;i++){
      this.upvideo.sampleProgram[i].id=this.video.sampleProgram[i].id;
      this.upvideo.sampleProgram[i].file=this.filepipe.transform(this.video.sampleProgram[i].file);
    }
    const refUrllen=this.video.referenceUrl.length;
    for(let i=0;i< refUrllen;i++){
      this.upvideo.referenceUrl[i].id=this.video.referenceUrl[i].id;
    }
    
    console.log(this.upvideo);
    
    this.crudservice.editVideo(this.upvideo).subscribe((result: any) => {
      this.video =result;
      console.log(this.video);
      this.updateSuccessMessageFlag=true;
    });

  }
  back()
  {
     this.router.navigate(['view']);
  }  
  fileName:string;
  file:string;
  selectedFile=null;
  uploadFile(event)
  {
     this.selectedFile=event.target.files[0];
     this.fileName = this.selectedFile.name;
     console.log('selectedFilesname: ' + this.fileName )
     this.file=this.fileName;
     console.log(this.selectedFile);
     const payload = new FormData();  
     payload.append('file', this.selectedFile);  
    this.crudservice.uploadFile(payload).subscribe((result:any)=>
    {
     console.log(result);
    }
   );
  }

}
