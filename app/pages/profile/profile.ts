import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import {AuthService} from '../../services/auth/auth';
import { SettingsPage } from '../settings/settings';
import { LoginPage } from '../../pages/login/login';

@Component({
  templateUrl: 'build/pages/profile/profile.html',
})
export class ProfilePage {

  // We need to inject AuthService so that we can
  // use it in the view
  constructor(private navCtrl: NavController, private auth: AuthService) {
    
  }
  logOut() {
    this.auth.logout();
    this.navCtrl.push(LoginPage);
    this.auth.lock.show();
  }
  goToSettings() {
    this.navCtrl.push(SettingsPage)
  }
}
