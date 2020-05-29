import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { InitiateProviderService } from '../Providers/initiate-provider.service';

@Component({
  selector: 'app-dialog-confirm-delete',
  templateUrl: './dialog-confirm-delete.component.html',
  styleUrls: ['./dialog-confirm-delete.component.css']
})
export class DialogConfirmDeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmDeleteComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    public initiate: InitiateProviderService
  )
  {

  }

  onYesClick(){
    this.initiate.deleteQuote(this.data.QuoteID).subscribe(ret=>{
      this.dialogRef.close(true);
    });    
  }

  onNoClick() {
    this.dialogRef.close(false);
  }

  ngOnInit() {
  }

}
