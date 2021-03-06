import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { ProfileData } from '../../providers/profile-data/profile-data';
import { EditContactInfoPage } from '../../pages/edit-contact-info/edit-contact-info';
import { CalendarComponent } from '../../pages/calendar/calendar';

@Component({
  templateUrl: 'build/pages/profile/profile.html',
  providers: [ProfileData],
  directives: [CalendarComponent]
})
export class ProfilePage {

  public userProfile: any;
  public profilePhoto: any;

  constructor(private navCtrl: NavController, public profileData: ProfileData, public alertCtrl: AlertController) {

      this.profileData.getUserProfile().on('value', (data) => {
            this.userProfile = data.val();
            if(!this.userProfile.photoURL) {
              this.userProfile.photoURL = 'http://www.freeiconspng.com/uploads/person-outline-icon-png-person-outline-icon-png-person-17.png'
              this.profilePhoto = this.userProfile.photoURL;
            } else {
              this.profilePhoto = this.userProfile.photoURL;
            }
          });

  }
  goToSettings() {
    this.navCtrl.push(SettingsPage)
  }

  updateName(){
    let alert = this.alertCtrl.create({
      message: "Please enter your first and last name.",
      inputs: [
        {
          name: 'firstName',
          placeholder: 'Your first name',
          value: this.userProfile.firstName
        },
        {
          name: 'lastName',
          placeholder: 'Your last name',
          value: this.userProfile.lastName
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.profileData.updateName(data.firstName, data.lastName);
          }
        }
      ]
    });
    alert.present();
  }

  updateEmail(){
  let alert = this.alertCtrl.create({
    inputs: [
      {
        name: 'newEmail',
        placeholder: 'Your new email',
      },
    ],
    buttons: [
      {
        text: 'Cancel',
      },
      {
        text: 'Save',
        handler: data => {
          this.profileData.updateEmail(data.newEmail);
        }
      }
    ]
  });
  alert.present();
}

  updatePassword() {
    let alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'newPassword',
          placeholder: 'Your new password',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.profileData.updatePassword(data.newPassword);
          }
        }
      ]
    });
    alert.present();
  }

  addProfileInformation() {
    this.navCtrl.push(EditContactInfoPage);
  }

}
