import { Component, OnInit, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { InitiateProviderService } from 'src/app/PRICING/Providers/initiate-provider.service';
import { SirfInitaiteService } from '../Providers/sirf-initaite.service';
import { HashLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-sirfcost-tracking',
  templateUrl: './sirfcost-tracking.component.html',
  styleUrls: ['./sirfcost-tracking.component.css']
})
export class SIRFCostTrackingComponent implements OnInit {

  @Input() SIRFNumber = '';

  public sirfCost: FormGroup;
  public SIRFID: number = 0;
  public costItems = [];
  public costCategories = [];

  public selectedCostCategory = '';
  

  displayedColumns: string[] = ['CostCategoryName', 'Description', 'Amount', 'Actions'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private activeRoute: ActivatedRoute,
    private initiate: InitiateProviderService,
    private SIRF: SirfInitaiteService) {

      

    this.sirfCost = fb.group({

      CostCategory: ['', Validators.required],
      Amount: ['', Validators.required],
      Description: ['']
    });
  }

  ngOnInit() {

    if(this.SIRFNumber != ''){
      this.SIRFID = +this.SIRFNumber;
    }
    
    if (this.SIRFID > 0) {
      this.loadData();
    }
  }

  loadData() {
    this.SIRF.SIRFGetAllCost(this.SIRFID).subscribe(sub => {
      this.costItems = sub;
    });

    this.SIRF.GetCostCategories().subscribe(sub => {
      this.costCategories = sub;
    })
  }

  clear() {
    this.sirfCost.reset();
  }


  addCost($event) {

    if (this.sirfCost.valid) {

      var data = {
        SIRFNumber: this.SIRFID,
        Amount: this.sirfCost.value.Amount,
        Description: this.sirfCost.value.Description.trim(),
        CostCategoryID: this.sirfCost.value.CostCategory
      };

      this.SIRF.SIRFAddCost(data).subscribe(sub => {
        this.sirfCost.reset();
        this.loadData();
      });

      $event.preventDefault();
    }
  }

  lineDelete(id){
    this.SIRF.SIRFDeleteCost(id).subscribe(sub=>{
      this.loadData();
    })
  }

}
