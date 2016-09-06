import { Component } from '@angular/core';
import {NavController, Toggle} from 'ionic-angular';
import {AuthService} from '../../services/auth/auth';
import {EditContactInfoPage} from "../edit-contact-info/edit-contact-info";

/*
  Generated class for the SettingsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/settings/settings.html',
})
export class SettingsPage {

  notifications: boolean;

  constructor(private navCtrl: NavController, private auth: AuthService) {

  }
  logIn() {

  }
  logOut() {

  }

  toggleNotifications(toggle: Toggle) {

  }

  editContactInfo() {
    this.navCtrl.push(EditContactInfoPage);
  }
}
