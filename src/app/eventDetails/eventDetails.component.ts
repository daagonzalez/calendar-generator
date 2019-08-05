import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './eventDetails.component.html',
  styleUrls: ['./eventDetails.component.css']
})
export class EventDetailsComponent {
  title = 'calendar-generator';
  currentMonth = "JUL";
  currentYear = 2019;

  schoolYears = [
    'TODOS',
    '10',
    '11',
    '12'
  ];

  eventList = [{
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
