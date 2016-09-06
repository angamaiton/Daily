import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

/*
  Generated class for the ProfileData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProfileData {

  public userProfile: any;
  public pushNotificationsEnabled: any;
  public dailyEmailEnabled: any;
  public currentUser: any;

  constructor() {
    this.currentUser = firebase.auth().currentUser;
    this.pushNotificationsEnabled = firebase.database().ref('userProfile/' + this.currentUser.uid + '/pushNotificationsEnabled');
    this.dailyEmailEnabled = firebase.database().ref('userProfile/' + this.currentUser.uid + '/dailyEmailEnabled');
    this.userProfile = firebase.database().ref('/userProfile');
  }

  getUserProfile(): any {
    return this.userProfile.child(this.currentUser.uid);
  }

  updateName(firstName: string, lastName: string): any {
    return this.userProfile.child(this.currentUser.uid).update({
      firstName: firstName,
      lastName: lastName,
    });
  }

  updateDOB(birthDate: string): any {
    return this.userProfile.child(this.currentUser.uid).update({
      birthDate: birthDate,
    });
  }

  updateEmail(newEmail: string): any {
    this.currentUser.updateEmail(newEmail).then(() => {
      this.userProfile.child(this.currentUser.uid).update({
        email: newEmail
      });
    }, (error) => {
      console.log(error);
    });
  }

  updateDailyEmail(dailyEmailStatus) {
    return this.userProfile.child(this.currentUser.uid).update({
      dailyEmailEnabled: dailyEmailStatus
    })
  }

  updatePushNotifications(pushNotificationsStatus: boolean): any {
    return this.userProfile.child(this.currentUser.uid).update({
      pushNotificationsEnabled: pushNotificationsStatus
    });
  }


  updatePassword(newPassword: string): any {
    this.currentUser.updatePassword(newPassword).then(() => {
      console.log("Password changed!");
    }, (error) => {
      console.log(error);
    });
  }

}
