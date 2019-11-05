import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InitiateProviderService } from '../Providers/initiate-provider.service';
import { ActivatedRoute, Router } from '@angular/router';
import { element } from 'protractor';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  providers: [InitiateProviderService]
})
export class ProductDetailsComponent implements OnInit {


  @Input() QuoteID: string
  @Input() QuoteLineID: string
  @Input() CompanyName: string


  private selectedPart = "";
  private selectedUOM = "";
  private selectedContainerType = "";
  private selectedCurrency = "";

  private _data;


  private pricingID: number;
  private pricingGroup: FormGroup;

  constructor(fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private initiate: InitiateProviderService) {

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

  private partList = [];
  private containerTypes = [];
  private currencyCodes = [];
  private uomList = [];

  ngOnInit() {

    if (this.QuoteID != "" && this.CompanyName != "") {

      this.initiate.getPartList(this.CompanyName, "e.desc_long_stock").subscribe(ret => {

        ret.forEach(element => {
          this.partList.push({ id: element.id, name: element.name });
        });
      });

      console.log(this.partList)

      this.initiate.getUnitOfMeasureList().subscribe(ret => {
        ret.forEach(element => {
          this.uomList.push({ id: element.id, name: element.name });
        })
      })

      this.initiate.getContainerTypeList().subscribe(ret => {
        ret.forEach(element => {
          this.containerTypes.push({ id: element.id, name: element.name });
        })
      })

      console.log(this.containerTypes);

      this.initiate.getCurrencyCodeList().subscribe(ret => {
        ret.forEach(element => {
          this.currencyCodes.push({ id: element.id, name: element.name });
        })
      });
      console.log(this.currencyCodes);


      this.loadData();
    }
  }

  loadData() {
    this.initiate.getQuoteLine(this.QuoteLineID).subscribe(ret => {
      this._data = ret;
      console.log(this._data);

      setTimeout(() => {

        this.selectedPart = this._data.productCode;

        this.pricingGroup.controls['ContainerType'].setValue(this._data.containerTypeID.toString());
        this.pricingGroup.controls['UnitOfMeasure'].setValue(this._data.unitOfMeasure.toString());
        
        this.pricingGroup.controls['ContainerType'].setValue(this._data.containerTypeID.toString());
        this.pricingGroup.controls['CurrencyOfTargetPrice'].setValue(this._data.targetCurrencyID.toString());
        this.pricingGroup.controls['AnnualVolume'].setValue(this._data.annualVolume.toString());

        this.pricingGroup.controls['TypicalOrderSize'].setValue(this._data.typicalOrderSize.toString());
        this.pricingGroup.controls['PackSize'].setValue(this._data.packSize.toString());
        this.pricingGroup.controls['TargetPrice'].setValue(this._data.targetPrice.toString());
        this.pricingGroup.controls['UsageLevel'].setValue(this._data.usageLevel.toString());
        this.pricingGroup.controls['NotesAndComment'].setValue(this._data.comments);       
      }, 5000);
    });
  }



  gatherFieldData() {

    let data = {
      PartID: this.pricingGroup.value.PartID,
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

  save() {

    if (this.pricingGroup.valid) {
      let data = this.gatherFieldData();

      //this.initiate.saveProductDetails(data);      
    }
  }
}

