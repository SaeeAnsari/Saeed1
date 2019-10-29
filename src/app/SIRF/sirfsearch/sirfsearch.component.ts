import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sirfsearch',
  templateUrl: './sirfsearch.component.html',
  styleUrls: ['./sirfsearch.component.css']
})
export class SIRFSearchComponent implements OnInit {

  private validationError: boolean = false;
  private sirfGroup: FormGroup;
  private validationMessage: string;

  constructor(fb: FormBuilder) {
    this.sirfGroup = fb.group({
      SIRFNumber: [''],
      PriorityLevel: [''],
      CategoryOfRequest: [''],
      BusinessRegion: [''],
      CustomerName: [''],
      CompletionDate: ['']

    })
  }

  ngOnInit() {

  }


  gatherSearchResults() {
    let data = {
      SIRFNumber:'',
      PriorityLevel:'',
      CategoryOfRequest:'',
      BusinessRegion:'',
      CustomerName:'',
      CompletionDate:''
    }
    
    this.validationError = true;

    if (this.sirfGroup.value.SIRFNumber.length > 0) {
      data.SIRFNumber = this.sirfGroup.value.SIRFNumber;    
      this.validationError = false;  
    }

    if (this.sirfGroup.value.PriorityLevel.length > 0) {
      data.PriorityLevel = this.sirfGroup.value.PriorityLevel;
      this.validationError = false;  
    }

    if (this.sirfGroup.value.CategoryOfRequest.length > 0) {
      data.CategoryOfRequest = this.sirfGroup.value.CategoryOfRequest;
      this.validationError = false;  
    }

    if (this.sirfGroup.value.BusinessRegion.length > 0) {
      data.BusinessRegion = this.sirfGroup.value.BusinessRegion;
      this.validationError = false;  
    }

    if (this.sirfGroup.value.CustomerName.length > 0) {
      data.CustomerName = this.sirfGroup.value.CustomerName;
      this.validationError = false;  
    }

    if (this.sirfGroup.value.CompletionDate != null) {
      data.CompletionDate = this.sirfGroup.value.CompletionDate.toLocaleDateString();
      this.validationError = false;  
    }

    if(this.validationError){
      this.validationMessage = "Please enter atleast 1 seach criteria";
    }

    return data;
  }

  search() {

    let data = this.gatherSearchResults();

    console.log(data);
  }
}
