import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InitiateProviderService {

  constructor() { }

  saveOpportunity(data){
    console.log(data );
  }
}
