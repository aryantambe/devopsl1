import { Component } from '@angular/core';
import { faCloudRain, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faLocation } from '@fortawesome/free-solid-svg-icons';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { WeatherService } from '../Services/weather.service';


@Component({
  selector: 'app-left-container',
  templateUrl: './left-container.component.html',
  styleUrl: './left-container.component.css'
})
export class LeftContainerComponent {
  faMagnifyingGlass:any = faMagnifyingGlass;
  faLocation:any = faLocation;
  faCloud:any = faCloud;
  faCloudRain:any = faCloudRain;

  constructor(public weatherService: WeatherService) {}
  onSearch(location: string) {
    this.weatherService.cityName = location;
    this.weatherService.getData();
  }
}