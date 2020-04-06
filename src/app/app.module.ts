import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewComponent } from './view/view.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CrudService } from './crud.service';
import { ViewlistComponent } from './viewlist/viewlist.component';
import { SafeUrlPipe } from './safe-url.pipe';
import { AddComponent } from './add/add.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
//import {  RxReactiveFormsModule } from "@rxweb/reactive-form-validators"

@NgModule({
  declarations: [
    AppComponent,
    ViewComponent,
    ViewlistComponent,
    SafeUrlPipe,
    AddComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule  
  ],
  providers: [HttpClientModule,CrudService],
  bootstrap: [AppComponent]
})
export class AppModule { }
