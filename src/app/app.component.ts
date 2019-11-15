import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseLinkService } from './PRICING/Providers/base-link.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BaseLinkService]
})
export class AppComponent {
  title = 'bootstraptest';


  constructor(private router: Router, private route: ActivatedRoute, private baseLink: BaseLinkService){

  }


  pricingHome_Click(){
    this.baseLink.GetPricingHome().subscribe(sub=>{
      window.location.href = sub;
    })    
  }

  search_Click(){
    this.router.navigate(['pricingsearch']);
  }
}
