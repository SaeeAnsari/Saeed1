import { Component, OnInit, AfterViewInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { InitiateProviderService } from 'src/app/PRICING/Providers/initiate-provider.service';
import { SirfInitaiteService } from '../Providers/sirf-initaite.service';
import { SIRFCostTrackingComponent } from '../sirfcost-tracking/sirfcost-tracking.component';
import { RootCauseCategoryListComponent } from '../root-cause-category-list/root-cause-category-list.component';

@Component({
  selector: 'app-sirfdetails',
  templateUrl: './sirfdetails.component.html',
  styleUrls: ['./sirfdetails.component.css']
})
export class SIRFDetailsComponent implements OnInit {

  @Input() SIRFNumber = '';
  @Input() SIRFCompleteMode = 'false';
  @ViewChild("costTracking", {static: false}) costTracking: SIRFCostTrackingComponent;
  @ViewChild("sirfCategory", {static: false}) sirfCategory: RootCauseCategoryListComponent;

  public sirfDetail: FormGroup;
  public SIRFID: number = 0;
  public categoriesNotSelectedError = false;
  public showSaved = false;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private activeRoute: ActivatedRoute,
    private initiate: InitiateProviderService,
    private SIRF: SirfInitaiteService) {

    this.sirfDetail = fb.group({

      InternalRootCause: ['', Validators.required],           
      InternalPreventiveCorrectiveActions: ['', Validators.required],     
      CustomerRootCause: [''],     
      CustomerResponsePreventiveCorrectiveActions: [''],
      DateOfImplementation: [''],
      RequestCompletionDate: [new Date()],
      FirstName: [''],
      LastName: [''],
      IsValidComplaint: ['']   
    });
  }

  ngOnInit() {
    if(this.SIRFNumber != '') this.SIRFID = +this.SIRFNumber;     

    console.log('Details=>SIRFCompleteMode: ' + this.SIRFCompleteMode);
  
  }

  SetValue(data){
    this.SIRFID = data.sirfNumber,
    this.sirfDetail.controls.InternalRootCause.setValue(data.rootCauseAnalysis);
    this.sirfDetail.controls.InternalPreventiveCorrectiveActions.setValue(data.correctiveAnalysis);
    this.sirfDetail.controls.CustomerRootCause.setValue(data.customerRootCause);
    this.sirfDetail.controls.CustomerResponsePreventiveCorrectiveActions.setValue(data.customerResponsePreventiveActions);
    this.sirfDetail.controls.DateOfImplementation.setValue(new Date(Date.parse(data.implementationDate)));
    this.sirfDetail.controls.FirstName.setValue(data.firstName);
    this.sirfDetail.controls.LastName.setValue(data.lastName);    
    this.sirfDetail.controls.IsValidComplaint.setValue(data.isValidComplaint);
  }


  AdditionalValidation(){
    
    this.categoriesNotSelectedError = false;


      var checkedItems = this.sirfCategory.categoryList.filter(function(item){
        return item.checked == true;
      });

      if(checkedItems == null || checkedItems.length == 0){
        this.categoriesNotSelectedError = true;
        return false;
      }
      else{
        return true;
      }
   
   
  }

  Submit($event){
    if(this.sirfDetail.valid && this.AdditionalValidation()){

      var data = {
        SIRFNumber : this.SIRFID,
        RootCauseAnalysis : this.sirfDetail.value.InternalRootCause,
        CorrectiveAnalysis : this.sirfDetail.value.InternalPreventiveCorrectiveActions,
        CustomerRootCause : this.sirfDetail.value.CustomerRootCause,
        CustomerResponsePreventiveActions : this.sirfDetail.value.CustomerResponsePreventiveCorrectiveActions,
        DateOfImplementation : this.sirfDetail.value.DateOfImplementation,
        FirstName : this.sirfDetail.value.FirstName,
        LastName : this.sirfDetail.value.LastName,
        RootCauseOtherComment : '',
        IsValidComplaint: this.sirfDetail.value.IsValidComplaint        
      };

      if(this.sirfCategory.sirfRootCause.value.comments != ''){
        data.RootCauseOtherComment = this.sirfCategory.sirfRootCause.value.comments;
      }      



      this.SIRF.updateSIRFDetails(data).subscribe(sub=>{
              console.log(data);
              this.showSaved = true;
              this.sirfCategory.loadData();

              alert('SIRF Request Completed');
              
              setTimeout(() => {
                this.showSaved = false;

              }, 5000);
      });

      $event.preventDefault();
    }
  }

}
