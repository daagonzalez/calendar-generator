import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './eventDetails.component.html',
  styleUrls: ['./eventDetails.component.css']
})
export class EventDetailsComponent {
  subject = "";
  date = "";
  startTime = "";
  endTime = "";
  schoolYear = "";
  comments = "";
  id = -1;
  changes = false;

  constructor (private router: Router) {
    if (sessionStorage.getItem('eventObj')) {
      let eventObj = JSON.parse(sessionStorage.getItem('eventObj'));
      this.subject = eventObj.subject;
      this.date = eventObj.dateObj.substring(0,10);
      this.startTime = eventObj.startTime;
      this.endTime = eventObj.endTime;
      this.schoolYear = eventObj.schoolYear;
      this.comments = eventObj.comments;
      this.id = eventObj.id;
      this.changes = true;
      sessionStorage.removeItem('eventObj');
    }
  }

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
      comments: this.comments,
      id: -1
    };
    
    //## Get the array from sessionStorage
    var events = ( sessionStorage.getItem('eventList') )? JSON.parse(sessionStorage.getItem('eventList')) : [];

    //## Push the object into the array
    let titleDone = "";
    let questionDone = "";
    let confirmDone = "";
    let showCancelDone = true;
    let isQuestion = true;

    if (-1 == this.id ) {
      theEvent.id = events.length
      events.push(theEvent);

      titleDone = "¡Evento creado correctamente!";
      questionDone = "¿Quiere crear otro?";
      confirmDone = "Sí";
      showCancelDone = true;
    } else {
      theEvent.id = this.id;
      events[this.id] = theEvent;

      titleDone = "¡Evento guardado correctamente!";
      confirmDone = "Ok";
      showCancelDone = false;
      isQuestion = false;
    }

    //## Send the array back to sessionStorage
    sessionStorage.setItem('eventList', JSON.stringify(events));

    //# Ask the user whether they want to continue creating events or not
    Swal.fire({
      title: titleDone,
      text: questionDone,
      type: isQuestion ? 'question' : 'success',
      confirmButtonText: confirmDone,
      showCancelButton: showCancelDone,
      cancelButtonText: 'No'
    }).then((result) => {
      if (!isQuestion) {
        this.GoBack();
      } 
      else {
        if (result.value) {
          //# Reset the screen to create a new event
          this.subject = "";
          this.comments = "";
        }
        else {
          //# Go back to the main screen
          this.GoBack();
        }
      }
    });
  };

  DeleteData = function() {
     //# Ask the user whether they want to proceed
     Swal.fire({
      title: "¿Está seguro que desea eliminar este evento?",
      type: 'question',
      confirmButtonText: 'Sí',
      showCancelButton: true,
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        //# Get the array from sessionStorage
        var events = JSON.parse(sessionStorage.getItem('eventList'));
        
        //# Remove the item from the array
        events.splice(this.id,1);

        //# Send the array back to sessionStorage
        sessionStorage.setItem('eventList', JSON.stringify(events));

        //# Show a message to indicate success
        Swal.fire({
          title: "¡Evento eliminado correctamente!",
          type: 'success',
          confirmButtonText: 'Ok',
          showCancelButton: false
        });
        
        this.GoBack();
      }
    });
  }

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
