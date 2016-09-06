import { Component } from '@angular/core';
import {NavController, Toggle} from 'ionic-angular';
import {EditContactInfoPage} from "../edit-contact-info/edit-contact-info";
import { AuthData } from '../../providers/auth-data/auth-data';
import { ProfileData } from '../../providers/profile-data/profile-data';
import { LoginPage } from '../login/login';

/*
  Generated class for the SettingsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/settings/settings.html',
  providers: [AuthData]
})
export class SettingsPage {

  private notifications: boolean;

  constructor(private navCtrl: NavController, private authData: AuthData) {

  }

  logOut(){
    this.authData.logoutUser().then(() => {
      this.navCtrl.setRoot(LoginPage);
    });
  }

  goToEditContactInfo() {
    this.navCtrl.push(EditContactInfoPage);
  }

  togglePushNotifications(togglePushNotifications: boolean) {

  }
}
