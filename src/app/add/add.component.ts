import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { CrudService } from '../crud.service';
import { Video } from '../model/video';
import { Level } from '../model/level';
import { Category } from '../model/category';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  levels: Array<Level>;
  categories: Array<Category>;
  videoForm: FormGroup;
  level: FormGroup;
  video: Video;
  constructor(private crudservice: CrudService,private router:Router, private formbuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.initializeForm();
    this.viewLevels();
    this.viewCategories();
    this.deleteRefArt(0);
    this.deleteSamProg(0);
    this.deleteRefUrl(0);
  }

  get videoControls(){
    return this.videoForm.controls;
  }
  initializeForm() {
    this.videoForm = this.formbuilder.group({
      name: ['',[Validators.required]],
      displayName: ['',[Validators.required]],
      url: ['',[Validators.required]],
      duration: [''],
      tags: ['',[Validators.required]],
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
          description: ['']
        }
      )]),
      sampleProgram: this.formbuilder.array([this.formbuilder.group(
        {
          name: [''],
          file: [''],
          description: ['']
        }
      )]),
      referenceUrl: this.formbuilder.array([this.formbuilder.group(
        {
          name: '',
          url: [''],
          description: ['']
        }
      )])
    });
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

  save() {
     
    //this.videoForm.patchValue(this.referenceArtifact[{file:}])
    this.video = this.videoForm.value;
    console.log(this.video);
    this.crudservice.addVideo(this.video).subscribe((result: any) => {
       console.log("res is"+result);
      console.log("response is"+result.headers);
      console.log(result.video);
    });

  }
  back()
    {
       this.router.navigate(['view']);
    }  
    
    @ViewChild('file1') file1: any;
    selectedFiles: FileList;
    fileName: string;
   showName(event):string
   {
    this.selectedFiles = event.target.files;
    this.fileName = this.selectedFiles[0].name;
    console.log('selectedFiles: ' + this.fileName )
    this.file1=this.fileName;
    return this.fileName;
   
   }

  //  uploadFile(files)
  //  {
  //     let file:File=files[0];
  //     const formData = new FormData();  
  //   formData.append('file', files.data);  
  //   this.crudservice.uploadFile(formData).subscribe((result:any)=>
  //   {
  //     console.log(result);
  //   }
  //   );
  //  }
    
  
  file:File;
  selectedFile=null;
  uploadFile(event)
  {
     this.selectedFile=event.target.files[0];
     this.fileName = this.selectedFile.name;
     console.log('selectedFilesname: ' + this.fileName )
     this.file1=this.fileName;
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

