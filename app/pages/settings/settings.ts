import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { EditContactInfoPage } from "../edit-contact-info/edit-contact-info";
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
  providers: [AuthData, ProfileData]
})
export class SettingsPage {

  public userProfile: any;
  private pushNotifications: boolean;
  private dailyEmail: boolean;

  constructor(private navCtrl: NavController, private authData: AuthData, private profileData: ProfileData) {

    this.profileData.getUserProfile().on('value', (data) => {
          this.userProfile = data.val();
          this.pushNotifications = this.userProfile.pushNotificationsEnabled;
          this.dailyEmail = this.userProfile.dailyEmailEnabled;
        });

    this.profileData = profileData;
  }

  logOut(){
    this.authData.logoutUser().then(() => {
      this.navCtrl.setRoot(LoginPage);
    });
  }

  goToEditContactInfo() {
    this.navCtrl.push(EditContactInfoPage);
  }

  togglePushNotifications(pushNotifications: boolean) {
    this.profileData.updatePushNotifications(pushNotifications).then(() => {

    });
  }

  toggleDailyEmail(dailyEmail: boolean) {
    this.profileData.updateDailyEmail(dailyEmail);
  }
}
