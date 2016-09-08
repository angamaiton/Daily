import {Component, provide, Injectable} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {LoginPage} from "./pages/login/login";
import {GoalsPage} from "./pages/goals/goals";
import * as firebase from 'firebase';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  rootPage: any;

  constructor(private platform: Platform) {

    const
      dailyApp = {
        apiKey: "AIzaSyC-xk4DT4hVSUQWCJstMRTlZ1iwNtIBokY",
        authDomain: "daily-by-praxis-142323.firebaseapp.com",
        databaseURL: "https://daily-by-praxis-142323.firebaseio.com",
        storageBucket: "daily-by-praxis-142323.appspot.com"
      };

    firebase.initializeApp(dailyApp);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.rootPage = TabsPage;
      } else {
        this.rootPage = LoginPage;
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      // this.auth.startupTokenRefresh();
    });
  }
}

ionicBootstrap(MyApp);
