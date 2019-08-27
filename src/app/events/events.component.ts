import { Component } from '@angular/core';

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
    'JUL',
    'AGO',
    'SEP',
    'OCT',
    'NOV',
    'DEC'
  ];

  title = 'calendar-generator';
  currentMonth = this.months[new Date().getMonth()];
  currentYear = new Date().getFullYear();
  eventList = [];

  constructor () {
    this.eventList = (sessionStorage.getItem('eventList')) ? JSON.parse(sessionStorage.getItem('eventList')) : [];

    if (this.eventList.length > 0) {
      let eventDateObj = new Date(this.eventList[0].dateObj);
      this.currentMonth = this.months[eventDateObj.getMonth()];
      this.currentYear = eventDateObj.getFullYear();
    }
  }

  schoolYears = [
    'TODOS',
    '10',
    '11',
    '12'
  ];


  GoLeft = function() {
    this.eventList = [{
      date: '26 MAR',
      subject: 'Español',
      startTime: '7 am',
      endTime: '9 am',
      schoolYear: '10',
      comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      date: '27 MAR',
      subject: 'Matemática',
      startTime: '7 am',
      endTime: '9 am',
      schoolYear: '10',
      comments: ''
    },
    {
      date: '28 MAR',
      subject: 'Estudios Sociales',
      startTime: '7 am',
      endTime: '9 am',
      schoolYear: '10',
      comments: ''
    }];
  }
}
