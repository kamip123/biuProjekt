import { Component, OnInit } from '@angular/core';
import {WeatherService} from "../weather.service";

@Component({
  selector: 'app-weather-api',
  templateUrl: './weather-api.component.html',
  styleUrls: ['./weather-api.component.css']
})
export class WeatherApiComponent implements OnInit {

  location={
    city:'gdansk',
    code:'pl'
  }

  weather:any;
  value:any;

  constructor(private weatherService:WeatherService) { }

  ngOnInit() {

    this.value = localStorage.getItem('location');
    if (this.value!=null){
      this.location=JSON.parse(this.value);
    }else {
      this.location={
        city:'gdansk',
        code:'pl'

      }
    }

    this.weatherService.getWeather(this.location.city, this.location.code).subscribe((response)=>{
      console.log(response);
      this.weather=response;
    });
  }

}
