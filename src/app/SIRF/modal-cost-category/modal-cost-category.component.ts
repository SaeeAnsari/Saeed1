import { Component, OnInit, AfterViewInit, Output, EventEmitter, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-cost-category',
  templateUrl: './modal-cost-category.component.html',
  styleUrls: ['./modal-cost-category.component.css']
})
export class ModalCostCategoryComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) { 
    console.log(this.data);

    this.sirfGroup = fb.group({

      SIRFNumber: [data.raw.sirfNumber],
      PrimaryResponsibility: [data.raw.primaryResponsibility],      
      PriorityLevel: [data.raw.priorityLevel],
      RequestCategory: [data.raw.requestCategory],      
      CustomerName: [data.raw.customerName],
      CustomerRegion: [data.raw.customerRegion],
      BusinessRegion: [data.raw.businessRegion],
      DateOfIncident: [new Date(Date.parse(data.raw.dateOfIncident)).toLocaleDateString()],
      RequestedBy: [data.raw.requestedBy],
      RequestedDate: [new Date(Date.parse(data.raw.requestedDate)).toLocaleDateString()],
    });
  }



  public sirfGroup: FormGroup;
  public SIRFID = 0;

  ngOnInit() {
    
    console.log(this.data);
    this.SIRFID = this.data.SIRFID;

    this.sirfGroup.disable();

  }
}