import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Level } from '../model/level';
import { Category } from '../model/category';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Video } from '../model/video';
import { CrudService } from '../crud.service';

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
  submitted = false;
  constructor(private route:ActivatedRoute,private crudservice: CrudService, private formbuilder: FormBuilder,private router:Router) { }

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
      duration: [{value:'',disabled: true}],
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
    //this.videoForm.get('status').setValue('true');
  }

get videoControls(){
  return this.videoForm.controls;
}


videoobj:Array<Video>;
i:number=0;
checkValue:boolean;
//object:any=this.video.referenceArtifact;
 listVideoById(){
  this.crudservice.listVideoById(this.id).subscribe(result=>
  {
    this.videoobj=new Array(result);
    this.video=result;
    console.log(this.video);
    console.log(this.video.level.id)
    //this.checkValue=this.video[0].status;
    //console.log(this.checkValue);
    //console.log(this.video[0].name);
    this.videoForm.patchValue({
      name :this.video.name,
      displayName:this.video.displayName,
      url:this.video.url,
      duration:this.video.duration,
      tags:this.video.tags,
      status:this.video.status,
      description:this.video.description,
      level: { id: this.video.level.id},
      category: { id: this.video.category.id},
  //    referenceUrl:[
  //     {
  //       name:this.video[0].referenceUrl[0].name,
  //       url:this.video[0].referenceUrl[0].url,
  //       description:this.video[0].referenceUrl[0].description
  //     }
  //  ]
    });
   this.patchRefArt();
    this.patchSamProg();
    this.patchRefUrl();
  });
}

filestr:string="C:/fakepath/";

patchRefArt() {
  this.deleteRefArt(0);
  let control = this.videoForm.get('referenceArtifact') as FormArray;
  // let control = <FormArray>this.form.controls['resultList'];
 this.video.referenceArtifact.forEach(x=>{
      control.push(this.formbuilder.group({
          name: x.name,
          file:'',
          filename:x.file, 
          description: x.description,

      }));
  });
}
reffile:any;
patchSamProg() {
  this.deleteSamProg(0);
  let control = this.videoForm.get('sampleProgram') as FormArray;
 this.video.sampleProgram.forEach(x=>{
    this.reffile=x.file;
      control.push(this.formbuilder.group({
          name: x.name,
          file:'', 
          filename:x.file,    
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
    
    // const refUrllen=this.video[0].referenceUrl.length;
    // console.log("ref art length is:"+refUrllen);
    // for(let i=0;i< refUrllen;i++){
    //   this.videoForm.patchValue({ referenceUrl:[
    //     {
    //       name:this.video[0].referenceUrl[i].name,
    //     url:this.video[0].referenceUrl[i].url,
    //     description:this.video[0].referenceUrl[i].description

    //     }
    //   ] });
    // }
   
  }
  deleteRefUrlById(id: number) {
    this.crudservice.deleteReferenceUrlById(id).subscribe(
        data => {
          console.log(data);
        },
        error => console.log(error));
  }
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
      this.levels = result;
      console.log(this.levels);
    });
  }

  viewCategories() {
    this.crudservice.viewCategories().subscribe((result: any) => {
      this.categories = result;
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
    //this.submitted = true;
    if(this.videoForm.invalid){
      return;
    }
    confirm("validated");
    this.upvideo=this.videoForm.value;
    this.upvideo.id=this.video.id;
    this.refArtlen=this.video.referenceArtifact.length;
    console.log("ref art length is:"+this.refArtlen);
    for(let i=0;i< this.refArtlen;i++){
      this.upvideo.referenceArtifact[i].id=this.video.referenceArtifact[i].id;
    } 
    const samProglen=this.video.sampleProgram.length;
    console.log("sample program length is:"+samProglen);
    for(let i=0;i< samProglen;i++){
      this.upvideo.sampleProgram[i].id=this.video.sampleProgram[i].id;
    }
    const refUrllen=this.video.referenceUrl.length;
    console.log("ref art length is:"+refUrllen);
    for(let i=0;i< refUrllen;i++){
      this.upvideo.referenceUrl[i].id=this.video.referenceUrl[i].id;
    }
    
    console.log(this.upvideo);
    
    this.crudservice.editVideo(this.upvideo).subscribe((result: any) => {
      this.video =result;
      console.log(this.video);
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
