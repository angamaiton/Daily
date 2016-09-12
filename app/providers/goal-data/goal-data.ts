import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

/*
  Generated class for the GoalData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GoalData {

  public currentUser: any;
  public goalList: any;
  public profilePictureRef: any;
  public subtaskList: any;

  constructor() {
    this.currentUser = firebase.auth().currentUser.uid;
    this.goalList = firebase.database().ref('/userProfile/' + this.currentUser + '/goalList');
    this.profilePictureRef = firebase.storage().ref('/guestProfile');
  }

  getGoalList(): any {
    return this.goalList;
  }

  getGoalDescription(goalId): any {
    return this.goalList.child(goalId);
  }

  createGoal(goalName: string, goalDate: string, goalDescription: string): any {
    return this.goalList.push({
      name: goalName,
      date: goalDate,
      description: goalDescription
    }).then( newGoal => {
      this.goalList.child(newGoal.key).child('id').set(newGoal.key);
    });
  }

  getSubtaskList(goalId): any {
    this.subtaskList = firebase.database().ref('/userProfile/' + this.currentUser + '/goalList/' + goalId + '/subtaskList');
    return this.goalList.child(goalId).subtaskList;
  }

  deleteGoal(goalId): any {
    return this.goalList.child(goalId).remove();
  }
}
