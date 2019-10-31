import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-pricing-initiate',
  templateUrl: './pricing-initiate.component.html',
  styleUrls: ['./pricing-initiate.component.css']
})
export class PricingInitiateComponent implements OnInit {

  private pricingGroup: FormGroup;

  constructor(fb: FormBuilder) { 
    this.pricingGroup = fb.group({
      CompanyName: [''],
      CustomerID: [''],      
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

}
