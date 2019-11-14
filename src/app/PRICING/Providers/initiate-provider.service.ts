import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map } from "rxjs/operators";

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';;

import { BaseLinkService } from '../Providers/base-link.service';
import { HttpClient } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class InitiateProviderService {


  constructor(private _http: Http) {

  }

  private _url = BaseLinkService.GetBaseUrl() + '/Pricing';

  getCompanyList() {

    return this._http.get(this._url + '/GetCompanyList')
      .map(ret => ret.json());

  }


  getApprovers() {

    return this._http.get(this._url + '/GetApprovers')
      .map(ret => ret.json());

  }

  GetShippingWarehouse() {

    return this._http.get(this._url + '/GetShippingWarehouse')
      .map(ret => ret.json());

  }

  GetTransportTerms() {

    return this._http.get(this._url + '/GetTransportTerms')
      .map(ret => ret.json());

  }


  getCustomerNameList(companyID) {
    return this._http.get(this._url + '/GetCustomerNameList?companyID=' + companyID)
      .map(ret => ret.json());
  }

  getCustomerIDList(companyID) {
    return this._http.get(this._url + '/GetCustomerIDList?companyID=' + companyID)
      .map(ret => ret.json());
  }

  getOpportunityOwners(companyID) {
    return this._http.get(this._url + '/GetOpportunityOwnerList?companyID=' + companyID)
      .map(ret => ret.json());
  }

  getQuote(quoteID) {
    return this._http.get(this._url + '/GetQuote?quoteID=' + quoteID)
      .map(ret => ret.json());
  }

  getQuoteLines(quoteID) {
    return this._http.get(this._url + '/GetQuoteLines?quoteID=' + quoteID)
      .map(ret => ret.json());
  }

  getQuoteLine(quoteLineID) {
    return this._http.get(this._url + '/GetQuoteLine?quoteLineID=' + quoteLineID)
      .map(ret => ret.json());
  }


  getPartList(companyID, sortDirection) {
    return this._http.get(this._url + '/GetPartsListByCompany?companyID=' + companyID + '&sortDirection=' + sortDirection)
      .map(ret => ret.json());
  }

  getPart(partID, companyID) {
    return this._http.get(this._url + '/GetPart?partID=' + partID + '&companyID=' + companyID)
      .map(ret => ret.json());
  }

  getUnitOfMeasureList() {
    return this._http.get(this._url + '/GetUOMList')
      .map(ret => ret.json());
  }

  getContainerTypeList() {
    return this._http.get(this._url + '/GetContainerTypeList')
      .map(ret => ret.json());
  }

  getCurrencyCodeList() {
    return this._http.get(this._url + '/GetCurrencyList')
      .map(ret => ret.json());
  }

  getCompletionLineId(completionLineID) {
    return this._http.get(this._url + '/GetCompletionLineId?completionLineID=' + completionLineID)
      .map(ret => ret.json());
  }

  getPaymentTerms() {
    return this._http.get(this._url + '/GetPaymentTerms')
      .map(ret => ret.json());
  }


  getCompletionLines(quoteID) {

    return this._http.get(this._url + '/GetCompletionLines?quoteID=' + quoteID)
      .map(ret => ret.json());
  }

  saveQuoteHeader(quoteID, priorityLevel, customerName, opportunityOwnerName, opportunityType, opportunityName, paymentTermsID, requestedBy, companyID, customerID, opportunityOwnerID, isTestCustomer): Observable<any> {

    var header = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });

    let data = {
      quoteID: quoteID,
      priorityLevel: priorityLevel,
      customerName: customerName,
      opportunityOwner: opportunityOwnerName,
      opportunityType: opportunityType,
      opportunityName: opportunityName,
      paymentTermID: paymentTermsID,
      requestedBy: requestedBy,
      companyID: companyID,
      customerID: customerID,
      opportunityOwnerID: opportunityOwnerID,
      isTest: isTestCustomer
    };

    return this._http.post(this._url + '/SaveQuote',
      data,
      { headers: header })
      .map(post => post.json())
      .catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    console.log(error._body);
    return Observable.throw(errMsg);
  }



  submitOpportunity(quoteID: any): Observable<any> {

    var header = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });


    return this._http.post(this._url + '/SubmitQuote',
      quoteID
      ,
      { headers: header })
      .map(post => post.json())
      .catch(this.handleError);
  }




  validateFinaliseQuote(quoteID: any): Observable<any> {

    var header = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });


    return this._http.post(this._url + '/ValidateFinaliseQuote',
      quoteID
      ,
      { headers: header })
      .map(post => post.json())
      .catch(this.handleError);
  }

  finaliseQuote(quoteID, paymentTermsID, ccEmail): Observable<any> {

    var header = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });



    var methodURL = this._url + '/FinaliseQuote?quoteID=' + quoteID + '&paymentTermID=' + paymentTermsID;
    if(ccEmail != null && ccEmail != ''){
      methodURL += '&ccEmail=' + ccEmail;
    }


    return this._http.post(methodURL,
    null      
      ,
      { headers: header })
      .map(post => post.json())
      .catch(this.handleError);
  }

  deleteOpportunity(quoteID: any): Observable<any> {

    var header = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });

    return this._http.post(this._url + '/DeleteQuote',
      quoteID,
      { headers: header })
      .map(post => post.json())
      .catch(this.handleError);
  }

  saveQuoteLine(quoteLineID, quoteID, productCode, productDescription, usageLevel, unitOfMeasure, comments, targetPrice, targetCurrencyID, annualVolume?, typicalOrderSize?, packSize?, containerTypeID?) {
    var header = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });

    var data = {
      quoteLineID: quoteLineID,
      quoteID: quoteID,
      productCode: productCode,
      productDescription: productDescription,
      usageLevel: usageLevel,
      unitOfMeasure: unitOfMeasure,
      annualVolume: annualVolume,
      typicalOrderSize: typicalOrderSize,
      packSize: packSize,
      containerTypeID: containerTypeID,
      targetPrice: targetPrice,
      targetCurrencyID: targetCurrencyID,
      comments: comments
    };

    return this._http.post(this._url + '/SaveQuoteLine',
      JSON.stringify(data),
      { headers: header })
      .map(post => post.json())
      .catch(this.handleError);
  }

  deleteQuoteLine(quoteLineID) {
    var header = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });

    return this._http.post(this._url + '/DeleteQuoteLine',
      quoteLineID,
      { headers: header })
      .map(post => post.json())
      .catch(this.handleError);
  }

  getCompletionLineBreakDown(completionLineID) {
    var header = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });

    return this._http.get(this._url + '/GetCompletionLineBreakDown?completionLineID=' + completionLineID)
    .map(ret => ret.json());    
  }

  deleteCompletionLineBreakDown(breakdownID) {


    var header = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });

    return this._http.post(this._url + '/RemoveBreakdownLine',
    breakdownID,
      { headers: header })
      .map(post => post.json())
      .catch(this.handleError);
  }

  saveCompletionLineBreakdownLine(breakDownLineID, completionLineID, fieldValue, fieldName) {
    var header = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });

    var data = {
      BreakDownLineID: breakDownLineID,
      FieldValue: fieldValue,
      FieldName: fieldName,
      CompletionLineID: completionLineID
    };

    return this._http.post(this._url + '/SaveBreakdownLine',
      JSON.stringify(data),
      { headers: header })
      .map(post => post.json())
      .catch(this.handleError);
  }

  
  saveCompletionLine(completionLineID, quoteID, uom, costPerUOM, currencyID, sellingPriceUOM, transportTermlsID, shippingWarehouseID, 
    minimumQuantity, estimatedLeadTime, quoteExpirationDate, priceValidityDate, sentToCMDate, exchangeRate, pricePreparedBy, 
    approvalDate, approvedByID, completionDate) {
    var header = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });

    var data = {
      CompletionLineID: completionLineID,
      QuoteID: quoteID,
      UOM: uom,
      CostPerUOM: costPerUOM == ""? null : costPerUOM,
      CurrencyID: currencyID,
      SellingPricePerUOM: sellingPriceUOM ==""? null: sellingPriceUOM,
      TransportTermID:transportTermlsID,
      ShippingWarehouseID: shippingWarehouseID,
      MinimumOrderQuantity :minimumQuantity ==""? null: minimumQuantity,
      EstimatedLeadTime: estimatedLeadTime,
      QuoteExpirationDate: quoteExpirationDate == ""? null : quoteExpirationDate,
      PriceValidityDate: priceValidityDate ==""? null : priceValidityDate,
      SentToCMDate: sentToCMDate ==""? null : sentToCMDate,
      ExchangeRate: exchangeRate,
      PricePreparedBy: pricePreparedBy,
      ApprovalDate: approvalDate ==""? null : approvalDate,
      PriceApprovedByID: approvedByID,
      CompletionDate: completionDate ==""? null : completionDate
    };

    return this._http.post(this._url + '/GetCompletionLinebyCompletionLineID',
      JSON.stringify(data),
      { headers: header })
      .map(post => post.json())
      .catch(this.handleError);
  }  

  getQuoteReportData(quoteID) {
    var header = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });

    return this._http.get(this._url + '/GetQuoteReportData?quoteID=' + quoteID)
    .map(ret => ret.json());    
  }
}

