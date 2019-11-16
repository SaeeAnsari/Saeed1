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


}
