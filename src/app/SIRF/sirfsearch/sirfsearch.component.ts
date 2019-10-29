import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sirfsearch',
  templateUrl: './sirfsearch.component.html',
  styleUrls: ['./sirfsearch.component.css']
})



export class SIRFSearchComponent implements OnInit {


  displayedColumns: string[] = ['SIRFNumber', 'PriorityLevel', 'RequestCategory', 'BusinessRegion', 'CustomerName', 'RequestCompletionDate'];
  


  private validationError: boolean = false;
  private sirfGroup: FormGroup;
  private validationMessage: string;
  private searchResults = [
    {
      "SIRFNumber": "e48b3fec-f23e-4bc2-a503-969d10f71790",
      "PriorityLevel": "5db88592077ca7d60fddb5f9",
      "RequestCategory": "blue",
      "BusinessRegion": "North America",
      "CustomerName": "Freakin",
      "RequestedDate": "Saturday, January 2, 2016 9:31 AM",
      "RequestedBy": {
        "first": "Sexton",
        "last": "Greene"
      },
      "RequestCompletionDate": "Thursday, June 28, 2018 12:31 PM",
      "Details": "",
      "Report": ""
    },
    {
      "SIRFNumber": "c5d247c5-724d-42d6-b1e5-22c0303ce053",
      "PriorityLevel": "5db88592bf80b3ffbdb7a14d",
      "RequestCategory": "green",
      "BusinessRegion": "United Kingdom",
      "CustomerName": "Zanity",
      "RequestedDate": "Saturday, April 4, 2015 3:54 PM",
      "RequestedBy": {
        "first": "Norris",
        "last": "Odonnell"
      },
      "RequestCompletionDate": "Friday, April 12, 2019 2:42 PM",
      "Details": "",
      "Report": ""
    },
    {
      "SIRFNumber": "cdb07498-e5f3-41d5-8898-8e2e3e6729e4",
      "PriorityLevel": "5db88592baea56e04665ec60",
      "RequestCategory": "green",
      "BusinessRegion": "North America",
      "CustomerName": "Datagen",
      "RequestedDate": "Monday, July 21, 2014 6:05 PM",
      "RequestedBy": {
        "first": "Mullins",
        "last": "Graves"
      },
      "RequestCompletionDate": "Friday, April 17, 2015 5:52 AM",
      "Details": "",
      "Report": ""
    },
    {
      "SIRFNumber": "c7ee6e58-fa2c-482d-83ee-00ec542b7188",
      "PriorityLevel": "5db885921809b0a74c60c029",
      "RequestCategory": "green",
      "BusinessRegion": "North America",
      "CustomerName": "Vortexaco",
      "RequestedDate": "Wednesday, November 30, 2016 1:18 PM",
      "RequestedBy": {
        "first": "Mejia",
        "last": "Dejesus"
      },
      "RequestCompletionDate": "Tuesday, May 17, 2016 6:43 AM",
      "Details": "",
      "Report": ""
    },
    {
      "SIRFNumber": "ee60e452-6e8f-4d51-8889-e0b5a5aa73ab",
      "PriorityLevel": "5db88592fe29bb8156df7b07",
      "RequestCategory": "green",
      "BusinessRegion": "North America",
      "CustomerName": "Corpulse",
      "RequestedDate": "Tuesday, November 15, 2016 12:20 PM",
      "RequestedBy": {
        "first": "Miranda",
        "last": "Stanley"
      },
      "RequestCompletionDate": "Tuesday, May 31, 2016 9:04 AM",
      "Details": "",
      "Report": ""
    },
    {
      "SIRFNumber": "d1374cb2-c772-46f9-97be-01d84398ea1c",
      "PriorityLevel": "5db88592cb8f1ec05f9b1f62",
      "RequestCategory": "brown",
      "BusinessRegion": "United Kingdom",
      "CustomerName": "Xixan",
      "RequestedDate": "Saturday, January 9, 2016 2:36 AM",
      "RequestedBy": {
        "first": "Sonya",
        "last": "Harvey"
      },
      "RequestCompletionDate": "Sunday, December 20, 2015 1:22 AM",
      "Details": "",
      "Report": ""
    },
    {
      "SIRFNumber": "f7fa31f9-359d-44a9-9a84-a326ca82e2f9",
      "PriorityLevel": "5db88592e5f36da97b7231db",
      "RequestCategory": "blue",
      "BusinessRegion": "North America",
      "CustomerName": "Greeker",
      "RequestedDate": "Sunday, November 12, 2017 4:21 PM",
      "RequestedBy": {
        "first": "Gilliam",
        "last": "Kemp"
      },
      "RequestCompletionDate": "Friday, July 12, 2019 6:33 AM",
      "Details": "",
      "Report": ""
    },
    {
      "SIRFNumber": "3accd6b1-8240-4e95-be1a-adaff9082a27",
      "PriorityLevel": "5db88592aeeee341f42419e4",
      "RequestCategory": "brown",
      "BusinessRegion": "Aisa",
      "CustomerName": "Aquazure",
      "RequestedDate": "Sunday, April 6, 2014 12:19 AM",
      "RequestedBy": {
        "first": "Joann",
        "last": "Burt"
      },
      "RequestCompletionDate": "Friday, November 17, 2017 1:37 PM",
      "Details": "",
      "Report": ""
    },
    {
      "SIRFNumber": "475f11da-11a7-418e-a6f3-80c7173a86a9",
      "PriorityLevel": "5db88592fb800c1627f15143",
      "RequestCategory": "blue",
      "BusinessRegion": "Aisa",
      "CustomerName": "Hotcakes",
      "RequestedDate": "Thursday, August 13, 2015 12:24 AM",
      "RequestedBy": {
        "first": "Guzman",
        "last": "Fischer"
      },
      "RequestCompletionDate": "Wednesday, July 22, 2015 3:14 PM",
      "Details": "",
      "Report": ""
    }
  ];

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

    //let data = this.gatherSearchResults();



  }
}
