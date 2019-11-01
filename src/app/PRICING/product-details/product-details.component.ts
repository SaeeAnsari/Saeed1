import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InitiateProviderService } from '../Providers/initiate-provider.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  providers: [InitiateProviderService]
})
export class ProductDetailsComponent implements OnInit {

  private pricingID: number;
  private pricingGroup: FormGroup;

  constructor(fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {

    this.pricingGroup = fb.group({
      PartID: ['', [Validators.required]],
      PartName: ['', [Validators.required]],
      UnitOfMeasure: ['', [Validators.required]],
      AnnualVolume: ['', [Validators.required]],
      TypicalOrderSize: [''],
      PackSize: ['', [Validators.required]],
      ContainerType: ['', [Validators.required]],
      TargetPrice: [''],
      CurrencyOfTargetPrice: [''],
      UsageLevel: [''],
      NotesAndComment: ['']
    });

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.pricingID = this.router.getCurrentNavigation().extras.state.PricingID;
      }
    });
  }

  ngOnInit() {
  }

  gatherFieldData(){

    let data = {
      PartID : this.pricingGroup.value.PartID,
      PartName: this.pricingGroup.value.PartName,
      UnitOfMeasure: this.pricingGroup.value.UnitOfMeasure,
      AnnualVolume: this.pricingGroup.value.AnnualVolume,
      TypicalOrderSize: this.pricingGroup.value.TypicalOrderSize,
      PackSize: this.pricingGroup.value.PackSize,
      ContainerType: this.pricingGroup.value.ContainerType,
      TargetPrice: this.pricingGroup.value.TargetPrice,
      CurrencyOfTargetPrice: this.pricingGroup.value.CurrencyOfTargetPrice,
      UsageLevel: this.pricingGroup.value.UsageLevel,
      NotesAndComment: this.pricingGroup.value.NotesAndComment
    };

    return data;
  }

  save(){
    
    if(this.pricingGroup.valid){
      let data = this.gatherFieldData();
      let initiate = new InitiateProviderService();
      initiate.saveProductDetails(data);      
    }
  }
}

