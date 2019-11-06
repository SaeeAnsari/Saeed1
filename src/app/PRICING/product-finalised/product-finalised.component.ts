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
  @Input() QuoteLineID: string
  @Input() CompanyName: string

  private _data;
  private pricingGroup: FormGroup;
  private uomList = [];
  private currencyCodes = [];
  private approverList = [];
  private transportTermsList = [];
  private shippingWarehouseList = [];


  constructor(fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private initiate: InitiateProviderService) {

     
    this.pricingGroup = fb.group({
      UnitOfMeasure: [{value: '', disabled:false}],
      QuoteCurrency: [{value: '', disabled:false}],
      CostPerUOM: [{value: '', disabled:true}],
      SellingPricePerUOM: [{value: '', disabled:true}],
      TransportTerms: [{value: '', disabled:false}],
      ShippingWarehouse: [{value: '', disabled:false}],
      MinimumOrderQuantity: [{value: '', disabled:true}],
      EstimatedLeadTime: [{value: '', disabled:true}],
      QuoteExpirationDate: [{value: '', disabled:true}],
      PriceValidityDate: [{value: '', disabled:true}],
      SentToCMDate: [{value: '', disabled:true}],
      PricePreparedBy: [{value: '', disabled:true}],
      ApprovalDate: [{value: '', disabled:true}],
      PriceApprovedBy: [{value: '', disabled:false}],
      CompletionDate: [{value: '', disabled:true}],
      ExchangeRate: [{value: '', disabled:true}]
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
  }
}
