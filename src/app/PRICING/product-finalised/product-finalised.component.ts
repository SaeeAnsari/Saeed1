import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { InitiateProviderService } from '../Providers/initiate-provider.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { MatTableDataSource } from '@angular/material/table';
import { matTabsAnimations } from '@angular/material/tabs';


@Component({
  selector: 'app-product-finalised',
  templateUrl: './product-finalised.component.html',
  styleUrls: ['./product-finalised.component.css']
})
export class ProductFinalisedComponent implements OnInit {


  @Input() QuoteID: string
  @Input() CompanyName: string
  private QuoteFinalised = false;
  public overriteSave = false;

  public completionLineID;
  private _data;
  public pricingFinaliseGroup: FormGroup;
  public productResults = [];
  public uomList = [];
  public currencyCodes = [];
  public approverList = [];
  public transportTermsList = [];
  public shippingWarehouseList = [];
  private _lineData: any[];
  public showCompletionLine: boolean = false;

  public displayedColumns: string[] = ['ProductCode', 'ProductDescription', 'IsCompleted', 'Actions'];



  public displayKeyValColumns: string[] = ['Key', 'Value', 'Actions']

  public lineKeyVal = [];

  @ViewChild("productDetails", { static: false }) productDetails: ProductDetailsComponent;

  constructor(fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private initiate: InitiateProviderService) {


    this.pricingFinaliseGroup = fb.group({
      UnitOfMeasure: ['', [Validators.required]],
      QuoteCurrency: ['', [Validators.required]],
      CostPerUOM: ['', [Validators.required]],
      SellingPricePerUOM: ['', [Validators.required]],
      TransportTerms: ['', [Validators.required]],
      ShippingWarehouse: ['', [Validators.required]],
      MinimumOrderQuantity: ['', [Validators.required]],
      EstimatedLeadTime: ['', [Validators.required]],
      QuoteExpirationDate: ['', [Validators.required]],
      PriceValidityDate: ['', [Validators.required]],
      SentToCMDate: ['', [Validators.required]],
      PricePreparedBy: ['', [Validators.required]],
      ApprovalDate: ['', [Validators.required]],
      PriceApprovedBy: ['', [Validators.required]],
      CompletionDate: [new Date(), [Validators.required]],
      ExchangeRate: [''],
      FinaliseKey: [''],
      FinaliseValue: ['']
    });
  }

  ngOnInit() {


    this.initiate.getUnitOfMeasureList().subscribe(ret => {
      ret.forEach(element => {
        this.uomList.push({ id: element.id, name: element.name });
      })
    })

    this.initiate.getCurrencyCodeList().subscribe(ret => {
      ret.forEach(element => {
        this.currencyCodes.push({ id: element.id, name: element.name });
      })
    });

    this.initiate.getApprovers().subscribe(ret => {
      ret.forEach(element => {
        this.approverList.push({ id: element.id, name: element.name });
      })
    });

    this.initiate.GetShippingWarehouse().subscribe(ret => {
      ret.forEach(element => {
        this.shippingWarehouseList.push({ id: element.id, name: element.name });
      })
    });

    this.initiate.GetTransportTerms().subscribe(ret => {
      ret.forEach(element => {
        this.transportTermsList.push({ id: element.id, name: element.name });
      })
    });

    this.loadData();
  }

  loadData() {
    if (+this.QuoteID > 0) {

      this.initiate.getQuote(this.QuoteID).subscribe(sub => {
        if (sub) {

          if (!this.overriteSave) {
            this.QuoteFinalised = sub[0].isFinalised;
          }
        }
      })



      this._lineData = [];
      this.initiate.getCompletionLines(this.QuoteID).subscribe(line => {
        line.forEach(element => {
          this._lineData.push({ QuoteID: element.quoteID, QuoteLineID: element.quoteLineID, ProductDescription: element.productDescription, ProductCode: element.productCode, isCompleted: element.isComplete, CompletionLineID: element.completionLineID });
        });

        this.productResults = this._lineData;
      })
    }
  }

