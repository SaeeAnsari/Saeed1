import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InitiateProviderService } from '../Providers/initiate-provider.service';

import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogConfirmDeleteComponent } from '../dialog-confirm-delete/dialog-confirm-delete.component';
import { Observable } from 'rxjs';





@Component({
  selector: 'app-initiate-main',
  templateUrl: './initiate-main.component.html',
  styleUrls: ['./initiate-main.component.css'],
  providers: [InitiateProviderService]
})
export class InitiateMainComponent implements OnInit {

  displayedColumns: string[] = ['ProductCode','ProductDescription', 'Actions'];

  private pricingID: number;
  private pricingGroup: FormGroup;
  private companyNames: string[] = [];
  private customerNames = [];
  private customerIDs = [];
  private opportunityOwners = [];
  private productResults = [];

  private selectedCompany = "";
  private selectedOwner = "";
  private selectedCustomer = "";
  private selectedCustomerName = "";
  private selectedOpportunityType = "";
  private selectedPriority = "";
  private quoteID = 0;
  private quoteLineID = 0;
  private _quoteData = null;
  private _lineData= null;

  ngOnInit(): void {
  }


  async loadQuote(quoteID) {

    this.quoteID = quoteID;
    this.initiateService.getCompanyList().subscribe(ret => {
      this.companyNames = ret;

      if (quoteID > 0) {
        this.initiate.getQuote(quoteID).subscribe(ret => {
          if (ret.length > 0) {
            this._quoteData = ret[0];
            this.selectedCompany = this._quoteData.companyName;


            this.initiate.getCustomerNameList(this.selectedCompany).subscribe(cust1 => {
              cust1.forEach(element => {
                this.customerNames.push({ id: element.id, name: element.name });
              });
            });

            this.initiate.getCustomerIDList(this.selectedCompany).subscribe(cust => {
              cust.forEach(element => {
                this.customerIDs.push({ id: element.id, name: element.id });
              });

            });

            this.initiate.getOpportunityOwners(this.selectedCompany).subscribe(opp => {
              opp.forEach(element => {
                this.opportunityOwners.push({ id: element.id, name: element.name });
              });
            });
          }
        })

        this._lineData = [];
        this.initiate.getQuoteLines(quoteID).subscribe(line => {
          line.forEach(element => {
            this._lineData.push({ ProductDescription: element.productDescription, ProductCode: element.productCode});
          });

          console.log(this.productResults);
        })

        setTimeout(() => {
          this.selectedCustomer = this._quoteData.customerID;
          this.selectedOwner = this._quoteData.opportunityOwner;
          this.selectedOpportunityType = this._quoteData.opportunityType;
          this.selectedPriority = this._quoteData.priorityLevel;

          this.pricingGroup.controls.QuoteNumber.setValue(this._quoteData.quoteID);
          this.pricingGroup.controls.OpportunityName.setValue(this._quoteData.opportunityName);
          this.pricingGroup.controls.RequestedBy.setValue(this._quoteData.requestedBy);
          this.pricingGroup.controls.SubmittedDate.setValue(this._quoteData.submittedDate);

          this.productResults = this._lineData;
         
        }, 2000);
      }
    });
  }

  /*
  async getQuoteLines(quoteID): Observable{
    let data = [];
    this.initiate.getQuoteLines(quoteID).subscribe(line => {
      line.forEach(element => {
        data.push({ ProductDescription: element.productDescription, ProductCode: element.productCode });
        return data;
      });      
    })
  }
*/


  constructor(
    fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    public initiateService: InitiateProviderService,
    public initiate: InitiateProviderService) {


    this.pricingGroup = fb.group({
      CompanyName: ['', [Validators.required]],
      CustomerID: ['', [Validators.required]],
      CustomerName: ['', [Validators.required]],
      QuoteNumber: ['', [Validators.required]],
      OpportunityName: ['', [Validators.required]],
      OpportunityType: ['', [Validators.required]],
      OpportunityOwner: ['', [Validators.required]],
      SubmittedDate: ['', [Validators.required]],
      PriorityLevel: ['', [Validators.required]],
      RequestedBy: ['', [Validators.required]]
    });

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.pricingID = this.router.getCurrentNavigation().extras.state.PricingID;
      }
    });

    this.loadQuote(31168);

  }

  getFormData() {

    let data = {
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

  save() {
    if (this.pricingGroup.valid) {
      let data = this.getFormData();


      this.initiate.saveOpportunity(data);
    }
  }

  submit() {
    if (this.pricingGroup.valid) {
      let data = this.getFormData();

      this.initiate.submitOpportunity(data);
    }
  }

  delete() {

    this.initiate.deleteOpportunity(this.pricingID);
  }

  companyname_change(e) {


    if (this.pricingGroup.controls.CompanyName.valid) {
      console.log(this.pricingGroup.value.CompanyName);

      this.renderCustomerIDs();
      this.renderCustomerNames();
      this.renderOpportunityOwners();
    }
  }

  renderOpportunityOwners() {
    this.opportunityOwners = [];

    if (this.selectedCompany != "") {

      this.initiate.getOpportunityOwners(this.selectedCompany).subscribe(ret => {
        ret.forEach(element => {
          this.opportunityOwners.push({ id: element.id, name: element.name });
        });
      });
    }
  }

  renderCustomerIDs() {
    this.customerIDs = [];
    if (this.selectedCompany != "") {
      this.initiate.getCustomerIDList(this.pricingGroup.value.CompanyName).subscribe(ret => {
        ret.forEach(element => {
          this.customerIDs.push({ id: element.id, name: element.id });
        });
      });
    }
  }

  renderCustomerNames() {
    this.customerNames = [];
    if (this.selectedCompany != "") {
      this.initiate.getCustomerNameList(this.pricingGroup.value.CompanyName).subscribe(ret => {
        ret.forEach(element => {

          this.customerNames.push({ id: element.id, name: element.name });
        });
      })
    }
  }
}
