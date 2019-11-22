import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SirfInitaiteService } from '../Providers/sirf-initaite.service';
import { SIRFInitiateComponent } from '../sirfinitiate/sirfinitiate.component';

@Component({
  selector: 'app-sirfcomplete',
  templateUrl: './sirfcomplete.component.html',
  styleUrls: ['./sirfcomplete.component.css']
})
export class SIRFCompleteComponent implements OnInit {

  public SIRFID = 0;

  public sirfData = null;
  @ViewChild("initiate", {static: false}) initiate: SIRFInitiateComponent;

  constructor(private route: ActivatedRoute,
    private router: Router, private sirf: SirfInitaiteService) {
    this.route.queryParams.subscribe(params => {
      route.paramMap.subscribe(sub => {
        if (sub.get("sirfID") != null) {
          this.SIRFID = +sub.get("sirfID");
        }
      })
    });
  }


  ngOnInit() {


    if (this.SIRFID > 0) {
      
      this.loadData();
     
    }

  }
  loadData() {
    this.sirf.getSIRF(this.SIRFID).subscribe(sub => {
      this.sirfData = sub;
      this.initiate.SetValues(this.sirfData);
    });
  }

}
