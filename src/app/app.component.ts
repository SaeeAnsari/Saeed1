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


  constructor(private router: Router, private route: ActivatedRoute, private baseLink: BaseLinkService) {

    var titleSet = false;

    router.events.subscribe((e: any) => {
      if (!titleSet) {

        try {

          if (e != null && e.url != null) {

            if (e.url.toLowerCase().indexOf('sirf') > -1) {
              this.title = "Service Improvement Request Form"
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
    this.router.navigate(['pricingsearch']);
  }
}
