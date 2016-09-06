import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GoalData } from '../../providers/goal-data/goal-data';

/*
  Generated class for the AddGoalPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/add-goal/add-goal.html',
  providers: [GoalData]
})
export class AddGoalPage {

  constructor(private navCtrl: NavController, private goalData: GoalData) {
    this.navCtrl = navCtrl;
    this.goalData = goalData;
  }

  createGoal(goalName: string, goalDate: string, goalDescription: string) {
    this.goalData.createGoal(goalName, goalDate, goalDescription).then(() => {
        this.navCtrl.pop();
    });
  }

}
