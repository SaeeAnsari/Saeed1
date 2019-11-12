import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  public completionLineID;
  private _data;
  public pricingGroup: FormGroup;
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


    this.pricingGroup = fb.group({
      UnitOfMeasure: [''],
      QuoteCurrency: [''],
      CostPerUOM: [''],
      SellingPricePerUOM: [''],
      TransportTerms: [''],
      ShippingWarehouse: [''],
      MinimumOrderQuantity: [''],
      EstimatedLeadTime: [''],
      QuoteExpirationDate: [''],
      PriceValidityDate: [''],
      SentToCMDate: [''],
      PricePreparedBy: [''],
      ApprovalDate: [''],
      PriceApprovedBy: [''],
      CompletionDate: [''],
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

        this.loadLine();
      }
    }
  }

  loadLine() {
    this.initiate.getCompletionLineId(this.completionLineID).subscribe(sub => {

      this.pricingGroup.reset();


      if (sub.uom != null) { this.pricingGroup.controls.UnitOfMeasure.setValue(sub.uom) };
      if (sub.currencyID != null) this.pricingGroup.controls.QuoteCurrency.setValue(sub.currencyID.toString())
      if (sub.costPerUOM != null) this.pricingGroup.controls.CostPerUOM.setValue(sub.costPerUOM)
      if (sub.sellingPricePerUOM != null) this.pricingGroup.controls.SellingPricePerUOM.setValue(sub.sellingPricePerUOM)
      if (sub.transportTermID != null) this.pricingGroup.controls.TransportTerms.setValue(sub.transportTermID.toString())
      if (sub.shippingWarehouseID != null) this.pricingGroup.controls.ShippingWarehouse.setValue(sub.shippingWarehouseID.toString())
      if (sub.minimumOrderQuantity != null) this.pricingGroup.controls.MinimumOrderQuantity.setValue(sub.minimumOrderQuantity)
      if (sub.estimatedLeadTime != null) this.pricingGroup.controls.EstimatedLeadTime.setValue(sub.estimatedLeadTime)
      if (sub.quoteExpirationDate != null) this.pricingGroup.controls.QuoteExpirationDate.setValue(sub.quoteExpirationDate)
      if (sub.priceValidityDate != null) this.pricingGroup.controls.PriceValidityDate.setValue(sub.priceValidityDate)
      if (sub.sentToCMDate != null) this.pricingGroup.controls.SentToCMDate.setValue(sub.sentToCMDate)
      if (sub.pricePreparedBy != null) this.pricingGroup.controls.PricePreparedBy.setValue(sub.pricePreparedBy)
      if (sub.approvalDate != null) this.pricingGroup.controls.ApprovalDate.setValue(sub.approvalDate)
      if (sub.priceApprovedByID != null) this.pricingGroup.controls.PriceApprovedBy.setValue(sub.priceApprovedByID.toString())
      if (sub.completionDate != null) this.pricingGroup.controls.CompletionDate.setValue(sub.completionDate)
      if (sub.exchangeRate != null) this.pricingGroup.controls.ExchangeRate.setValue(sub.exchangeRate)

      this.loadBreakDownLines();

    });
  }

  saveline() {
    this.initiate.saveCompletionLine(this.completionLineID,
      this.QuoteID,
      this.pricingGroup.value.UnitOfMeasure,
      this.pricingGroup.value.CostPerUOM,
      this.pricingGroup.value.QuoteCurrency,
      this.pricingGroup.value.SellingPricePerUOM,
      this.pricingGroup.value.TransportTerms,
      this.pricingGroup.value.ShippingWarehouse,
      this.pricingGroup.value.MinimumOrderQuantity,
      this.pricingGroup.value.EstimatedLeadTime,
      this.pricingGroup.value.QuoteExpirationDate,
      this.pricingGroup.value.PriceValidityDate,
      this.pricingGroup.value.SentToCMDate,
      this.pricingGroup.value.ExchangeRate,
      this.pricingGroup.value.PricePreparedBy,
      this.pricingGroup.value.ApprovalDate,
      this.pricingGroup.value.PriceApprovedBy,
      this.pricingGroup.value.CompletionDate
    ).subscribe(sub => {
      this.pricingGroup.reset();
      this.showCompletionLine = false;
      this.loadData()
      this.productDetails.showProductDetails = false;
    });
  }

  cancel() {
    this.pricingGroup.reset();
    this.showCompletionLine = false;

    this.productDetails.showProductDetails = false;
  }

  private keyID: number;

  addKeyValue() {

    if (this.pricingGroup.value.FinaliseKey != "" && this.pricingGroup.value.FinaliseValue != "") {

      var keyToFind = this.pricingGroup.value.FinaliseKey.toString().trim()

      let item = this.lineKeyVal.filter(function (item) {
        return item.Key == keyToFind;
      });
      if (item != null) {
        this.initiate.saveCompletionLineBreakdownLine(this.keyID, this.completionLineID, this.pricingGroup.value.FinaliseValue, this.pricingGroup.value.FinaliseKey).subscribe(sub => {

          this.loadBreakDownLines();

          this.pricingGroup.controls.FinaliseKey.setValue("");
          this.pricingGroup.controls.FinaliseValue.setValue("");

          this.keyID = 0;
        });
      }
    }
  }

  clear(){
    this.pricingGroup.controls.FinaliseKey.setValue("");
    this.pricingGroup.controls.FinaliseValue.setValue("");

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

    this.pricingGroup.controls.FinaliseKey.setValue(val.Key);
    this.pricingGroup.controls.FinaliseValue.setValue(val.Value);
   
  }

  delete(val) {

    this.initiate.deleteCompletionLineBreakDown(val.ID).subscribe(sub=>{
      this.loadBreakDownLines();
    })
  }
}
