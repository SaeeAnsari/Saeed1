import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import {SearchProvider} from '../Providers/search-provider';
import { getTreeMissingMatchingNodeDefError } from '@angular/cdk/tree';

@Component({
  selector: 'app-pricing-search',
  templateUrl: './pricing-search.component.html',
  styleUrls: ['./pricing-search.component.css'],
  providers: [SearchProvider]
})
export class PricingSearchComponent implements OnInit {

  
  displayedColumns: string[] = ['CustomerName', 'QuoteNumber', 'OpportunityName', 'OpportunityType', 'OpportunityOwner', 'ProductCode', 'ProductDescription', 'SubmittedDate', 'FinalisedDate', 'PriorityLevel', 'RequestedBy'];
  
  

  private validationError: boolean = false;
  private pricingGroup: FormGroup;
  private validationMessage: string;
  private searchResults;



  constructor(fb: FormBuilder) {
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


  gatherSearchResults() {
    let data = {
      CustomerName:'',
      QuoteNumber:'',
      OpportunityName:'',
      OpportunityType:'',
      OpportunityOwner:'',
      ProductCode:'',
      ProductDescription:'',
      SubmittedDate:'',
      FinalisedDate:'',
      PriorityLevel:'',
      RequestedBy:''
    }
    
    this.validationError = true;

    
    if (this.pricingGroup.value.CustomerName.length > 0) {
      data.CustomerName = this.pricingGroup.value.CustomerName;    
      this.validationError = false;  
    }

    if (this.pricingGroup.value.QuoteNumber.length > 0) {
      data.QuoteNumber = this.pricingGroup.value.QuoteNumber;
      this.validationError = false;  
    }

    if (this.pricingGroup.value.OpportunityName.length > 0) {
      data.OpportunityName = this.pricingGroup.value.OpportunityName;
      this.validationError = false;  
    }

    if (this.pricingGroup.value.OpportunityType.length > 0) {
      data.OpportunityType = this.pricingGroup.value.OpportunityType;
      this.validationError = false;  
    }

    if (this.pricingGroup.value.OpportunityOwner.length > 0) {
      data.OpportunityOwner = this.pricingGroup.value.OpportunityOwner;
      this.validationError = false;  
    }

    if (this.pricingGroup.value.ProductCode.length > 0) {
      data.ProductCode = this.pricingGroup.value.ProductCode;
      this.validationError = false;  
    }


    if (this.pricingGroup.value.ProductDescriptionlength > 0) {
      data.ProductDescription = this.pricingGroup.value.ProductDescription;
      this.validationError = false;  
    }


    if (this.pricingGroup.value.SubmittedDate.length > 0) {
      data.SubmittedDate = this.pricingGroup.value.SubmittedDate;
      this.validationError = false;  
    }


    if (this.pricingGroup.value.FinalisedDate.length > 0) {
      data.FinalisedDate = this.pricingGroup.value.FinalisedDate;
      this.validationError = false;  
    }

    if (this.pricingGroup.value.PriorityLevel.length > 0) {
      data.PriorityLevel = this.pricingGroup.value.PriorityLevel;
      this.validationError = false;  
    }

    if (this.pricingGroup.value.RequestedBy.length > 0) {
      data.RequestedBy = this.pricingGroup.value.RequestedBy;
      this.validationError = false;  
    }



    if(this.validationError){
      this.validationMessage = "Please enter atleast 1 seach criteria";
    }

    return data;
  }   
  


  search(searchType) {

    let queryParams;
    if(searchType == 'Search')
      queryParams = this.gatherSearchResults();

    if(!this.validationError){
      let sp = new SearchProvider();
      this.searchResults = sp.SearchPricing(searchType, queryParams);
    }

  }
}
