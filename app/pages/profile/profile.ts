import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { ProfileData } from '../../providers/profile-data/profile-data';

@Component({
  templateUrl: 'build/pages/profile/profile.html',
  providers: [ProfileData]
})
export class ProfilePage {

  public userProfile: any;
  public birthDate: string;

  constructor(private navCtrl: NavController, public profileData: ProfileData, public alertCtrl: AlertController) {

      this.profileData.getUserProfile().on('value', (data) => {
            this.userProfile = data.val();
            this.birthDate = this.userProfile.birthDate;
          });

  }
  goToSettings() {
    this.navCtrl.push(SettingsPage);
  }

  updateDOB(birthDate){
    this.profileData.updateDOB(birthDate);
  }

  updateName(){
    let alert = this.alertCtrl.create({
      message: "Your first name & last name",
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

  openCalendar() {

  }
}
