import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SirfInitaiteService } from '../Providers/sirf-initaite.service';
import { retryWhen } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalCostCategoryComponent } from '../modal-cost-category/modal-cost-category.component';

@Component({
  selector: 'app-sirfsearch',
  templateUrl: './sirfsearch.component.html',
  styleUrls: ['./sirfsearch.component.css']
})



export class SIRFSearchComponent implements OnInit {


  displayedColumns: string[] = ['SIRFNumber', 'PriorityLevel', 'RequestCategory', 'BusinessRegion', 'CustomerName', 'CompletionDate', 'Actions'];



  public validationError: boolean = false;
  public sirfGroup: FormGroup;
  public searchResults = [];

  constructor(fb: FormBuilder, private sirf: SirfInitaiteService, public dialog: MatDialog) {
    this.sirfGroup = fb.group({
      SIRFNumber: [''],
      PriorityLevel: [''],
      CategoryOfRequest: [''],
      BusinessRegion: [''],
      CustomerName: [''],
      RequestCompletionDate: [''],
      PrimaryResponsible: [''],
      CustomerRegion: [''],
      DateOfIncident: [''],
      RequestedBy: [''],
      RequestedDate: ['']

    })
  }

  ngOnInit() {

  }

  validateForm() {

    this.validationError = true;
    Object.keys(this.sirfGroup.controls).forEach((key: string) => {
      const abstractControl = this.sirfGroup.controls[key];
      if (abstractControl.value != '') {
        this.validationError = false;                         
      }
    });
    
    return !this.validationError;
  }



  search(searchType) {
    if (this.validateForm() || searchType == "pending") {

      let queryString;
      if (searchType == 'custom')
        queryString = this.createSearchString();

      else if (searchType == 'pending') {
        this.validationError = false;
        queryString = "WHERE RequestCompletionDate IS NULL"
      }


      this.sirf.searchSIRF(queryString).subscribe(sub=>{
        this.searchResults = sub;
      });
    }
  }

  formCondition(DBColumn = '', UIValue = '') {
    var condition = '';

    if (UIValue.includes('%')) {
      condition = DBColumn + ' Like \'' + UIValue + '\'';
    }
    else {
      condition = DBColumn + ' = \'' + UIValue + '\'';
    }

    return condition;
  }

  createSearchString() {

    let queryParams = [];
    let searchString = '';



    Object.keys(this.sirfGroup.controls).forEach((key: string) => {
      const abstractControl = this.sirfGroup.controls[key];
      if (abstractControl.value.length > 0) {
        queryParams.push(this.formCondition(key, abstractControl.value));
      }
    });


    searchString = ' Where '

    queryParams.forEach(element => {
      if (searchString == ' Where ') {
        //first variable
        searchString += element;
      }
      else {
        searchString += 'AND ' + element;
      }
    });

    return searchString;
  }

  public costCategory(element){
    

    const dialogRef = this.dialog.open(ModalCostCategoryComponent, {
      width: '900px',
      data: {SIRFID: element.sirfNumber, raw: element}
    });    
  }
}
