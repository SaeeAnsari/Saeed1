import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { SearchProvider } from '../Providers/search-provider';
import { getTreeMissingMatchingNodeDefError } from '@angular/cdk/tree';

@Component({
  selector: 'app-pricing-search',
  templateUrl: './pricing-search.component.html',
  styleUrls: ['./pricing-search.component.css'],
  providers: [SearchProvider]
})
export class PricingSearchComponent implements OnInit {


  displayedColumns: string[] = ['CustomerName', 'QuoteNumber', 'OpportunityName', 'OpportunityType', 'OpportunityOwner', 'SubmittedDate', 'FinalisedDate', 'PriorityLevel', 'RequestedBy'];



  private validationError: boolean = false;
  private pricingGroup: FormGroup;
  private validationMessage: string;
  private searchResults = [];
  private productResults = [];



  constructor(private fb: FormBuilder, private sp: SearchProvider) {
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
      queryParams.push("CustomerName  = \'" + data.CustomerName + "\'");
      this.validationError = false;
    }

    if (this.pricingGroup.value.QuoteNumber.length > 0) {
      data.QuoteNumber = this.pricingGroup.value.QuoteNumber;
      queryParams.push("QuoteID  = \'" + data.QuoteNumber + "\'");
      this.validationError = false;
    }

    if (this.pricingGroup.value.OpportunityName.length > 0) {
      data.OpportunityName = this.pricingGroup.value.OpportunityName;
      queryParams.push("OpportunityName  = \'" + data.OpportunityName + "\'");
      this.validationError = false;
    }

    if (this.pricingGroup.value.OpportunityType.length > 0) {
      data.OpportunityType = this.pricingGroup.value.OpportunityType;
      queryParams.push("OpportunityType  = \'" + data.OpportunityType + "\'");
      this.validationError = false;
    }

    if (this.pricingGroup.value.OpportunityOwner.length > 0) {
      data.OpportunityOwner = this.pricingGroup.value.OpportunityOwner;
      queryParams.push("OpportunityOwner  = \'" + data.OpportunityOwner + "\'");
      this.validationError = false;
    }

    if (this.pricingGroup.value.ProductCode.length > 0) {
      data.ProductCode = this.pricingGroup.value.ProductCode;
      queryParams.push("ProductCode  = \'" + data.ProductCode + "\'");

      this.validationError = false;
    }


    if (this.pricingGroup.value.ProductDescriptionlength > 0) {
      data.ProductDescription = this.pricingGroup.value.ProductDescription;

      queryParams.push("ProductDescription  = \'" + data.ProductDescription + "\'");
      this.validationError = false;
    }


    if (this.pricingGroup.value.SubmittedDate.length > 0) {
      data.SubmittedDate = this.pricingGroup.value.SubmittedDate;
      queryParams.push("SubmittedDate  = \'" + data.SubmittedDate + "\'");
      this.validationError = false;
    }


    if (this.pricingGroup.value.FinalisedDate.length > 0) {
      data.FinalisedDate = this.pricingGroup.value.FinalisedDate;
      queryParams.push("FinalisedDate  = \'" + data.FinalisedDate + "\'");
      this.validationError = false;
    }

    if (this.pricingGroup.value.PriorityLevel.length > 0) {
      data.PriorityLevel = this.pricingGroup.value.PriorityLevel;
      queryParams.push("Priority  = \'" + data.PriorityLevel + "\'");
      this.validationError = false;
    }

    if (this.pricingGroup.value.RequestedBy.length > 0) {
      data.RequestedBy = this.pricingGroup.value.RequestedBy;
      queryParams.push("CreatedBy  = \'" + data.RequestedBy + "\'");
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



  search(searchType) {

    let queryString;
    if (searchType == 'Search')
      queryString = this.createSearchString();
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
