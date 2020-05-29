import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SIRFSearchComponent } from './SIRF/sirfsearch/sirfsearch.component';
import { PricingSearchComponent } from './PRICING/pricing-search/pricing-search.component';
import { PricingInitiateComponent } from './PRICING/pricing-initiate/pricing-initiate.component';
import { PricingFinalisedComponent } from './PRICING/pricing-finalised/pricing-finalised.component';
import { QuoteReportV2Component } from './PRICING/quote-report-v2/quote-report-v2.component';
import { LandingComponent } from './landing/landing.component';
import { SIRFInitiateComponent } from './SIRF/sirfinitiate/sirfinitiate.component';
import { SIRFDetailsComponent } from './SIRF/sirfdetails/sirfdetails.component';
import { SIRFCostTrackingComponent } from './SIRF/sirfcost-tracking/sirfcost-tracking.component';
import { RootCauseCategoryListComponent } from './SIRF/root-cause-category-list/root-cause-category-list.component';
import { SIRFCompleteComponent } from './SIRF/sirfcomplete/sirfcomplete.component';
import { SIRFReportComponent } from './SIRF/sirfreport/sirfreport.component';
import { PricingFinalisedUpdateComponent } from './PRICING/pricing-finalised-update/pricing-finalised-update.component';


const routes: Routes = [
  //{ path: '', component: SIRFSearchComponent},
  { path: 'pricingsearch', component: PricingSearchComponent},
  { path: 'pricingsearch/:adminUser', component: PricingSearchComponent},
  { path: 'pricinginitiate', component: PricingInitiateComponent},
  { path: 'pricinginitiate/:quoteID', component: PricingInitiateComponent},
  { path: 'pricingfinalise', component: PricingFinalisedComponent},
  { path: 'pricingfinalise/:quoteID', component: PricingFinalisedComponent},
  { path: 'quotereport/:quoteID', component: QuoteReportV2Component},
  { path: 'sirfcompleted', component: SIRFCompleteComponent},
  { path: 'sirfcompleted/:sirfID', component: SIRFCompleteComponent},
  { path: 'sirfinitiate', component: SIRFInitiateComponent},
  { path: 'sirfreport', component: SIRFReportComponent},
  { path: 'sirfreport/:sirfID', component: SIRFReportComponent},
  { path: 'sirfsearch', component: SIRFSearchComponent},
  { path: 'sirfsearch/:adminUser', component: SIRFSearchComponent},
  { path: 'pricingupdate', component: PricingFinalisedUpdateComponent},
  { path: 'pricingupdate/:quoteID', component: PricingFinalisedUpdateComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
