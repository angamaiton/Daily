import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../services/auth/auth';

/*
  Generated class for the AddGoalPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/add-goal/add-goal.html',
})
export class AddGoalPage {

  constructor(private navCtrl: NavController, private auth: AuthService) {

  }

}
