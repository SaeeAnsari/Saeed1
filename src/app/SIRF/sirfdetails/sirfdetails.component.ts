import { Component, OnInit, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { InitiateProviderService } from 'src/app/PRICING/Providers/initiate-provider.service';
import { SirfInitaiteService } from '../Providers/sirf-initaite.service';

@Component({
  selector: 'app-sirfdetails',
  templateUrl: './sirfdetails.component.html',
  styleUrls: ['./sirfdetails.component.css']
})
export class SIRFDetailsComponent implements OnInit {

  @Input() SIRFNumber = '';
  @Input() SIRFCompleteMode = 'false';

  public sirfDetail: FormGroup;
  public SIRFID: number = 0;

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
      RequestCompletionDate: [''],
      FirstName: [''],
      LastName: ['']      
    });
  }

  ngOnInit() {
    if(this.SIRFNumber != '') this.SIRFID = +this.SIRFNumber;     

    console.log('Details=>SIRFCompleteMode: ' + this.SIRFCompleteMode);
  
  }

}
