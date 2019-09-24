import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {
  months = [
    'ENE',
    'FEB',
    'MAR',
    'ABR',
    'MAY',
    'JUN',
    'JUL   ',
    'AGO',
    'SEP',
    'OCT',
    'NOV',
    'DEC'
  ];

  title = 'calendar-generator';
  currentMonthId = new Date().getMonth();
  currentMonth = this.months[this.currentMonthId];
  currentYear = new Date().getFullYear();
  eventList = [];

  constructor (private router: Router) {
    this.eventList = (sessionStorage.getItem('eventList')) ? JSON.parse(sessionStorage.getItem('eventList')) : [];

    if (this.eventList.length > 0) {
      let eventDateObj = new Date(this.eventList[0].dateObj);
      this.currentMonthId = eventDateObj.getMonth();
      this.currentMonth = this.months[this.currentMonthId];
      this.currentYear = eventDateObj.getFullYear();
    }
  }

  schoolYears = [
    'TODOS',
    '10',
    '11',
    '12'
  ];

  schoolYearSelected = 'TODOS';


  GoLeft = function() {
    if (this.currentMonthId > 0) {
      this.currentMonthId--;
    }
    else if (this.currentMonthId == 0) {
      this.currentMonthId = 11;
      this.currentYear--;
    }
    this.currentMonth = this.months[this.currentMonthId];
  }

  GoRight = function() {
    if (this.currentMonthId < 11) {
      this.currentMonthId++;
    }
    else if (this.currentMonthId == 11) {
      this.currentMonthId = 0;
      this.currentYear++;
    }
    this.currentMonth = this.months[this.currentMonthId];
  }

  ToDetails = function(event) {
    sessionStorage.setItem('eventObj', JSON.stringify(event));
    this.router.navigate(['eventDetails']);
  }

  schoolYearFilter = function(event: any, filterx: any) {
    if (filterx == 'TODOS') {
      return true;
    } else {
      return (event.schoolYear == filterx);
    }    
  }
}
