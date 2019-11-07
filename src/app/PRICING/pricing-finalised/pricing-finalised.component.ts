import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ProductFinalisedComponent } from '../product-finalised/product-finalised.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-pricing-finalised',
  templateUrl: './pricing-finalised.component.html',
  styleUrls: ['./pricing-finalised.component.css']
})
export class PricingFinalisedComponent implements OnInit {

  @ViewChild("productDetails", {static: false}) productDetails: ProductDetailsComponent;
  @ViewChild("productFinalised", {static: false}) productFinalised: ProductFinalisedComponent;

  private quoteID = 0;
  private quoteLineID = 0;
  private companyName = "";

  constructor() { }

  ngOnInit() {
  }

  ReceiveQuoteID(data){

    console.log(data);
    this.quoteID = data.QuoteID;
    this.companyName = data.CompanyName;


    this.productDetails.QuoteID = data.QuoteID;
    this.productDetails.CompanyName = data.CompanyName;
    this.productDetails.ngOnInit();    

    this.productFinalised.QuoteID = this.quoteID.toString();
    this.productFinalised.CompanyName = this.companyName;
    this.productFinalised.loadData();
  }
}
