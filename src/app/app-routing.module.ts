import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SIRFSearchComponent } from './SIRF/sirfsearch/sirfsearch.component';
import { PricingSearchComponent } from './PRICING/pricing-search/pricing-search.component';
import { PricingInitiateComponent } from './PRICING/pricing-initiate/pricing-initiate.component';
import { PricingFinalisedComponent } from './PRICING/pricing-finalised/pricing-finalised.component';


const routes: Routes = [
  { path: '', component: PricingSearchComponent },
  { path: 'pricingsearch', component: PricingSearchComponent},
  { path: 'pricinginitiate', component: PricingInitiateComponent},
  { path: 'pricinginitiate/:quoteID', component: PricingInitiateComponent},
  { path: 'pricingFinalise', component: PricingFinalisedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
