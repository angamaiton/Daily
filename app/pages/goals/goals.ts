import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddGoalPage } from '../add-goal/add-goal';
import { GoalData } from '../../providers/goal-data/goal-data';

/*
  Generated class for the GoalsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/goals/goals.html',
  providers: [GoalData]
})
export class GoalsPage {

  private goalList: any;

  constructor(private navCtrl: NavController, private goalData: GoalData) {
    this.navCtrl = navCtrl;
    this.goalData = goalData;

    this.goalData.getGoalList().on('value', snapshot => {
      let rawList = [];
      snapshot.forEach( snap => {
        rawList.push({
          id: snap.key,
          name: snap.val().name,
          date: snap.val().date,
          description: snap.val().description
        });
      });
      this.goalList = rawList;
    });
  }

  goToAddGoal() {
    this.navCtrl.push(AddGoalPage);
  }


}
