import {Injectable, Component, Input, EventEmitter, ViewChild} from '@angular/core';
import {Slides} from 'ionic-angular';
import {CalendarService} from './calendar.service';
declare var require: any;
var moment = require('moment');

const NUM_OF_DAYS = 7;


@Component({
  selector: 'calendar',
  templateUrl: 'build/pages/calendar/calendar.html',
  providers: [CalendarService]
})
export class CalendarComponent {
  @ViewChild('mySlider') slider: Slides;
  private weekNames:Array<String>;
  private selectedDate:any;
  private weeks:Array<any> = [];
  private today:any;
  private events:Array<any> = [];
  private months:Array<any> = [];
  private slideOptions:any;
  constructor(private calendarService: CalendarService) {
    this.weekNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    this.today = moment();

  }

  setTimeToZero(dateLocal) {
    return dateLocal.day(0).hour(0).minute(0).second(0).millisecond(0);
  }

  createWeek(forDateObj) {
    let weekDays = [],count = 0;
    while(count < NUM_OF_DAYS) {
      weekDays.push(forDateObj);
      forDateObj = forDateObj.clone();
      forDateObj.add(1, 'd');
      count++;
    }
    return weekDays;
  }

  createMonth(monthObj,forMonthObj) {
    monthObj.weeks = [];
    let month = forMonthObj.clone(),done=true;

    while(done) {
      monthObj.weeks.push({ days: this.createWeek(month.clone()) });
      monthObj.weeks.push({});
      month.add(1, 'w');
      if(month.month() !== monthObj.selectedMonth.month()) {
        done=false;
      }
    }
  }

  initPrev(month){
    let monthObj = {};
    monthObj['selectedMonth'] = month;
    this.initMonth(monthObj);
    this.months.unshift(monthObj);
    this.months.pop();
  }

  initMonth(monthObj) {
    monthObj.selectedDate = monthObj.selectedMonth.clone();
    monthObj.current = monthObj.selectedDate.clone();
    let startMonth = monthObj.selectedDate.clone();
    startMonth.date(1);
    this.setTimeToZero(startMonth.day(0));
    this.createMonth(monthObj,startMonth);
    this.events = this.calendarService.getEvents(this.selectedDate);
  }

  init(month){
    let monthObj = {};
    monthObj['selectedMonth'] = month;
    this.initMonth(monthObj);
    this.months.push(monthObj);
  }


  //hack to initialize the Native Swiper with the slideOptions as Ionic does not handle it in beta.10 release
  updateSliderOnInit() {
    setTimeout(() => {
      let nativeSwiper = this.slider.getSlider();
      if(nativeSwiper){

        nativeSwiper.update();
        console.log('Active Index On Init:',nativeSwiper.activeIndex);
        if(nativeSwiper.activeIndex === 0) {
          nativeSwiper.slideTo(1, 0, false);
        }
      }
    },400);
  }

  ngOnInit() {
    this.slideOptions = {
        initialSlide:1
    };

    let currentMonth = moment();
    let prevMonth = currentMonth.clone().month(currentMonth.month() - 1);
    let nextMonth = currentMonth.clone().month(currentMonth.month() + 1);

    this.init(prevMonth);
    this.init(currentMonth);
    this.init(nextMonth);
    this.selectedDate = moment();
    this.updateSliderOnInit();
  }

  select(monthObj,day,rowIndex) {
    if(day.isSame(monthObj.selectedDate) && monthObj.selectedRowIndex !== -1){
      monthObj.selectedRowIndex = -1;
    } else {
      monthObj.selectedRowIndex = rowIndex;
    }
    monthObj.selectedDate = day;
    this.selectedDate = day;
    //CalendarService.getEvents(day); //Use this to fetch events for the selected day
  }

  handleSlideView(swiper) {
    let activeIndex = swiper.activeIndex;
    let activeMonth = this.months[activeIndex].selectedMonth;
    this.selectedDate = activeMonth;
    let nextMonth = activeMonth.clone().month(activeMonth.month() + 1);
    let prevMonth = activeMonth.clone().month(activeMonth.month() - 1);
    if(activeIndex === 0) {
      this.initPrev(prevMonth);
      swiper.slideTo(1, 0, false);
    } else if(activeIndex === (this.months.length - 1)) {
      this.init(nextMonth);
      this.months.shift();
      swiper.slideTo(this.months.length - 2, 0, false);
    }
  }

  onSlideChanged(swiper) {
    this.handleSlideView(swiper);
  }

}
