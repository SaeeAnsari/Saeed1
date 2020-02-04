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
  public title = 'Pricing Portal';
  private  mode = "pricing";

  constructor(private router: Router, private route: ActivatedRoute, private baseLink: BaseLinkService) {

    var titleSet = false;
    

    router.events.subscribe((e: any) => {
      if (!titleSet) {

        try {

          if (e != null && e.url != null) {

            if (e.url.toLowerCase().indexOf('sirf') > -1) {
              this.title = "Search SIRF Form"
              this.mode = "sirf";
            }
          }
        }
        catch (e) { }
      }


    })
  }


  pricingHome_Click() {
    this.baseLink.GetPricingHome().subscribe(sub => {
      window.location.href = sub;
    })
  }

  search_Click() {
    if(this.mode == "sirf"){
      this.router.navigate(['sirfsearch']);
    }
    else
    {
      this.router.navigate(['pricingsearch']);
    }
  }
}
