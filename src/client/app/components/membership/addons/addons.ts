/// <reference path="../../../../../../typings/tsd.d.ts" />

/*
 * Angular 2
 */
import {Component, View} from 'angular2/angular2';

/*
 * Directives
 * angularDirectives: Angular's core/form/router directives
 * appDirectives: Our collection of directives from /directives
 */
import {appDirectives, angularDirectives} from 'app/directives/directives';


// Simple external file component example
@Component({
  selector: 'addons'
})
@View({
  directives: [ angularDirectives, appDirectives ],
  templateUrl : './app/components/membership/addons/addons.html'
})
export class MembershipAddons {
  constructor() {
    console.log(appDirectives);

  }
}
