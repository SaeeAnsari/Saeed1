import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sirfreport',
  templateUrl: './sirfreport.component.html',
  styleUrls: ['./sirfreport.component.css']
})
export class SIRFReportComponent implements OnInit {

  constructor() { }
  public data = null;
  public sirf = null;
  

  ngOnInit() {
    var x = document.getElementById('siteHeader');
    if(x!= null){
      x.style.display = "none";
    }


    this.data = {
      customerName : 'Westons - Cobourg',
      customerRegion : 'Ontario',
      SIRFNumber : '198',
      requestDate :'08/25/2011',
      completionDate : '09/09/2011',
      productCode: 'NA',
      productDescription: 'Weston Cobourg Pick-Ups',
      lotNumber: 'NA',
      complaint: 'Customer, Danielle Kennedy from Weston Cobourgh, stated that their driver for Shearer Transport said that there has been long wait times at Nealanders lately. Head office contacts were copied on this matter.',
      rootCauseAnalysis: 'NA',
      correctiveActions: 'NA',
      requestedBy: 'sansari'
    };    



  }

}
