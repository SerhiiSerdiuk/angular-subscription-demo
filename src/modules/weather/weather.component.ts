import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrentWeather } from './weather.model';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  public currentWeather$: Observable<CurrentWeather>;
  public state$: Observable<Record<string, any>>;

  constructor(private readonly weather: WeatherService) {
    this.currentWeather$ = this.weather.currentWeather$;
    this.state$ = this.weather.state$;
  }

  public ngOnInit(): void {}

  public updateCurrentWeather(cityName: string): void {
    this.weather.fetchCurrentWeather(cityName);
  }
}
