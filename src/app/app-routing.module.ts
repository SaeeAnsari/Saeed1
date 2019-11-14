import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SIRFSearchComponent } from './SIRF/sirfsearch/sirfsearch.component';
import { PricingSearchComponent } from './PRICING/pricing-search/pricing-search.component';
import { PricingInitiateComponent } from './PRICING/pricing-initiate/pricing-initiate.component';
import { PricingFinalisedComponent } from './PRICING/pricing-finalised/pricing-finalised.component';
import { QuoteReportV2Component } from './PRICING/quote-report-v2/quote-report-v2.component';


const routes: Routes = [
  { path: '', component: QuoteReportV2Component},
  { path: 'pricingsearch', component: PricingSearchComponent},
  { path: 'pricinginitiate', component: PricingInitiateComponent},
  { path: 'pricinginitiate/:quoteID', component: PricingInitiateComponent},
  { path: 'pricingFinalise', component: PricingFinalisedComponent},
  { path: 'quoteReport/:quoteID', component: QuoteReportV2Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
