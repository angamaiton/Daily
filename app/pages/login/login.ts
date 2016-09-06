import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import {AuthService} from '../../services/auth/auth';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {

  constructor(private navCtrl: NavController, private auth: AuthService) {

  }

  public logIn() {
    this.auth.login();
    this.navCtrl.setRoot(TabsPage);
  }
}
