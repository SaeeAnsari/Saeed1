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


import { HttpClient } from 'selenium-webdriver/http';
import { BaseLinkService } from 'src/app/PRICING/Providers/base-link.service';




@Injectable({
  providedIn: 'root'
})
export class SirfInitaiteService {



  private _url = BaseLinkService.GetBaseUrl() + '/SIRF';

  constructor(private _http: Http) { }

  public getPriorityList() {

    return this._http.get(this._url + '/GetPriorities')
      .map(ret => ret.json());

  }

  public getPrimaryResponsibilities() {

    return this._http.get(this._url + '/GetPrimaryResponsibilities')
      .map(ret => ret.json());

  }

  public getRequestCategories() {

    return this._http.get(this._url + '/GetRequestCategories')
      .map(ret => ret.json());

  }

  public getCustomerRegions() {

    return this._http.get(this._url + '/GetCustomerRegions')
      .map(ret => ret.json());

  }

  public getBusinessRegions() {

    return this._http.get(this._url + '/GetBusinessRegions')
      .map(ret => ret.json());

  }


  public getReOccurinigIssue() {

    return this._http.get(this._url + '/GetReOccurinigIssue')
      .map(ret => ret.json());

  }

  submitOpportunity(data: any): Observable<any> {

    var header = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });


    return this._http.post(this._url + '/SubmitSIRF',
      data
      ,
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

  SIRFAddCost(data: any): Observable<any> {

    var header = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });


    return this._http.post(this._url + '/SIRFAddCost',
      data
      ,
      { headers: header })
      .map(post => post.json())
      .catch(this.handleError);
  }

  SIRFDeleteCost(costCategoryID: any): Observable<any> {

    var header = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });


    return this._http.post(this._url + '/SIRFDeleteCost',
      costCategoryID
      ,
      { headers: header })
      .map(post => post.json())
      .catch(this.handleError);
  }


  public SIRFGetAllCost(sirfNumber) {

    return this._http.get(this._url + '/SIRFGetAllCost?sirfNumber=' + sirfNumber)
      .map(ret => ret.json());

  }

  public GetCostCategories() {

    return this._http.get(this._url + '/GetCostCategories')
      .map(ret => ret.json());

  }

  public GetRootCauseCategories() {

    return this._http.get(this._url + '/GetRootCauseCategories')
      .map(ret => ret.json());

  }

  public GetRootCauseCategoriesBySIRF(sirfNumber) {

    return this._http.get(this._url + '/GetRootCauseCategoriesBySIRF?SIRFNumber=' + sirfNumber)
      .map(ret => ret.json());

  }

  public updateSIRFRootCauseItem(data: any): Observable<any> {

    var header = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });



    return this._http.post(this._url + '/UpdateSIRFRootCauseItem',
      JSON.stringify(data)
      ,
      { headers: header })
      .map(post => post.json())
      .catch(this.handleError);
  }


  public getSIRF(sirfNumber) {

    return this._http.get(this._url + '/GetSIRF?SIRFID=' + sirfNumber)
      .map(ret => ret.json());
  }


  updateSIRFDetails(data) {
    var header = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });



    return this._http.post(this._url + '/UpdateSIRFDetails',
      data
      ,
      { headers: header })
      .map(post => post.json())
      .catch(this.handleError);
  }

  public sirfGetAttachments(sirfNumber) {

    return this._http.get(this._url + '/SIRFGetAttachments?SIRFNumber=' + sirfNumber)
      .map(ret => ret.json());
  }

  public sirfSaveAttachment(sirfNumber, fileName) {

    return this._http.get(this._url + '/SIRFSaveAttachment?SIRFNumber=' + sirfNumber + '&Filename=' + fileName)
      .map(ret => ret.json());
  }
}
