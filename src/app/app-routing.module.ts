import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SIRFSearchComponent } from './SIRF/sirfsearch/sirfsearch.component';


const routes: Routes = [
  { path: '', component: SIRFSearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
