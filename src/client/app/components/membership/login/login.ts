/// <reference path="../../../../../../typings/tsd.d.ts" />

/*
 * Angular 2
 */
 
import {Component, View} from 'angular2/angular2';
import {formDirectives, FormBuilder, ControlGroup, Control} from "angular2/angular2";
import {OnActivate} from 'angular2/router';
import {Validators} from 'angular2/angular2';

/*
 * Directives
 * angularDirectives: Angular's core/form/router directives
 * appDirectives: Our collection of directives from /directives
 */
 
import {appDirectives, angularDirectives} from 'app/core/directives';

// Simple external file component example
@Component({
  selector: 'login',
  viewInjector: [FormBuilder]
})

@View({
  directives: [ angularDirectives, appDirectives ],
  templateUrl : './app/components/membership/login/login.html'
})

export class MembershipLogin {
  myForm: ControlGroup;
  email: Control;
  visible: Boolean;
  
  
  constructor(fb: FormBuilder){
    this.visible = false;
    this.myForm = fb.group({
      "email" : ["", Validators.required],
      "password": [""]
      });
      
    this.email = this.myForm.controls['email']; 
  }
  
  onSubmit(value) {
    this.visible = true;
  }
  OnActivate() {
    console.log('loaded');
  }
  
}
