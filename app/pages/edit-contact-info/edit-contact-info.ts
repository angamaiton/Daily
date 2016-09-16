import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ProfileData } from '../../providers/profile-data/profile-data';
import { AuthData } from '../../providers/auth-data/auth-data';
import { LoginPage } from '../../pages/login/login';

/*
  Generated class for the EditContactInfoPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/edit-contact-info/edit-contact-info.html',
  providers: [ProfileData, AuthData]
})
export class EditContactInfoPage {

  public userProfile: any;
  public birthDate: string;

  constructor(private navCtrl: NavController, public profileData: ProfileData,
    public authData: AuthData, public alertCtrl: AlertController) {

      this.profileData.getUserProfile().on('value', (data) => {
            this.userProfile = data.val();
            this.birthDate = this.userProfile.birthDate;
          });
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

  updateProfilePhoto() {
    let alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'newProfilePhoto',
          placeholder: 'Your new profile photo (test)'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.profileData.updateProfilePhoto(data.newProfilePhoto);
          }
        }
      ]
    });
    alert.present();
  }

  deleteAccount() {
    let alert = this.alertCtrl.create({
      message: "Are you sure you want to delete your account? You can't undo this.",
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Delete Forever',
          handler: () => {
            this.profileData.currentUser.delete().then(() => {this.navCtrl.setRoot(LoginPage)});
          }
        }
      ]
    });
    alert.present();
  }
}
