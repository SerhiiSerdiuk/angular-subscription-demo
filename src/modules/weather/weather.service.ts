import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { CurrentWeather } from './weather.model';

const API_KEY = '7bb628883fb7ccb3e83a4643cfe14995';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private triggerFetchingCurrentWeather = new Subject<string>();
  public currentWeather$: Observable<CurrentWeather>;

  private state = new BehaviorSubject<Record<string, any>>({});
  public state$ = this.state.asObservable();

  constructor(private readonly http: HttpClient) {
    this.currentWeather$ = this.triggerFetchingCurrentWeather
      .asObservable()
      .pipe(
        switchMap((cityName: string) =>
          this.getCurrentWeather(cityName).pipe(
            finalize(() => {
              this.updateState({ loading: false });
            })
          )
        )
      );
  }

  private getCurrentWeather(cityName: string): Observable<CurrentWeather> {
    return this.http.get<CurrentWeather>(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
    );
  }

  public updateState(state: Record<string, any>): void {
    this.state.next({
      ...this.state.getValue(),
      ...state,
    });
  }

  public fetchCurrentWeather(cityName: string): void {
    if (cityName) {
      this.updateState({ loading: true });
      this.triggerFetchingCurrentWeather.next(cityName);
    }
  }
}
