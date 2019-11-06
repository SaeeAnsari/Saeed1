import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { ProductDetailsComponent } from '../product-details/product-details.component';



@Component({
  selector: 'app-pricing-initiate',
  templateUrl: './pricing-initiate.component.html',
  styleUrls: ['./pricing-initiate.component.css']
})
export class PricingInitiateComponent implements OnInit {

  private quoteID = 0;
  private quoteLineID = 0;
  private companyName = "";

  @ViewChild("productDetails", {static: false}) productDetails: ProductDetailsComponent;


  constructor() {    
  }


  ngOnInit() {
  }

  ReceiveQuoteID(data){
    this.quoteID = data.QuoteID;
    this.companyName = data.CompanyName
    this.productDetails.QuoteID = data.QuoteID;
    this.productDetails.CompanyName = data.CompanyName;
    this.productDetails.ngOnInit();    
  }
}