  lineEdit(value) {

    if (value != null) {

      if (value.CompletionLineID > 0) {               

        this.completionLineID = value.CompletionLineID;
        this.showCompletionLine = true;

        this.productDetails.QuoteID = value.QuoteID;
        this.productDetails.quoteLineID = value.QuoteLineID;
        this.productDetails.CompanyName = this.CompanyName;
        this.productDetails.showProductDetails = true;
        this.productDetails.ngOnInit()
        this.productDetails.lineEdit(value.QuoteLineID);
        this.productDetails.pricingGroup.disable();
        this.productDetails.pricingGroup.controls['ContainerType'].enable();
        this.productDetails.pricingGroup.controls['PackSize'].enable();

        this.loadLine();
      }
    }
  }

  loadLine() {
    this.initiate.getCompletionLineId(this.completionLineID).subscribe(sub => {

      this.pricingFinaliseGroup.reset();


      if (sub.uom != null) { this.pricingFinaliseGroup.controls.UnitOfMeasure.setValue(sub.uom) };
      if (sub.currencyID != null) this.pricingFinaliseGroup.controls.QuoteCurrency.setValue(sub.currencyID.toString())
      if (sub.costPerUOM != null) this.pricingFinaliseGroup.controls.CostPerUOM.setValue(this.stringDecimalPlaces(sub.costPerUOM, 2))
      if (sub.sellingPricePerUOM != null) this.pricingFinaliseGroup.controls.SellingPricePerUOM.setValue(sub.sellingPricePerUOM)
      if (sub.transportTermID != null) this.pricingFinaliseGroup.controls.TransportTerms.setValue(sub.transportTermID.toString())
      if (sub.shippingWarehouseID != null) this.pricingFinaliseGroup.controls.ShippingWarehouse.setValue(sub.shippingWarehouseID.toString())
      if (sub.minimumOrderQuantity != null) this.pricingFinaliseGroup.controls.MinimumOrderQuantity.setValue(this.stringDecimalPlaces(sub.minimumOrderQuantity, 2))
      if (sub.estimatedLeadTime != null) this.pricingFinaliseGroup.controls.EstimatedLeadTime.setValue(sub.estimatedLeadTime)
      if (sub.quoteExpirationDate != null) this.pricingFinaliseGroup.controls.QuoteExpirationDate.setValue(new Date(Date.parse(sub.quoteExpirationDate)))
      if (sub.priceValidityDate != null) this.pricingFinaliseGroup.controls.PriceValidityDate.setValue(new Date(Date.parse(sub.priceValidityDate)))
      if (sub.sentToCMDate != null) this.pricingFinaliseGroup.controls.SentToCMDate.setValue(new Date(Date.parse(sub.sentToCMDate)))
      if (sub.pricePreparedBy != null) this.pricingFinaliseGroup.controls.PricePreparedBy.setValue(sub.pricePreparedBy)
      if (sub.approvalDate != null) this.pricingFinaliseGroup.controls.ApprovalDate.setValue(new Date(Date.parse(sub.approvalDate)))
      if (sub.priceApprovedByID != null) {
        this.pricingFinaliseGroup.controls.PriceApprovedBy.setValue(sub.priceApprovedByID.toString());
      }
      else {
        this.pricingFinaliseGroup.controls.PriceApprovedBy.setValue('1');
      }
      if (sub.completionDate != null && sub.completionDate != '') {
        this.pricingFinaliseGroup.controls.CompletionDate.setValue(new Date(Date.parse(sub.completionDate)))
      }
      else {
        this.pricingFinaliseGroup.controls.CompletionDate.setValue(new Date());
      }
      if (sub.exchangeRate != null) this.pricingFinaliseGroup.controls.ExchangeRate.setValue(sub.exchangeRate)

      this.loadBreakDownLines();

    });
  }

  public stringDecimalPlaces(data, decimalPlaces: number){
    if(data != null){
      return parseFloat(data).toFixed(decimalPlaces)
    }
    else{
      return '';
    }
  }

  public costValidationError = false;

