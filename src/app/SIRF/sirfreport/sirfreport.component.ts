import { Component, OnInit } from '@angular/core';
import { SirfInitaiteService } from '../Providers/sirf-initaite.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sirfreport',
  templateUrl: './sirfreport.component.html',
  styleUrls: ['./sirfreport.component.css']
})
export class SIRFReportComponent implements OnInit {


  public SIRFID = 0;

  constructor(private service: SirfInitaiteService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      route.paramMap.subscribe(sub => {
        if (sub.get("sirfID") != null) {
          this.SIRFID = +sub.get("sirfID");
        }
      })
    });

  }
  public data = null;
  public sirf = null;



  ngOnInit() {
    var x = document.getElementById('siteHeader');
    if (x != null) {
      x.style.display = "none";
    }

    /*
    this.sirfGroup.controls.SIRFNumber.setValue(data.sirfNumber);
      this.sirfGroup.controls.PrimaryResponsibility.setValue(data.primaryResponsibilityID.toString());
      this.sirfGroup.controls.CompanyName.setValue(data.companyName);
      this.sirfGroup.controls.Priority.setValue(data.priorityID.toString());
      this.sirfGroup.controls.RequestCategory.setValue(data.requestCategoryID.toString());
      this.sirfGroup.controls.CustomerID.setValue(data.customerID.toString());
      this.sirfGroup.controls.CustomerName.setValue(data.customerName);
      this.sirfGroup.controls.CustomerRegion.setValue(data.customerRegionID.toString());
      this.sirfGroup.controls.BusinessRegion.setValue(data.businessRegionID.toString());
      this.sirfGroup.controls.DateOfIncident.setValue(data.dateOfIncident);
      this.sirfGroup.controls.RequestedBy.setValue(data.requestedBy);
      this.sirfGroup.controls.RequestedDate.setValue(new Date(Date.parse(data.requestedDate)));
      this.sirfGroup.controls.ReoccuringIssue.setValue(data.reoccuringIssueID.toString());
      this.sirfGroup.controls.ProductType.setValue(data.productType);
      this.sirfGroup.controls.ComplaintDetails.setValue(data.complaintDetails);


      this.sirfGroup.controls.PartID.setValue(data.partID);
      this.sirfGroup.controls.PartName.setValue(data.partID);
      this.sirfGroup.controls.SalesOrderNumber.setValue(data.salesOrderNumber);
      this.sirfGroup.controls.LotNumber.setValue(data.lotNumber);
      this.sirfGroup.controls.CustomerPO.setValue(data.customerPO);
      this.sirfGroup.controls.ComplaintSampleReceived.setValue(data.complaintSampleReceived)
    */

    this.service.getSIRF(this.SIRFID).subscribe(sub => {

      this.data = {
        customerName: sub.customerName,
        customerRegion: sub.customerRegion.toString(),
        SIRFNumber: sub.sirfNumber.toString(),
        requestDate: (new Date(Date.parse(sub.requestedDate))).toLocaleDateString(),
        completionDate: (new Date(Date.parse(sub.requestCompletionDate))).toLocaleDateString(),
        productCode: sub.partID,
        productDescription: sub.partName,
        lotNumber: sub.lotNumber,
        complaint: sub.complaintDetails,
        rootCauseAnalysis: sub.rootCauseAnalysis,
        correctiveActions: sub.correctiveAnalysis,
        requestedBy: sub.requestedBy
      };

    });








  }

}
