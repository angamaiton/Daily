import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../services/auth/auth';

import { TabsPage } from '../tabs/tabs';

/*
  Generated class for the SignupPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/signup/signup.html',
})
export class SignupPage {

  email: string;
  password: string;

  constructor(private navCtrl: NavController, private auth: AuthService) {

  }
  signUp() {
  }


}
