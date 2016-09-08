import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { AddGoalPage } from '../add-goal/add-goal';
import { GoalData } from '../../providers/goal-data/goal-data';
import { IntroSlidesPage } from '../intro-slides/intro-slides';

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

  constructor(private navCtrl: NavController, private goalData: GoalData, public modalCtrl: ModalController) {
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

  presentLoginModal() {
    let loginModal = this.modalCtrl.create(IntroSlidesPage);
    loginModal.present();
  }

  goToAddGoal() {
    this.navCtrl.push(AddGoalPage);
  }


}
