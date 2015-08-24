/// <reference path="../../../../../typings/tsd.d.ts" />

/*
 * Angular 2
 */
import {Component, View} from 'angular2/angular2';
import {RouterOutlet, RouteConfig, RouterLink} from 'angular2/router';

/*
 * Directives
 * angularDirectives: Angular's core/form/router directives
 * appDirectives: Our collection of directives from /directives
 */
import {appDirectives, angularDirectives} from 'app/directives/directives';


// Simple external file component example
@Component({
  selector: 'membership'
})
@View({
  directives: [ angularDirectives, appDirectives ],
  templateUrl : './app/components/membership/membership.html'
})
export class Membership {
  constructor() {
  }
}
