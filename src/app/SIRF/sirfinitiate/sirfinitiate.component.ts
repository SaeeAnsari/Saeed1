import { Component, OnInit, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { InitiateProviderService } from 'src/app/PRICING/Providers/initiate-provider.service';
import { SirfInitaiteService } from '../Providers/sirf-initaite.service';


@Component({
  selector: 'app-sirfinitiate',
  templateUrl: './sirfinitiate.component.html',
  styleUrls: ['./sirfinitiate.component.css']
})
export class SIRFInitiateComponent implements OnInit {

  public selectedPart = '';
  @Input() SIRFCompleteMode = 'false';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private activeRoute: ActivatedRoute,
    private initiate: InitiateProviderService,
    private SIRF: SirfInitaiteService,
    ) {

    this.sirfGroup = fb.group({

      SIRFNumber: [''],
      PrimaryResponsibility: ['', [Validators.required]],
      CompanyName: ['', [Validators.required]],
      Priority: ['', [Validators.required]],
      RequestCategory: ['', [Validators.required]],
      CustomerID: ['', [Validators.required]],
      CustomerName: ['', [Validators.required]],
      CustomerRegion: ['', [Validators.required]],
      BusinessRegion: ['', [Validators.required]],
      DateOfIncident: ['', [Validators.required]],
      RequestedBy: ['', [Validators.required]],
      RequestedDate: [new Date()],
      ReoccuringIssue: ['', [Validators.required]],
      ProductType: [''],
      ComplaintDetails: ['', [Validators.required]],
      PartID: [''],
      PartName: [''],
      SalesOrderNumber: [''],
      LotNumber: [''],
      CustomerPO: [''],
      ComplaintSampleReceived: ['']

    });
  }

  @Input() SIRFNumber = '';

  public sirfGroup: FormGroup;
  public SIRFID: number = 0;
  public companyNames = [];
  public responsibilities = [];
  public priorities = [];
  public requestCategories = [];
  public customers = [];
  public businessRegions = [];
  public customerRegions = [];
  public reoccuringIssue = [];
  public partList = [];


  public requestDate;
  public selectedCompany = '';
  public selectedCustomer = '';


  ngOnInit() {

    if (this.SIRFNumber != '') this.SIRFID = +this.SIRFNumber;

    console.log('Initiate=>SIRFCompleteMode: ' + this.SIRFCompleteMode);


    if(this.SIRFCompleteMode == 'true'){
     this.sirfGroup.disable();
    }


    this.sirfGroup.valueChanges.subscribe(val => {
      this.sirfGroup.updateValueAndValidity({ onlySelf: false, emitEvent: false })
    });

    this.sirfGroup.controls.SIRFNumber.disable();
    this.sirfGroup.controls.RequestedDate.disable();

    this.defaultFields();
  }

  private defaultFields() {

    if (this.SIRFID < 1) {
      this.sirfGroup.controls.SIRFNumber.disable();
      this.sirfGroup.controls.RequestedDate.disable();
    }

    this.companyNames = [];
    this.responsibilities = [];
    this.priorities = []
    this.requestCategories = [];
    this.businessRegions = [];
    this.customerRegions = [];
    this.reoccuringIssue = [];
    this.partList = [];

    this.initiate.getCompanyList().subscribe(sub => {
      this.companyNames = sub;
    })

    this.SIRF.getPriorityList().subscribe(sub => {
      this.priorities = sub;
    })

    this.SIRF.getPrimaryResponsibilities().subscribe(sub => {
      this.responsibilities = sub;
    })

    this.SIRF.getRequestCategories().subscribe(sub => {
      this.requestCategories = sub;
    })

    this.SIRF.getBusinessRegions().subscribe(sub => {
      this.businessRegions = sub;
    })

    this.SIRF.getCustomerRegions().subscribe(sub => {
      this.customerRegions = sub;
    })

    this.SIRF.getRequestCategories().subscribe(sub => {
      this.reoccuringIssue = sub;
    })

    this.requestDate = new Date().toLocaleDateString();

  }


  public companyname_change(e) {
    this.initiate.getCustomerIDList(this.selectedCompany).subscribe(sub => {
      this.customers = sub;
    })

    this.initiate.getPartList(this.selectedCompany, "e.desc_long_stock").subscribe(sub => {
      this.partList = sub;
    })
  }

  public SetValues(data) {

    if (data != null) {
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
      
      
      this.initiate.getPartList(data.companyName, 'e.desc_long_stock').subscribe(sub=>{
        this.partList = sub;
      });

      
      this.sirfGroup.controls.PartID.setValue(data.partID);
      this.sirfGroup.controls.PartName.setValue(data.partID);
      this.sirfGroup.controls.SalesOrderNumber.setValue(data.salesOrderNumber);
      this.sirfGroup.controls.LotNumber.setValue(data.lotNumber);
      this.sirfGroup.controls.CustomerPO.setValue(data.customerPO);
      this.sirfGroup.controls.ComplaintSampleReceived.setValue(data.complaintSampleReceived)
    
      this.customers = [];

      this.initiate.getCustomerNameList(data.companyName).subscribe(sub=>{
        this.customers = sub;
      })           
    }
  }

  public customer_change(e) {


    this.sirfGroup.controls.CustomerID.setValue(this.selectedCustomer);
    this.sirfGroup.controls.CustomerName.setValue(this.selectedCustomer);
  }

  public Submit($event) {
    if (this.sirfGroup.valid) {


      var data = {
        SIRFNumber: this.sirfGroup.value.SIRFNumber,
        PrimaryResponsibilityID: this.sirfGroup.value.PrimaryResponsibility,
        CompanyName: this.sirfGroup.value.CompanyName.trim(),
        PriorityID: this.sirfGroup.value.Priority,
        RequestCategoryID: this.sirfGroup.value.RequestCategory,
        CustomerID: this.sirfGroup.value.CustomerID,
        CustomerName: this.sirfGroup.value.CustomerName,
        CustomerRegionID: this.sirfGroup.value.CustomerRegion,
        BusinessRegionID: this.sirfGroup.value.BusinessRegion,
        DateOfIncident: this.sirfGroup.value.DateOfIncident,
        RequestedDate: this.sirfGroup.value.RequestedDate,
        RequestedBy: this.sirfGroup.value.RequestedBy,
        ReoccuringIssueID: this.sirfGroup.value.ReoccuringIssue,
        ProductType: this.sirfGroup.value.ProductType,
        ComplaintDetails: this.sirfGroup.value.ComplaintDetails,
        PartID: this.sirfGroup.value.PartID,
        PartName: this.sirfGroup.value.PartName,
        SalesOrderNumber: this.sirfGroup.value.SalesOrderNumber,
        LotNumber: this.sirfGroup.value.LotNumber,
        CustomerPO: this.sirfGroup.value.CustomerPO,
        ComplaintSampleReceived: this.sirfGroup.value.ComplaintSampleReceived
      };

      data.PartName = this.partList.filter(function (item) {
        return item.id == data.PartID;
      })[0].name;


      if (this.SIRFID < 1) {
        data.RequestedDate = new Date().toLocaleDateString();
      }


      this.SIRF.submitOpportunity(data).subscribe(sub => {
        this.SIRFID = sub;
        this.sirfGroup.reset();
        alert('Service Improvement Request Form Submitted');

      })

      $event.preventDefault();
    }
  }
  onFileComplete(data: any) {
    console.log(data); // We just print out data bubbled up from event emitter.
  }
}
