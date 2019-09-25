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

    this.eventList = this.eventList.sort((a,b,) => {
      return <any>parseInt(b.startTime.replace(":","")) - parseInt(a.startTime.replace(":",""));
    });
    this.eventList = this.eventList.sort((a,b) => {
      return <any>new Date(b.dateObj) - <any>new Date(a.dateObj);
    });

    let currentDateSS = JSON.parse(sessionStorage.getItem('currentDate'));
    console.log(currentDateSS);
    if (currentDateSS) {
      this.currentMonth = currentDateSS.month;
      this.currentYear = currentDateSS.year;
    } else {
      if (this.eventList.length > 0) {
        let eventDateObj = new Date(this.eventList[0].dateObj);
        this.currentMonthId = eventDateObj.getMonth();
        this.currentMonth = this.months[this.currentMonthId];
        this.currentYear = eventDateObj.getFullYear();
      }
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
    sessionStorage.setItem('currentDate', JSON.stringify({month: this.currentMonth, year: this.currentYear}));
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
    sessionStorage.setItem('currentDate', JSON.stringify({month: this.currentMonth, year: this.currentYear}));
  }

  ToDetails = function(event) {
    sessionStorage.setItem('eventObj', JSON.stringify(event));
    this.router.navigate(['eventDetails']);
  }
  
  schoolYearFilter = function(event: any, filterYear: any) {
    if (filterYear == 'TODOS') {
      return true;
    } else {
      return (event.schoolYear == filterYear);
    }    
  }

  monthFilter = function(event: any, filterDate: any) {
    let eventDate = new Date(event.dateObj);
    return (eventDate.getMonth() == filterDate[0] && eventDate.getFullYear() == filterDate[1]);
  }
}
