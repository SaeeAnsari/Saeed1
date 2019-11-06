import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InitiateProviderService } from '../Providers/initiate-provider.service';
import { ActivatedRoute, Router } from '@angular/router';


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

  displayedColumns: string[] = ['ProductCode', 'ProductDescription','IsCompleted', 'Actions'];

  constructor(fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private initiate: InitiateProviderService) {


    this.pricingGroup = fb.group({
      UnitOfMeasure: [{ value: '', disabled: true }],
      QuoteCurrency: [{ value: '', disabled: true }],
      CostPerUOM: [{ value: '', disabled: true }],
      SellingPricePerUOM: [{ value: '', disabled: true }],
      TransportTerms: [{ value: '', disabled: true }],
      ShippingWarehouse: [{ value: '', disabled: true }],
      MinimumOrderQuantity: [{ value: '', disabled: true }],
      EstimatedLeadTime: [{ value: '', disabled: true }],
      QuoteExpirationDate: [{ value: '', disabled: true }],
      PriceValidityDate: [{ value: '', disabled: true }],
      SentToCMDate: [{ value: '', disabled: true }],
      PricePreparedBy: [{ value: '', disabled: true }],
      ApprovalDate: [{ value: '', disabled: true }],
      PriceApprovedBy: [{ value: '', disabled: true }],
      CompletionDate: [{ value: '', disabled: true }],
      ExchangeRate: [{ value: '', disabled: true }]
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
          this._lineData.push({ ProductDescription: element.productDescription, ProductCode: element.productCode, isCompleted: element.isComplete, CompletionLineID: element.completionLineID });
        });

        this.productResults = this._lineData;
      })
    }
  }

  lineEdit(value){
    if(value !=null && +value > 0){
      this.completionLineID = value;
      this.showCompletionLine = true;
      this.loadLine();
    }
  }

  loadLine(){
    this.initiate.getCompletionLineId(this.completionLineID).subscribe(sub=>{

      this.pricingGroup.reset();

      this.pricingGroup.controls.UnitOfMeasure.setValue(sub.uom),
      this.pricingGroup.controls.QuoteCurrency.setValue(sub.currencyID.toString())
      this.pricingGroup.controls.CostPerUOM.setValue(sub.costPerUOM),
      this.pricingGroup.controls.SellingPricePerUOM.setValue(sub.sellingPricePerUOM),
      this.pricingGroup.controls.TransportTerms.setValue(sub.transportTermID.toString()),
      this.pricingGroup.controls.ShippingWarehouse.setValue(sub.shippingWarehouseID.toString()),
      this.pricingGroup.controls.MinimumOrderQuantity.setValue(sub.minimumOrderQuantity),
      this.pricingGroup.controls.EstimatedLeadTime.setValue(sub.estimatedLeadTime),
      this.pricingGroup.controls.QuoteExpirationDate.setValue(sub.quoteExpirationDate),
      this.pricingGroup.controls.PriceValidityDate.setValue(sub.priceValidityDate),
      this.pricingGroup.controls.SentToCMDate.setValue(sub.sentToCMDate),
      this.pricingGroup.controls.PricePreparedBy.setValue(sub.pricePreparedBy),
      this.pricingGroup.controls.ApprovalDate.setValue(sub.approvalDate),
      this.pricingGroup.controls.PriceApprovedBy.setValue(sub.priceApprovedByID.toString()),
      this.pricingGroup.controls.CompletionDate.setValue(sub.completionDate),
      this.pricingGroup.controls.ExchangeRate.setValue(sub.exchangeRate)     

    });
    }
}
