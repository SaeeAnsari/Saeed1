import { Component, OnInit, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(
    fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private activeRoute: ActivatedRoute,
    private initiate: InitiateProviderService,
    private SIRF: SirfInitaiteService) {

    this.sirfGroup = fb.group({
      SIRFNumber: ['', [Validators.required]],
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
      RequestedDate: ['', [Validators.required]]
    });
  }

  public sirfGroup: FormGroup;
  public SIRFID: number = 0;
  public companyNames = [];
  public responsibilities = [];
  public priorities = [];
  public requestCategories = [];
  public customers = [];
  public businessRegions = [];
  public customerRegions = [];




  public selectedCompany = '';


  ngOnInit() {
    this.sirfGroup.valueChanges.subscribe(val => {
      this.sirfGroup.updateValueAndValidity({ onlySelf: false, emitEvent: false })
    });

    this.loadSIRF();
  }

  private loadSIRF() {



    this.companyNames = [];
    this.responsibilities = [];
    this.priorities = []
    this.requestCategories = [];
    this.businessRegions = [];
    this.customerRegions = [];

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
  }


  public companyname_change(e) {
    this.initiate.getCustomerIDList(this.selectedCompany).subscribe(sub=>{
      this.customers = sub;
    })
  }

  public customer_change(e){

  }
}
