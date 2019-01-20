import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apiKey='143dcef5824802684a726ff98d293ffa';
  url;
  constructor(private http:Http) {
    //this.url='http://api.openweathermap.org/data/2.5/units=metric'
    this.url='http://api.openweathermap.org/data/2.5/forecast?q='
  }

  getWeather(city, code){
    return this.http.get(this.url + city + ',' + code + '&APPID=' + this.apiKey+'&units=metric').pipe(map((response: any) => response.json()));
  }
}
