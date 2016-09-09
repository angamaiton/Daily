import {Component} from '@angular/core'
import {Modal,Page, NavController} from 'ionic-angular';
import {CalendarComponent} from '../calendar/calendar';

const TAG = 'Launch:';

@Component({
  templateUrl: 'build/pages/launch/launch.html',
  directives:[CalendarComponent]
})
export class Launch {
  private months:Array<any> = [];

  constructor(private nav: NavController) {

  }



}
