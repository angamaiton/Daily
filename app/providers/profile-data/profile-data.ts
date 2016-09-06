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
  public currentUser: any;

  constructor() {
    this.currentUser = firebase.auth().currentUser;
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

  togglePushNotifications(pushNotifications: boolean): any {
    this.currentUser.togglePushNotifications().then(() => {
      this.userProfile.child(this.currentUser.uid).update({
        pushNotifications: pushNotifications
      });
    })
  }


  updatePassword(newPassword: string): any {
    this.currentUser.updatePassword(newPassword).then(() => {
      console.log("Password changed!");
    }, (error) => {
      console.log(error);
    });
  }

}
