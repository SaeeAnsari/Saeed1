import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-pricing-initiate',
  templateUrl: './pricing-initiate.component.html',
  styleUrls: ['./pricing-initiate.component.css']
})
export class PricingInitiateComponent implements OnInit {

  public quoteID = 0;
  public quoteLineID = 0;
  public companyName = "";

  @ViewChild("productDetails", { static: false }) productDetails: ProductDetailsComponent;


  constructor(private route: ActivatedRoute,
    private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.quoteID = this.router.getCurrentNavigation().extras.state.quoteID;
        sessionStorage.setItem("activeQuoteID", this.quoteID.toString());
      }
      else {
        route.paramMap.subscribe(sub => {
          if (sub.get("quoteID") != null) {
            this.quoteID = +sub.get("quoteID");
            sessionStorage.setItem("activeQuoteID", this.quoteID.toString());
          }
        })
      }
    });

    //31191 
    //31186
    //"7649";//
    //this.quoteID = 31186;        
  }


  ngOnInit() {
    if (this.quoteID <= 0 && (sessionStorage.getItem("activeQuoteID") != null || sessionStorage.getItem("activeQuoteID") != ''))
      this.quoteID = +sessionStorage.getItem("activeQuoteID");
  }

  ReceiveQuoteID(data) {

    this.quoteID = data.QuoteID;
    this.companyName = data.CompanyName
    this.productDetails.QuoteID = data.QuoteID;
    this.productDetails.CompanyName = data.CompanyName;
    this.productDetails.ngOnInit();
  }


  AddNewComponent() {
    this.productDetails.showProductDetails = true;
    this.productDetails.pricingGroup.reset();
    this.productDetails.quoteLineID = 0;


    var defaultCurrencyID = this.productDetails.currencyCodes.filter(function (item) {
      return item.name == 'CAD';
    })[0].id;

    this.productDetails.pricingGroup.controls['UsageLevel'].setValue('0');
    this.productDetails.pricingGroup.controls['CurrencyOfTargetPrice'].setValue(defaultCurrencyID.toString());
    this.productDetails.pricingGroup.controls['TargetPrice'].setValue('0');
    this.productDetails.pricingGroup.controls['NotesAndComment'].setValue('N/A');
    this.productDetails.pricingGroup.controls['TypicalOrderSize'].setValue('0')

    if (sessionStorage.getItem('parts_list_' + this.companyName) != null) {
      this.productDetails.partList = JSON.parse(sessionStorage.getItem('parts_list_' + this.companyName));
    }
  }
}
