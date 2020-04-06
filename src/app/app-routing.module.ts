import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { ViewlistComponent } from './viewlist/viewlist.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';


const routes: Routes = [
  {path:"view",component:ViewComponent},
  {path:"view/viewlist",component:ViewlistComponent},
  {path:"add",component:AddComponent},
  {path:"view/edit",component:EditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
