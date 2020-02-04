import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';



import { SearchProvider } from '../Providers/search-provider';
import { getTreeMissingMatchingNodeDefError } from '@angular/cdk/tree';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-pricing-search',
  templateUrl: './pricing-search.component.html',
  styleUrls: ['./pricing-search.component.css'],
  providers: [SearchProvider]
})
export class PricingSearchComponent implements OnInit {


  displayedColumns: string[] = ['CustomerName', 'QuoteNumber', 'OpportunityName', 'OpportunityType', 'OpportunityOwner', 'SubmittedDate', 'FinalisedDate', 'PriorityLevel', 'RequestedBy', 'Actions'];



  public validationError: boolean = false;
  public pricingGroup: FormGroup;
  public validationMessage: string;
  private searchResults = [];
  public productResults = [];



  constructor(private fb: FormBuilder, private sp: SearchProvider, private router: Router,
    private activatedRout: ActivatedRoute, private locationStrategy: LocationStrategy) {

      sessionStorage.setItem("activeQuoteID", "");


    this.pricingGroup = fb.group({
      CustomerName: [''],
      QuoteNumber: [''],
      OpportunityName: [''],
      OpportunityType: [''],
      OpportunityOwner: [''],
      ProductCode: [''],
      ProductDescription: [''],
      SubmittedDate: [''],
      FinalisedDate: [''],
      PriorityLevel: [''],
      RequestedBy: ['']
    })

    console.log("Location");

    console.log(this.locationStrategy.getBaseHref());
  }

  ngOnInit() {

  }


  createSearchString() {
    let queryParams = [];
    let searchString = '';

    let data = {
      CustomerName: '',
      QuoteNumber: '',
      OpportunityName: '',
      OpportunityType: '',
      OpportunityOwner: '',
      ProductCode: '',
      ProductDescription: '',
      SubmittedDate: '',
      FinalisedDate: '',
      PriorityLevel: '',
      RequestedBy: ''
    }

    this.validationError = true;


    if (this.pricingGroup.value.CustomerName.length > 0) {
      data.CustomerName = this.pricingGroup.value.CustomerName;
      queryParams.push(this.formCondition("CustomerName", data.CustomerName));
      this.validationError = false;
    }

    if (this.pricingGroup.value.QuoteNumber.length > 0) {
      data.QuoteNumber = this.pricingGroup.value.QuoteNumber;
      queryParams.push(this.formCondition("q.QuoteID", data.QuoteNumber));
      this.validationError = false;
    }

    if (this.pricingGroup.value.OpportunityName.length > 0) {
      data.OpportunityName = this.pricingGroup.value.OpportunityName;
      queryParams.push(this.formCondition("OpportunityName", data.OpportunityName));
      this.validationError = false;
    }

    if (this.pricingGroup.value.OpportunityType.length > 0) {
      data.OpportunityType = this.pricingGroup.value.OpportunityType;
      queryParams.push(this.formCondition("OpportunityType", data.OpportunityType));
      this.validationError = false;
    }

    if (this.pricingGroup.value.OpportunityOwner.length > 0) {
      data.OpportunityOwner = this.pricingGroup.value.OpportunityOwner;
      queryParams.push(this.formCondition("OpportunityOwner", data.OpportunityOwner));
      this.validationError = false;
    }

    if (this.pricingGroup.value.ProductCode.length > 0) {
      data.ProductCode = this.pricingGroup.value.ProductCode;
      queryParams.push(this.formCondition("ProductCode", data.ProductCode));

      this.validationError = false;
    }


    if (this.pricingGroup.value.ProductDescription.length > 0) {
      data.ProductDescription = this.pricingGroup.value.ProductDescription;

      queryParams.push(this.formCondition("ProductDescription", data.ProductDescription));
      this.validationError = false;
    }


    if (this.pricingGroup.value.SubmittedDate.length > 0) {
      data.SubmittedDate = this.pricingGroup.value.SubmittedDate;
      queryParams.push(this.formCondition("SubmittedDate", data.SubmittedDate));
      this.validationError = false;
    }


    if (this.pricingGroup.value.FinalisedDate.length > 0) {
      data.FinalisedDate = this.pricingGroup.value.FinalisedDate;
      queryParams.push(this.formCondition("FinalisedDate", data.FinalisedDate));
      this.validationError = false;
    }

    if (this.pricingGroup.value.PriorityLevel.length > 0) {
      data.PriorityLevel = this.pricingGroup.value.PriorityLevel;
      queryParams.push(this.formCondition("Priority", data.PriorityLevel));
      this.validationError = false;
    }

    if (this.pricingGroup.value.RequestedBy.length > 0) {
      data.RequestedBy = this.pricingGroup.value.RequestedBy;
      queryParams.push(this.formCondition("CreatedBy", data.RequestedBy));
      this.validationError = false;
    }



    if (this.validationError) {
      this.validationMessage = "Please enter atleast 1 seach criteria";
    }
    else {
      searchString = ' Where '

      queryParams.forEach(element => {
        if (searchString == ' Where ') {
          //first variable
          searchString += element;
        }
        else {
          searchString += 'AND ' + element;
        }
      });
    }

    return searchString;
  }

  formCondition(DBColumn = '', UIValue = '') {
    var condition = '';

    if (UIValue.includes('%')) {
      condition = DBColumn + ' Like \'' + UIValue + '\'';
    }
    else {
      condition = DBColumn + ' = \'' + UIValue + '\'';
    }

    return condition;
  }

  lineEdit(data) {

    let navigationExtras: NavigationExtras = {
      state: {
        quoteID: data.QuoteNumber
      }
    };

    if(data.SubmittedDate == null)
      this.router.navigate(['pricinginitiate'], navigationExtras);
    else
      this.router.navigate(['pricingfinalise'], navigationExtras);
  }


  search(searchType) {


    console.log(this.router.getCurrentNavigation());

    let queryString;
    if (searchType == 'custom')
      queryString = this.createSearchString();

    else if (searchType == 'All_Saved') {
      queryString = "WHERE IsSubmitted = 0"
    }

    else if (searchType == 'All_Pending') {
      queryString = "WHERE IsSubmitted = 1 AND IsFinalised = 0"
    }


    this.searchResults = [];




    if (!this.validationError) {
      this.sp.SearchPricing(queryString).subscribe(sub => {
        var items = [];
        sub.forEach(element => {
          this.searchResults.push({
            CustomerName: element.customerName,
            QuoteNumber: element.quoteID,
            OpportunityName: element.opportunityName,
            OpportunityType: element.opportunityType,
            OpportunityOwner: element.opportunityOwner,
            ProductCode: element.productCode,
            ProductDescription: element.productDescription,
            SubmittedDate: element.submittedDate,
            FinalisedDate: element.finalisedDate,
            PriorityLevel: element.priorityLevel,
            RequestedBy: element.requestedBy
          })
        });
        this.productResults = this.searchResults;
      });

    }
  }
}
