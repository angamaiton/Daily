import {Component} from '@angular/core';
import {GoalsPage} from '../goals/goals';
import {ProfilePage} from '../profile/profile';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = GoalsPage;
    this.tab2Root = ProfilePage;
  }
}
