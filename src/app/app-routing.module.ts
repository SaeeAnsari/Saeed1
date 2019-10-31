import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SIRFSearchComponent } from './SIRF/sirfsearch/sirfsearch.component';
import { PricingSearchComponent } from './PRICING/pricing-search/pricing-search.component';
import { PricingInitiateComponent } from './PRICING/pricing-initiate/pricing-initiate.component';


const routes: Routes = [
  { path: '', component: SIRFSearchComponent },
  { path: 'pricingsearch', component: PricingSearchComponent},
  { path: 'pricinginitiate', component: PricingInitiateComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
