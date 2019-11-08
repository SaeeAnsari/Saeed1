import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InitiateProviderService } from '../Providers/initiate-provider.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { KeyValue } from '@angular/common';


@Component({
  selector: 'app-product-finalised',
  templateUrl: './product-finalised.component.html',
  styleUrls: ['./product-finalised.component.css']
})
export class ProductFinalisedComponent implements OnInit {


  @Input() QuoteID: string
  @Input() CompanyName: string

  private completionLineID;
  private _data;
  private pricingGroup: FormGroup;
  private productResults = [];
  private uomList = [];
  private currencyCodes = [];
  private approverList = [];
  private transportTermsList = [];
  private shippingWarehouseList = [];
  _lineData: any[];
  private showCompletionLine: boolean = false;

  displayedColumns: string[] = ['ProductCode', 'ProductDescription', 'IsCompleted', 'Actions'];

  
  
  displayKeyValColumns: string[] = ['Key', 'Value', 'Actions']
  private lineKeyVal = [{Key:"", Value: ""}, {Key: "11", Value: ""}];

  @ViewChild("productDetails", { static: false }) productDetails: ProductDetailsComponent;

  constructor(fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private initiate: InitiateProviderService) {


    this.pricingGroup = fb.group({
      UnitOfMeasure: [{ value: '', disabled: false }],
      QuoteCurrency: [{ value: '', disabled: false }],
      CostPerUOM: [{ value: '', disabled: false }],
      SellingPricePerUOM: [{ value: '', disabled: false }],
      TransportTerms: [{ value: '', disabled: false }],
      ShippingWarehouse: [{ value: '', disabled: false }],
      MinimumOrderQuantity: [{ value: '', disabled: false }],
      EstimatedLeadTime: [{ value: '', disabled: false }],
      QuoteExpirationDate: [{ value: '', disabled: false }],
      PriceValidityDate: [{ value: '', disabled: false }],
      SentToCMDate: [{ value: '', disabled: false }],
      PricePreparedBy: [{ value: '', disabled: false }],
      ApprovalDate: [{ value: '', disabled: false }],
      PriceApprovedBy: [{ value: '', disabled: false }],
      CompletionDate: [{ value: '', disabled: false }],
      ExchangeRate: [{ value: '', disabled: false }],
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

      
    });
  }

  cancel(){
    this.pricingGroup.reset();
  }

  addKeyValue(){

    this.lineKeyVal.push({Key: this.pricingGroup.value.FinaliseKey.toString(), Value: this.pricingGroup.value.FinaliseValue.toString()})
  }
}
