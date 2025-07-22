import { Component } from '@angular/core';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import { faFaceFrown } from '@fortawesome/free-solid-svg-icons';
import { WeatherService } from '../Services/weather.service';
@Component({
  selector: 'app-right-container',
  templateUrl: './right-container.component.html',
  styleUrl: './right-container.component.css'
})
export class RightContainerComponent {

  constructor(public weatherService: WeatherService){};

  //fa icons
  faThumbsUp:any = faThumbsUp;
  faThumbsDown:any = faThumbsDown;
  faFaceSmile:any = faFaceSmile;
  faFaceFrown:any = faFaceFrown;
//function to change tabs
  onTodayClick() {
    this.weatherService.today = true;
    this.weatherService.week = false;
  }
  onWeekClick() {
    this.weatherService.today = false;
    this.weatherService.week = true;
  }
  //function to control metric values
  onCelsiusClick() {
    this.weatherService.celsius = true;
    this.weatherService.fahrenheit = false;
  }
  onFahrenheitClick() {
    this.weatherService.celsius = false;
    this.weatherService.fahrenheit = true;
  }
} 
