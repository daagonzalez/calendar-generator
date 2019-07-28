import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calendar-generator';
  currentMonth = "JUL";
  currentYear = 2019;

  schoolYears = [
    'TODOS',
    '10',
    '11',
    '12'
  ]
}
