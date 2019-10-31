import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-initiate-main',
  templateUrl: './initiate-main.component.html',
  styleUrls: ['./initiate-main.component.css']
})
export class InitiateMainComponent implements OnInit {
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

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

}
