import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ProductFinalisedComponent } from '../product-finalised/product-finalised.component';

@Component({
  selector: 'app-pricing-finalised',
  templateUrl: './pricing-finalised.component.html',
  styleUrls: ['./pricing-finalised.component.css']
})
export class PricingFinalisedComponent implements OnInit {

  @ViewChild("productFinalised", {static: false}) productDetails: ProductFinalisedComponent;

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
    this.productDetails.QuoteID = "7649";//this.quoteID.toString();
    this.productDetails.CompanyName = this.companyName;
    this.productDetails.loadData();
  }
}
