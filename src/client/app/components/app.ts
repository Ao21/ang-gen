/// <reference path="../../../../typings/tsd.d.ts" />

/*
 * Angular 2
 */
import {Component, View} from 'angular2/angular2';
import {RouterOutlet, RouteConfig, RouterLink} from 'angular2/router';

import {Logger} from '../helpers/logger';
import {TopNav } from 'app/layout/topNav';

import {Membership, MembershipLogin, MembershipAddons} from 'app/components/membership/modules'

import {Dispatcher} from 'app/services/Dispatcher';

@Component({
  selector: 'app', // without [ ] means we are selecting the tag directly
})
@View({
  directives: [RouterOutlet, RouterLink, TopNav],
  templateUrl : './app/layout/shell.html'
})

@RouteConfig(
  [
    {path:'/',  redirectTo: '/membership'},
    {path:'/membership',  component: Membership},
    {path:'/membership/login', as: 'membership-login', component: MembershipLogin},
    {path:'/membership/addons', as: 'membership-addons', component: MembershipAddons}
  ])


export class App {
  votes: number;
  
  constructor(public logger: Logger) {
    this.votes = 10;
    // const inst = Dispatcher.getInstance();
    // inst.subscribe('default','hello', this.voteUp);
    // inst.publish('default', 'hello', ['i']);
    // inst.subscriptions();
    // inst.unsubscribe('default', 'hello');
    // inst.subscriptions();

  }
  voteUp(){
    console.log('hi');
  }
}