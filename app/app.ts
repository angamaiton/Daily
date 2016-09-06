import {Component, provide, Injectable} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {GoalsPage} from './pages/goals/goals';
import {Http} from '@angular/http';
import {AuthHttp, AuthConfig} from 'angular2-jwt';
import {AuthService} from './services/auth/auth';
import * as firebase from 'firebase';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  private rootPage: any = TabsPage;

  constructor(private platform: Platform, private auth: AuthService) {

    const
      fbConf = {
        apiKey: "AIzaSyC-xk4DT4hVSUQWCJstMRTlZ1iwNtIBokY",
        authDomain: "daily-by-praxis-142323.firebaseapp.com",
        databaseURL: "https://daily-by-praxis-142323.firebaseio.com",
        storageBucket: "daily-by-praxis-142323.appspot.com"
      };

    if (!auth.authenticated()) {
      this.logIn();
    } else if (auth.authenticated()) {
      this.rootPage = TabsPage;
    }

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      this.auth.startupTokenRefresh();
    });
  }

  public logIn() {
    this.auth.login();
  }
}

ionicBootstrap(MyApp, [
  provide(AuthHttp, {
    useFactory: (http) => {
      return new AuthHttp(new AuthConfig({noJwtError: true}), http);
    },
    deps: [Http]
  }),
  AuthService
])
