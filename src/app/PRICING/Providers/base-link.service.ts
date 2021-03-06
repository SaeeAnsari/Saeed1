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




@Injectable({
  providedIn: 'root'
})
export class BaseLinkService {

  constructor(private _http: Http) { }

  static GetBaseUrl() {
    //return 'http://localhost/change.api/api';
     
    //return 'http://localhost/Caldic.API/API';
    return 'http://toro-web-002.ca.caldic.cgn/Dev.CaldicAPI/api'
    //return 'http://toro-web-002.ca.caldic.cgn/CaldicAPI/api';
   }

   public _url = BaseLinkService.GetBaseUrl() + '/Pricing';

   GetPricingHome(){   
      return this._http.get(this._url + '/GetPricingHome')
        .map(ret => ret.json());      
   }

   public static GetFileDownloadFolder(){
    //return 'http://localhost/Caldic.API/FileUploads/';
    this.GetBaseUrl().replace('/api', '/FileUploads/');
   }

   
}
