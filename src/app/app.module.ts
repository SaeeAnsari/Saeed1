import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UXTestComponent } from './uxtest/uxtest.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import {A11yModule} from '@angular/cdk/a11y';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SIRFSearchComponent } from './SIRF/sirfsearch/sirfsearch.component';
import { PricingSearchComponent } from './PRICING/pricing-search/pricing-search.component';
import { PricingInitiateComponent } from './PRICING/pricing-initiate/pricing-initiate.component';
import { InitiateMainComponent } from './PRICING/initiate-main/initiate-main.component';
import { DialogConfirmDeleteComponent } from './PRICING/dialog-confirm-delete/dialog-confirm-delete.component';
import { ProductDetailsComponent } from './PRICING/product-details/product-details.component';
import { ProductFinalisedComponent } from './PRICING/product-finalised/product-finalised.component';
import { PricingFinalisedComponent } from './PRICING/pricing-finalised/pricing-finalised.component';

import { QuoteReportV2Component } from './PRICING/quote-report-v2/quote-report-v2.component';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { SIRFInitiateComponent } from './SIRF/sirfinitiate/sirfinitiate.component';
import { FileUploadComponent } from './SIRF/file-upload/file-upload.component';
import { HttpClientModule } from '@angular/common/http';
import { SIRFDetailsComponent } from './SIRF/sirfdetails/sirfdetails.component';
import { SIRFCostTrackingComponent } from './SIRF/sirfcost-tracking/sirfcost-tracking.component';
import { RootCauseCategoryListComponent } from './SIRF/root-cause-category-list/root-cause-category-list.component';
import { SIRFCompleteComponent } from './SIRF/sirfcomplete/sirfcomplete.component';


@NgModule({
  declarations: [
    AppComponent,
    UXTestComponent,
    SIRFSearchComponent,
    PricingSearchComponent,
    PricingInitiateComponent,
    InitiateMainComponent,
    DialogConfirmDeleteComponent,
    ProductDetailsComponent,
    ProductFinalisedComponent,
    PricingFinalisedComponent,        
    QuoteReportV2Component, LandingComponent, SIRFInitiateComponent, FileUploadComponent, SIRFDetailsComponent, SIRFCostTrackingComponent, RootCauseCategoryListComponent, SIRFCompleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,

    MatFormFieldModule,
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: PathLocationStrategy},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
