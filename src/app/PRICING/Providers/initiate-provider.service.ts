import { Injectable } from '@angular/core';
import { Http,  Headers, RequestOptions, URLSearchParams } from '@angular/http';
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

import {BaseLinkService} from '../Providers/base-link.service';
import { HttpClient } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class InitiateProviderService {
 

  constructor(private _http: Http) { }

  private _url = BaseLinkService.GetBaseUrl() + '/Pricing';

  getCompanyList(){
    
    return this._http.get(this._url + '/GetCompanyList')
      .map(ret => ret.json());
      
  }

  getCustomerNameList(companyID){
    return this._http.get(this._url + '/GetCustomerNameList?companyID=' + companyID)
      .map(ret => ret.json());      
  }

  getCustomerIDList(companyID){
    return this._http.get(this._url + '/GetCustomerIDList?companyID=' + companyID)
      .map(ret => ret.json());      
  }

  getOpportunityOwners(companyID){
    return this._http.get(this._url + '/GetOpportunityOwnerList?companyID=' + companyID)
    .map(ret => ret.json());     
  }

  getQuote(quoteID){
    return this._http.get(this._url + '/GetQuote?quoteID=' + quoteID)
    .map(ret => ret.json());     
  }

   
  

  saveOpportunity(data: any){
    console.log(data );
  }

  submitOpportunity(data: any){
    console.log(data);
  }

  deleteOpportunity(id: any){
    console.log(id);
  }

  saveProductDetails(data: any){
    console.log(data);
  }
}
