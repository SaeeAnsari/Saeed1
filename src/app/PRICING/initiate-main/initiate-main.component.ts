import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InitiateProviderService } from '../Providers/initiate-provider.service';

@Component({
  selector: 'app-initiate-main',
  templateUrl: './initiate-main.component.html',
  styleUrls: ['./initiate-main.component.css'],
  providers: [InitiateProviderService]
})
export class InitiateMainComponent implements OnInit {
  ngOnInit(): void {
    
  }

  private pricingGroup: FormGroup;

  constructor(fb: FormBuilder) { 
    this.pricingGroup = fb.group({
      CompanyName: ['', [Validators.required]],
      CustomerID: ['', [Validators.required]],      
      CustomerName: ['', [Validators.required]],
      QuoteNumber: ['', [Validators.required]],
      OpportunityName: ['', [Validators.required]],
      OpportunityType: ['', [Validators.required]],
      OpportunityOwner: ['', [Validators.required]],
      ProductCode: [''],
      ProductDescription: [''],
      SubmittedDate: ['', [Validators.required]],
      PriorityLevel: ['', [Validators.required]],
      RequestedBy: ['', [Validators.required]]
    })
  }

  getFormData(){

    let data= {
      CompanyName: this.pricingGroup.value.CompanyName,
      PriorityLevel: this.pricingGroup.value.PriorityLevel,
      CustomerID: this.pricingGroup.value.CustomerID,
      CustomerName: this.pricingGroup.value.CustomerName,      
      QuoteNumber: this.pricingGroup.value.QuoteNumber,
      OpportunityName: this.pricingGroup.value.OpportunityName,
      OpportunityType: this.pricingGroup.value.OpportunityType,
      OpportunityOwner: this.pricingGroup.value.OpportunityOwner,
      ProductCode: this.pricingGroup.value.ProductCode,
      ProductDescription: this.pricingGroup.value.ProductDescription,
      SubmittedDate: this.pricingGroup.value.SubmittedDate,
      FinalisedDate: this.pricingGroup.value.FinalisedDate,
      RequestedBy: this.pricingGroup.value.RequestedBy,
      Timestamp: new Date().toLocaleString()
    };
    
    return data;
  }

  save(){
    if(this.pricingGroup.valid){
      let data = this.getFormData();

      let initiate = new InitiateProviderService();
      initiate.saveOpportunity(data);
    }
  }
}
