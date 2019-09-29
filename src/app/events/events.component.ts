import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {
  fs: any;
  dialog: any;
  process: any;

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

  constructor(private router: Router) {
    this.fs = (window as any).fs;
    this.dialog = (window as any).dialog;
    this.process = (window as any).process;

    this.eventList = (sessionStorage.getItem('eventList')) ? JSON.parse(sessionStorage.getItem('eventList')) : [];

    this.eventList = this.eventList.sort((a, b, ) => {
      return <any > parseInt(b.startTime.replace(":", "")) - parseInt(a.startTime.replace(":", ""));
    });
    this.eventList = this.eventList.sort((a, b) => {
      return <any > new Date(b.dateObj) - < any > new Date(a.dateObj);
    });

    let currentDateSS = JSON.parse(sessionStorage.getItem('currentDate'));
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


  GoLeft = function () {
    if (this.currentMonthId > 0) {
      this.currentMonthId--;
    } else if (this.currentMonthId == 0) {
      this.currentMonthId = 11;
      this.currentYear--;
    }
    this.currentMonth = this.months[this.currentMonthId];
    sessionStorage.setItem('currentDate', JSON.stringify({
      month: this.currentMonth,
      year: this.currentYear
    }));
  }

  GoRight = function () {
    if (this.currentMonthId < 11) {
      this.currentMonthId++;
    } else if (this.currentMonthId == 11) {
      this.currentMonthId = 0;
      this.currentYear++;
    }
    this.currentMonth = this.months[this.currentMonthId];
    sessionStorage.setItem('currentDate', JSON.stringify({
      month: this.currentMonth,
      year: this.currentYear
    }));
  }

  ToDetails = function (event) {
    sessionStorage.setItem('eventObj', JSON.stringify(event));
    this.router.navigate(['eventDetails']);
  }

  schoolYearFilter = function (event: any, filterYear: any) {
    if (filterYear == 'TODOS') {
      return true;
    } else {
      return (event.schoolYear == filterYear);
    }
  }

  monthFilter = function (event: any, filterDate: any) {
    let eventDate = new Date(event.dateObj);
    return (eventDate.getMonth() == filterDate[0] && eventDate.getFullYear() == filterDate[1]);
  }

  generateIcs = function(schoolYear, events) {
    var icsFile = 'BEGIN:VCALENDAR\n' + 
    'VERSION:2.0\n'+
    'X-WR-CALNAME:Examenes ' + schoolYear + '\n'+
    'CALSCALE:GREGORIAN\n'+
    'BEGIN:VTIMEZONE\n'+
    'TZID:America/Costa_Rica\n'+
    'TZURL:http://tzurl.org/zoneinfo-outlook/America/Costa_Rica\n'+
    'X-LIC-LOCATION:America/Costa_Rica\n'+
    'BEGIN:STANDARD\n'+
    'TZOFFSETFROM:-0600\n'+
    'TZOFFSETTO:-0600\n'+
    'TZNAME:CST\n'+
    'DTSTART:19700101T000000\n'+
    'END:STANDARD\n'+
    'END:VTIMEZONE\n';

    events.forEach(event => {
      var eventDateObj = new Date(event.dateObj);
      var eventDate = {
        year: eventDateObj.getFullYear(),
        month: eventDateObj.getMonth() + 1,
        day: eventDateObj.getDate(),
        startTime: event.startTime.replace(":","") + "00",
        endTime: event.endTime.replace(":","") + "00"
      };
      var tsStart = eventDate.year +
       ((eventDate.month<10) ? ('0' + eventDate.month) : (''+eventDate.month)) + 
       eventDate.day +
       "T" +
       eventDate.startTime;
      var tsEnd = eventDate.year +
       ((eventDate.month<10) ? ('0' + eventDate.month) : (''+eventDate.month)) + 
       eventDate.day +
       "T" +
       eventDate.endTime;

       icsFile += 'BEGIN:VEVENT\n' +
        'DTSTAMP:' + tsStart + 'Z\n' +
        'UID:' + tsStart + 'Z-daagonzalez.com\n' +
        'DTSTART;TZID=America/Costa_Rica:' + tsStart + '\n' +
        'DTEND;TZID=America/Costa_Rica:' + tsEnd + '\n' +
        'SUMMARY:' + event.subject + '\n' +
        'DESCRIPTION:' + event.comments + '\n' +
        'END:VEVENT\n';
    });
    icsFile += 'END:VCALENDAR';
    return icsFile;
  }

  SaveFile = function () {
    //# Ask for confirmation from the user
    Swal.fire({
      title: 'Guardar calendarios',
      text: 'Está seguro que quiere guardar ' + this.eventList.length + ' eventos?',
      type: 'question',
      confirmButtonText: 'Sí',
      showCancelButton: true,
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        //# Make the arrays for each school year
        var events10 =  [];
        var events11 =  [];
        var events12 =  [];

        this.eventList.forEach(event => {
          if (event.schoolYear == 10) {
            events10.push(event);
          } else if (event.schoolYear == 11) {
            events11.push(event);
          } else if (event.schoolYear == 12) {
            events12.push(event);
          }
        });

        //# Make the .ics files for each school year
        var filesToExport = [];
        if (events10.length > 0) {
          filesToExport.push({
            name: 'Examenes10.ics',
            contents: this.generateIcs(10, events10)
          });
        }
        if (events11.length > 0) {
          filesToExport.push({
            name: 'Examenes11.ics',
            contents: this.generateIcs(11, events11)
          });
        }
        if (events12.length > 0) {
          filesToExport.push({
            name: 'Examenes12.ics',
            contents: this.generateIcs(12, events12)
          });
        }

        let options = {
          title: "Escoja carpeta donde guardar los archivos",
          buttonLabel: "Guardar aquí",
          properties:["openDirectory"]
        }

        let dir = this.dialog.showOpenDialog(options);
        let directorySeparator = (this.process.platform === "win32") ? "\\" : "/";

        filesToExport.forEach(file => {
          this.fs.writeFileSync(dir + directorySeparator + file.name, file.contents, 'utf-8');          
        });
      }
    });
    
  }
}
