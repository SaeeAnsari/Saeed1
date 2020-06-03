import { Component, OnInit, AfterViewInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { InitiateProviderService } from '../Providers/initiate-provider.service';

import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogConfirmDeleteComponent } from '../dialog-confirm-delete/dialog-confirm-delete.component';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';







@Component({
  selector: 'app-initiate-main',
  templateUrl: './initiate-main.component.html',
  styleUrls: ['./initiate-main.component.css'],
  providers: [InitiateProviderService]
})
export class InitiateMainComponent implements OnInit, OnDestroy {

  protected _onDestroy = new Subject<void>();

  @Input() QuoteID: string = '0';
  @Input() DisabledMode: string = "no";
  @Output() AddNewQuote = new EventEmitter();
  @Output() BroadcastQuoteID = new EventEmitter<any>();

  

  public pricingGroup: FormGroup;
  public companyNames: string[] = [];
  public customerNames = [];
  public customerIDs = [];
  public opportunityOwners = [];
  public productResults = [];
  public paymentTerms = [];

  public lineItemSelectedValue = "";
  public selectedCompany = "";
  public selectedOwner = "";
  public selectedCustomer = "";
  public selectedCustomerName = "";
  public selectedOpportunityType = "";
  public selectedPriority = "";
  public selectedRequestedBy = "";
  public selectedResponsibility = "";
  public quoteID = 0;
  public quoteLineID = 0;
  private _quoteData = null;
  private _lineData = null;


  public quoteSubmitted: boolean = false;
  public quoteFinalised: boolean = false;

  public deliveryAddress: string = '';

  private customerIDsBackup = [];

  ngOnInit(): void {

    this.pricingGroup.valueChanges.subscribe(val => {
      this.pricingGroup.updateValueAndValidity({ onlySelf: false, emitEvent: false })
    });

    this.pricingGroup.controls.CustomerIDSearch.valueChanges
    .debounceTime(500)
    .pipe(takeUntil(this._onDestroy))    
    .subscribe(()=>{
      this.filterCustomerIDs();
    });    

    this.pricingGroup.controls.CustomerNameSearch.valueChanges
    .debounceTime(500)
    .pipe(takeUntil(this._onDestroy))    
    .subscribe(()=>{
      this.filterCustomerName();
    });    


    if (this.QuoteID != "") {
      this.quoteID = +this.QuoteID;
      this.loadQuote(this.quoteID, false);      
    }
  }


