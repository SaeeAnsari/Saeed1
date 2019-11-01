import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm-delete',
  templateUrl: './dialog-confirm-delete.component.html',
  styleUrls: ['./dialog-confirm-delete.component.css']
})
export class DialogConfirmDeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmDeleteComponent>
  )
  {
    
  }

  onYesClick(): void{
    this.dialogRef.close(true);
  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  ngOnInit() {
  }

}
