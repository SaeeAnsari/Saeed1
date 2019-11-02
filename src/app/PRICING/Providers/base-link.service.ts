import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseLinkService {

  constructor() { }

  static GetBaseUrl() {
    //return 'http://localhost/change.api/api';
     
     return 'http://localhost/Caldic.API/API';
     //return 'http://localhost/Change.API/api';
   }
}
