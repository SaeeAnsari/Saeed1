import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute } from '@angular/router';
import { InitiateProviderService } from '../Providers/initiate-provider.service';

@Component({
  selector: 'app-quote-report-v2',
  templateUrl: './quote-report-v2.component.html',
  styleUrls: ['./quote-report-v2.component.css']
})
export class QuoteReportV2Component implements OnInit {

  private quoteID = 0;//16310;

  public data = [];
  public firstObject = null; 

  displayedColumns: string[] = ['productDescription', 'productCode', 'quoteUOM', 'packSize', 'containerType', 'sellingPricePerUOM', 'currencyCode', 'transportTerms', 
  'warehouse', 'minimumOrderQuantity', 'estimnatedLeadTime'];

  constructor(private activeRoute: ActivatedRoute, private inititae: InitiateProviderService) {

    var x = document.getElementById('siteHeader');
    if(x!= null){
      x.style.display = "none";
    }

    activeRoute.paramMap.subscribe(sub=>{
      if(sub.get("quoteID") != null){
        this.quoteID = +sub.get("quoteID");        
      }
    })


    this.laodData();
   }

  ngOnInit() {

    

  }


  laodData(){
    this.data = [];
    this.inititae.getQuoteReportData(this.quoteID).subscribe(sub=>{
      this.data = sub;
      if(sub != null  && sub.length > 0)
        this.firstObject = sub[0];
    })
  }

  generateReport(){
    var data = document.getElementById('tblReportContent');
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      pdf.save('c:/22_quote.pdf');
    })
  }

}
