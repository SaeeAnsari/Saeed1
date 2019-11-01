import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InitiateProviderService {

  constructor() { }

  saveOpportunity(data){
    console.log(data );
  }

  submitOpportunity(data){
    console.log(data);
  }

  deleteOpportunity(id){
    console.log(id);
  }

  saveProductDetails(data){
    console.log(data);
  }
}
