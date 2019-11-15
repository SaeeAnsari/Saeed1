import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(sub => {
      var route = sub.get("route");
      var entityID = sub.get("entity")
      var routeURL = '';
      if (route != null) {
        if (route == "search") {
          routeURL = 'pricingsearch';
          if (entityID != null) {
            routeURL += '&quoteID=' + entityID;
          }
          this.router.navigate([routeURL]);
        }
        else if (route == "initiate") {
          routeURL = 'pricinginitiate';
          if (entityID != null) {
            routeURL += '&quoteID=' + entityID;
          }
          this.router.navigate([routeURL]);
        }
        else if (route == "finalise") {
          routeURL = 'pricingFinalise';
          if (entityID != null) {
            routeURL += '&quoteID=' + entityID;
          }
          this.router.navigate([routeURL]);
        }
        else if (route == "report") {
          routeURL = 'quoteReport';
          if (entityID != null) {
            routeURL += '&quoteID=' + entityID;
          }
          this.router.navigate([routeURL]);
        }
      }
      else {
        routeURL = 'pricingsearch';
        this.router.navigate([routeURL]);
      }
    })
  }

  ngOnInit() {
  }
}
