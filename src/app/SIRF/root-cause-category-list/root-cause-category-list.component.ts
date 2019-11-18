import { Component, OnInit, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { InitiateProviderService } from 'src/app/PRICING/Providers/initiate-provider.service';
import { SirfInitaiteService } from '../Providers/sirf-initaite.service';
import { HashLocationStrategy } from '@angular/common';
import { utf8Encode } from '@angular/compiler/src/util';

@Component({
  selector: 'app-root-cause-category-list',
  templateUrl: './root-cause-category-list.component.html',
  styleUrls: ['./root-cause-category-list.component.css']
})
export class RootCauseCategoryListComponent implements OnInit {

  @Input() SIRFNumber;

  public SIRFID: number = 0;

  public categoryList = [];

  public sirfRootCause: FormGroup;

  public IsOtherChecked = false;
  public IsRootCauseSelected = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private activeRoute: ActivatedRoute,
    private SIRF: SirfInitaiteService
  ) {

    this.SIRFNumber = '0'

    if (this.SIRFNumber != '') {
      this.SIRFID = +this.SIRFNumber;
    }

    this.sirfRootCause = fb.group({
      comments: ['']
    });

    this.sirfRootCause.controls.comments.disable();

  }


  ngOnInit() {

    if (this.SIRFID > 0) {
      this.loadData();
    }
  }

  loadData() {

    this.categoryList = [];

    this.IsOtherChecked = false;
    this.IsRootCauseSelected = false;



    var that = this;
    this.SIRF.GetRootCauseCategories().subscribe(sub => {
      sub.forEach(element => {
        this.categoryList.push({ id: element.id, name: element.name, checked: false });
      });



      this.SIRF.GetRootCauseCategoriesBySIRF(this.SIRFID).subscribe(sirf => {


        sirf.forEach(item => {
          this.categoryList.filter(function (o) {
            if (o.id == item.id) {
              o.checked = true;
              that.IsRootCauseSelected = true;
              if (o.id == 13) {
                that.sirfRootCause.controls.comments.enable();
                that.IsOtherChecked = true;
              }
            }
          });
        });
        console.log(this.categoryList);
      })
    })
  }

  check_change(e, categoryID) {

    if (categoryID == 13) {
      this.sirfRootCause.controls.comments.enable();
      this.IsOtherChecked = true;
    }


    if (e != null) {
      var data = {
        SIRFNumber: this.SIRFID,
        SIRFRootCategoryID: categoryID,
        IsChecked: e.checked,
        Description: this.sirfRootCause.value.comments

      };


    }

    this.SIRF.updateSIRFRootCauseItem(data).subscribe(sub => {
      this.loadData();



    });
  }
}
