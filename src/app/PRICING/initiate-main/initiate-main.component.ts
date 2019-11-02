import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InitiateProviderService } from '../Providers/initiate-provider.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogConfirmDeleteComponent } from '../dialog-confirm-delete/dialog-confirm-delete.component';





@Component({
  selector: 'app-initiate-main',
  templateUrl: './initiate-main.component.html',
  styleUrls: ['./initiate-main.component.css'],
  providers: [InitiateProviderService]
})
export class InitiateMainComponent implements OnInit {

  displayedColumns: string[] = ['ProductCode', 'Description'];

  private pricingID: number;
  private pricingGroup: FormGroup;
  private companyNames: string[] = [];
  private customerNames = [];
  private customerIDs = [];
  private selectedCustomer;

  ngOnInit(): void {
    this.initiateService.getCompanyList().subscribe(ret => {
      this.companyNames = ret;
    });
  }

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

  companyname_change(e){
   

    if(this.pricingGroup.controls.CompanyName.valid){
      console.log(this.pricingGroup.value.CompanyName);

      this.renderCustomerIDs();
      this.renderCustomerNames();
      
    }
  }


  CustomerID: FormGroup;




  renderCustomerIDs(){
    this.customerIDs = [];
    this.initiate.getCustomerIDList(this.pricingGroup.value.CompanyName).subscribe(ret=>{
      ret.forEach(element => {
        this.customerIDs.push({id: element.id, name: element.id});
      });
    });
  }

 renderCustomerNames(){
    this.customerNames = [];
    this.initiate.getCustomerNameList(this.pricingGroup.value.CompanyName).subscribe(ret=>{
      ret.forEach(element => {
       
        this.customerNames.push({id: element.id, name: element.name});          
      });
    })
  }
}
