import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './eventDetails.component.html',
  styleUrls: ['./eventDetails.component.css']
})
export class EventDetailsComponent {
  constructor (private router: Router) {}
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
    //# Save the event in sessionStorage
    
    //## Create the event object
    let theEvent = {
      date: this.GetEventDate(),
      dateObj: new Date(this.date),
      subject: this.subject,
      startTime: this.startTime,
      endTime: this.endTime,
      schoolYear: this.schoolYear,
      comments: this.comments
    };

    //## Get the array from sessionStorage
    var events = ( sessionStorage.getItem('eventList') )? JSON.parse(sessionStorage.getItem('eventList')) : [];

    //## Push the object into the array
    events.push(theEvent);

    //## Send the array back to sessionStorage
    sessionStorage.setItem('eventList', JSON.stringify(events));

    //# Ask the user whether they want to continue creating events or not
    Swal.fire({
      title: '¡Evento creado correctamente!',
      text: '¿Quiere crear otro?',
      type: 'question',
      confirmButtonText: 'Sí',
      showCancelButton: true,
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        //# Reset the screen to create a new event
        this.subject = "";
        this.comments = "";
      }
      else {
        //# Go back to the main screen
        this.GoBack();
      }
    });
  };

  addHours = function(originTime, amount) {
    if (!this.endTime) {
      var newTime = originTime.split(':');
      newTime[0] = '' + (parseInt(newTime[0]) + amount);
      newTime[0] = (newTime[0].length == 1) ? '0' + newTime[0] : newTime[0];
      this.endTime = newTime.join(':');

    }
  }

  GoBack = function() {
    this.router.navigate(['events']);
  }
}
