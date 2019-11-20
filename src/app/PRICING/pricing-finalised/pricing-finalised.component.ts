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

  public quoteID = 0;
  public quoteLineID = 0;
  public companyName = "";

  constructor(private route: ActivatedRoute,
    private router: Router) {
    
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.quoteID = this.router.getCurrentNavigation().extras.state.quoteID;

          sessionStorage.setItem("activeQuoteID", this.quoteID.toString());          
        }
      });
    
    //31191 
    //31186
    //"7649";//
    //31099
    //this.quoteID = 31186;
  }

  ngOnInit() {
    if(this.quoteID <= 0 && (sessionStorage.getItem("activeQuoteID")!= null || sessionStorage.getItem("activeQuoteID")!= ''))
    this.quoteID = +sessionStorage.getItem("activeQuoteID");
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