  loadQuote(quoteID, reloading) {

    this.pricingGroup.controls.QuoteNumber.disable();
    this.pricingGroup.controls.SubmittedDate.disable();

    this.quoteID = quoteID;
    this.initiateService.getCompanyList().subscribe(ret => {
      this.companyNames = ret;



      if (quoteID > 0) {
        this.initiate.getQuote(quoteID).subscribe(ret => {
          if (ret.length > 0) {
            this._quoteData = ret[0];
            this.selectedCompany = this._quoteData.companyName;
            this.quoteFinalised = this._quoteData.isFinalised;

            this.pricingGroup.controls.CompanyName.setValue(this._quoteData.companyName);

            this.BroadcastQuoteID.emit({
              QuoteID: this.quoteID,
              CompanyName: this._quoteData.companyName
            });

            if(!reloading){

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
          }            

            this.initiate.getPaymentTerms().subscribe(terms => {
              terms.forEach(element => {
                this.paymentTerms.push({ id: element.id, name: element.name });
              });
            });

            this.initiate.getOpportunityOwners(this.selectedCompany).subscribe(opp => {
              opp.forEach(element => {
                this.opportunityOwners.push({ id: element.id, name: element.name });
              });
            });

            /**/
          }


        })

        this._lineData = [];
        this.initiate.getQuoteLines(quoteID).subscribe(line => {
          line.forEach(element => {
            this._lineData.push({ ProductDescription: element.productDescription, ProductCode: element.productCode, lineID: element.quoteLineID });
          });

          console.log(this.productResults);
        })
           

          setTimeout(() => {

            this.selectedCustomer = this._quoteData.customerID;
            this.selectedOwner = this._quoteData.opportunityOwner;
            this.selectedOpportunityType = this._quoteData.opportunityType;
            this.selectedPriority = this._quoteData.priorityLevel;
            this.pricingGroup.controls.PriorityLevel.setValue(this._quoteData.priorityLevel);
            this.pricingGroup.controls.CustomerID.setValue(this._quoteData.customerID);
            
            this.pricingGroup.controls.CustomerName.setValue(this._quoteData.customerID.toString() == "-PRPOTENTI" ? this._quoteData.customerName.toString() : this._quoteData.customerID.toString());
                       
            
            this.pricingGroup.controls.OpportunityType.setValue(this._quoteData.opportunityType);
            this.pricingGroup.controls.OpportunityOwner.setValue(this._quoteData.opportunityOwner);



            this.pricingGroup.controls.QuoteNumber.setValue(this._quoteData.quoteID);
            this.pricingGroup.controls.OpportunityName.setValue(this._quoteData.opportunityName);
            this.pricingGroup.controls.RequestedBy.setValue(this._quoteData.requestedBy);
            this.pricingGroup.controls.SubmittedDate.setValue(this._quoteData.submittedDate);
            if (this._quoteData.paymentTermID != null) {
              this.pricingGroup.controls.PaymentTerm.setValue(this._quoteData.paymentTermID.toString());
            }

            this.initiate.getCustomerAddress(this.selectedCustomer).subscribe(sub=>{
              this.deliveryAddress = sub;    
            });

            this.productResults = this._lineData;

            if (this._quoteData.submittedDate != null && this._quoteData.submittedDate != "") {
              this.quoteSubmitted = true;
            }
            else {
              this.quoteSubmitted = false;
            }

            if (this.DisabledMode == "yes") {
              var disableControls = this.DisabledMode == "yes";

              this.pricingGroup.controls.CompanyName.disable({ onlySelf: true, emitEvent: false });
              this.pricingGroup.controls.CustomerID.disable({ onlySelf: true, emitEvent: false });
              this.pricingGroup.controls.PriorityLevel.disable({ onlySelf: true, emitEvent: false });
              this.pricingGroup.controls.CustomerName.disable({ onlySelf: true, emitEvent: false });
              this.pricingGroup.controls.OpportunityName.disable({ onlySelf: true, emitEvent: false });
              this.pricingGroup.controls.OpportunityOwner.disable({ onlySelf: true, emitEvent: false });
              this.pricingGroup.controls.OpportunityType.disable({ onlySelf: true, emitEvent: false });
              this.pricingGroup.controls.RequestedBy.disable({ onlySelf: true, emitEvent: false });
              this.pricingGroup.controls.SubmittedDate.disable({ onlySelf: true, emitEvent: false });
            }
          }, 2000);
          /**/        
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
    public initiate: InitiateProviderService,
    private activeRoute: ActivatedRoute) {

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
      RequestedBy: ['', [Validators.required]],
      PaymentTerm: [''],
      CCEmail: [''], 
      CustomerIDSearch : [''],
      CustomerNameSearch : ['']
    });    
  }

  async filterCustomerIDs() {
    if (this.customerIDs.length = 0) {
      return;
    }
    // get the search keyword
    let search = this.pricingGroup.controls.CustomerIDSearch.value;

    this.initiate.getCustomerIDList(this.pricingGroup.value.CompanyName).subscribe(ret => {
      this.customerIDs = [];
      ret.forEach(element => {
        this.customerIDs.push({ id: element.id, name: element.id });
      }); 
      
      var data = this.customerIDs.filter(ret=>{
        if(ret.id != null){
          var filterItem = ret.id;        
          return (filterItem.toLowerCase()).includes(search.toLowerCase());
        }        
      });    
      this.customerIDs = data;              
    });    
  }

  async filterCustomerName() {
    if (this.customerNames.length = 0) {
      return;
    }
    // get the search keyword
    let search = this.pricingGroup.controls.CustomerNameSearch.value;

    this.initiate.getCustomerNameList(this.pricingGroup.value.CompanyName).subscribe(ret => {
      this.customerNames = [];
      ret.forEach(element => {
        this.customerNames.push({ id: element.id, name: element.name });
      }); 
      
      var data = this.customerNames.filter(ret=>{
        if(ret.id != null){
          var filterItem = ret.name;        
          return (filterItem.toLowerCase()).includes(search.toLowerCase());
        }        
      });    
      this.customerNames = data;              
    });    
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
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

  save($event) {
    if (this.pricingGroup.valid) {
      let data = this.getFormData();

      let opportunityOwnerID = this.opportunityOwners.filter(function (item) {
        return item.name == data.OpportunityOwner;
      })[0].id;

      let customerName = '';

      if (this.selectedCustomer != '-PRPOTENTI') {
        customerName = this.customerNames.filter(function (item) {
          return item.id == data.CustomerID;
        })[0].name;
      }
      else {
        customerName = this.pricingGroup.value.CustomerName;
      }


      this.initiate.saveQuoteHeader(this.quoteID, data.PriorityLevel, customerName, data.OpportunityOwner, data.OpportunityType, data.OpportunityName, null, data.RequestedBy, data.CompanyName, data.CustomerID, opportunityOwnerID, false).subscribe(sub => {
        this.quoteID = sub;
        this.loadQuote(this.quoteID, true);
      });
      $event.preventDefault();
    }

    
  }

  submit() {

    if (this.pricingGroup.valid) {

      this.initiate.submitOpportunity(this.quoteID).subscribe(sub => {
        this.loadQuote(this.quoteID, true);
        alert("Quote " + this.quoteID + " Submitted.")

      });
    }
  }



  customer_change(e) {
    if (this.selectedCustomer.length > 0) {
      if (this.selectedCustomer != "-PRPOTENTI") {
        this.pricingGroup.controls.CustomerName.setValue(this.selectedCustomer);
        
        this.initiate.getCustomerAddress(this.selectedCustomer).subscribe(sub=>{

          this.deliveryAddress = sub;

        });
      }
      else {
        this.pricingGroup.controls.CustomerName.setValue('');
        this.deliveryAddress = '';
      }      
    }
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

  delete() {

    if (this.quoteID > 0) {
      this.initiate.deleteOpportunity(this.quoteID).subscribe(sub => {
        window.location.reload();
      });
    }
  }

  addProduct() {
    //if(this.quoteSubmitted){
    this.AddNewQuote.emit("");
    //}    
  }

  newQuote() {
    sessionStorage.setItem("activeQuoteID", "");
    window.location.reload();
  }

  finalise($event) {

    if (this.pricingGroup.value.PaymentTerm != '') {

      $event.preventDefault();
      this.initiate.validateFinaliseQuote(this.quoteID).subscribe(sub => {
        //console.log("received request form Finalised Validation: " + sub)
        if (sub == true) {
          this.initiate.finaliseQuote(
            this.quoteID, 
            this.pricingGroup.controls.PaymentTerm.value, 
            this.pricingGroup.value.CCEmail, this.pricingGroup.controls.CustomerName.value,
            this.pricingGroup.controls.OpportunityName.value, 
            this.pricingGroup.controls.RequestedBy.value).subscribe(sub => {
            console.log("received request form Finalised");

            this.quoteFinalised = true;
            alert('Quote Finalised')
          });
        }
      })     
    }
  }

  viewQuote() {
    var url = window.location.href.substring(0,window.location.href.indexOf('pricingfinalise'));
    window.open( url + 'quotereport/' + this.quoteID.toString(), '_blank');    
  }

  newCustomerClick(e){
    this.deliveryAddress = '';
    this.pricingGroup.controls.CustomerID.setValue("-PRPOTENTI");
    this.selectedCustomer = "-PRPOTENTI";
    this.customer_change(e);
    e.stopPropagation();
  }
}
