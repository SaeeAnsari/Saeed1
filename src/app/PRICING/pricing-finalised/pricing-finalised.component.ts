import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ProductFinalisedComponent } from '../product-finalised/product-finalised.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pricing-finalised',
  templateUrl: './pricing-finalised.component.html',
  styleUrls: ['./pricing-finalised.component.css']
})
export class PricingFinalisedComponent implements OnInit {

  @ViewChild("productDetails", { static: false }) productDetails: ProductDetailsComponent;
  @ViewChild("productFinalised", { static: false }) productFinalised: ProductFinalisedComponent;

  private quoteID = 0;
  private quoteLineID = 0;
  private companyName = "";

  constructor(private route: ActivatedRoute,
    private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.quoteID = this.router.getCurrentNavigation().extras.state.QuoteID;
      }
    });
    //31191 
    //31186
    //"7649";//
    //31099
    this.quoteID = 31186;
  }

  ngOnInit() {
  }

  ReceiveQuoteID(data) {

    console.log(data);
    this.quoteID = data.QuoteID;
    this.companyName = data.CompanyName;
   
    this.productFinalised.QuoteID = this.quoteID.toString();
    this.productFinalised.CompanyName = this.companyName;
    this.productFinalised.loadData();
  }
}
