import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddGoalPage } from '../add-goal/add-goal';
import { AuthService } from '../../services/auth/auth';

/*
  Generated class for the GoalsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/goals/goals.html',
})
export class GoalsPage {

  constructor(private navCtrl: NavController, private auth: AuthService) {

  }
  addGoal() {
      debugger;
      this.navCtrl.push(AddGoalPage, {
        user: this.auth.user
      });
  }

}