  public costValidator() {

    this.costValidationError = false;

    var cost =  0;
    this.lineKeyVal.forEach(element => {

      if (element.Value != '') {
        try {
          var tmp: number = +element.Value;

          if (tmp != null) {
            cost = (cost + tmp);
          }
        }
        catch (ex) {
          console.log("Error Occured - Finalised - costValidator");
          console.log(ex);
        }
      }
    });

    if (this.pricingFinaliseGroup.value.CostPerUOM != '' &&
      this.pricingFinaliseGroup.value.CostPerUOM == cost.toFixed(2)) {
      this.costValidationError == false;
      return true;
    }
    else {
      this.costValidationError = true;
      return false;
    }
  }




  saveline($event) {

    if (this.pricingFinaliseGroup.valid && this.costValidator()) {

      this.initiate.saveContainerTypePackSize(this.productDetails.quoteLineID, this.productDetails.pricingGroup.value.ContainerType, this.productDetails.pricingGroup.value.PackSize).subscribe(ret=> {});

      this.initiate.saveCompletionLine(this.completionLineID,
        this.QuoteID,
        this.pricingFinaliseGroup.value.UnitOfMeasure,
        this.pricingFinaliseGroup.value.CostPerUOM,
        this.pricingFinaliseGroup.value.QuoteCurrency,
        this.pricingFinaliseGroup.value.SellingPricePerUOM,
        this.pricingFinaliseGroup.value.TransportTerms,
        this.pricingFinaliseGroup.value.ShippingWarehouse,
        this.pricingFinaliseGroup.value.MinimumOrderQuantity,
        this.pricingFinaliseGroup.value.EstimatedLeadTime,
        this.pricingFinaliseGroup.value.QuoteExpirationDate,
        this.pricingFinaliseGroup.value.PriceValidityDate,
        this.pricingFinaliseGroup.value.SentToCMDate,
        this.pricingFinaliseGroup.value.ExchangeRate,
        this.pricingFinaliseGroup.value.PricePreparedBy,
        this.pricingFinaliseGroup.value.ApprovalDate,
        this.pricingFinaliseGroup.value.PriceApprovedBy,
        this.pricingFinaliseGroup.value.CompletionDate
      ).subscribe(sub => {
        this.pricingFinaliseGroup.reset();
        this.showCompletionLine = false;
        this.loadData()
        this.productDetails.showProductDetails = false;
      });

      window.location.reload();

      $event.preventDefault();
    }
  }

  cancel() {
    this.pricingFinaliseGroup.reset();
    this.showCompletionLine = false;

    this.productDetails.showProductDetails = false;
    this.costValidationError = false;
  }

  private keyID: number;

  addKeyValue() {

    if (this.pricingFinaliseGroup.value.FinaliseKey != "" &&
      this.pricingFinaliseGroup.value.FinaliseValue != "") {

      this.costValidationError = false;

      var keyToFind = this.pricingFinaliseGroup.value.FinaliseKey.toString().trim()

      let item = this.lineKeyVal.filter(function (item) {
        return item.Key == keyToFind;
      });
      if (item != null) {
        this.initiate.saveCompletionLineBreakdownLine(this.keyID, this.completionLineID, this.pricingFinaliseGroup.value.FinaliseValue, this.pricingFinaliseGroup.value.FinaliseKey).subscribe(sub => {

          this.loadBreakDownLines();

          this.pricingFinaliseGroup.controls.FinaliseKey.setValue("");
          this.pricingFinaliseGroup.controls.FinaliseValue.setValue("");

          this.keyID = 0;
        });
      }
    }
  }

  clear() {
    this.pricingFinaliseGroup.controls.FinaliseKey.setValue("");
    this.pricingFinaliseGroup.controls.FinaliseValue.setValue("");
    this.costValidationError = false;

    this.keyID = 0;
  }

  loadBreakDownLines() {
    this.initiate.getCompletionLineBreakDown(this.completionLineID).subscribe(sub => {
      this.lineKeyVal = [];
      sub.forEach(element => {
        this.lineKeyVal.push({ Key: element.name, Value: element.value, ID: element.id });
      });
    });
  }


  edit(val) {

    this.keyID = val.ID;

    this.pricingFinaliseGroup.controls.FinaliseKey.setValue(val.Key);
    this.pricingFinaliseGroup.controls.FinaliseValue.setValue(val.Value);

  }

  delete(val) {

    this.initiate.deleteCompletionLineBreakDown(val.ID).subscribe(sub => {
      this.loadBreakDownLines();
    })
  }
}
