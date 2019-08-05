import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './eventDetails.component.html',
  styleUrls: ['./eventDetails.component.css']
})
export class EventDetailsComponent {
  subject = "";
  date = new Date();
  startTime = "";
  endTime = "";
  schoolYear = "";
  comments = "";

  GetEventDate = function () {
    let theDate = new Date(this.date);
    let months = [
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
    return (((theDate.getDate()+1) < 10) ? "0" + (theDate.getDate()+1) : (theDate.getDate())+1) + " " + months[theDate.getMonth()];
  }

  SaveData = function () {
    let theEvent = {
      date: this.GetEventDate(),
      subject: this.subject,
      startTime: this.startTime,
      endTime: this.endTime,
      schoolYear: this.schoolYear,
      comments: this.comments
    }
    console.log(theEvent);
  };

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
    }
  ];
}
