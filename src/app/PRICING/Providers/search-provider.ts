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

export class SearchProvider {

  private _url = BaseLinkService.GetBaseUrl() + '/Pricing';

  constructor(private _http: Http) {

  }

  SearchPricing(queryParams) {

    var header = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });

    return this._http.post(this._url + '/SearchPricing?searchItem=' + queryParams,
      null,
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
}
