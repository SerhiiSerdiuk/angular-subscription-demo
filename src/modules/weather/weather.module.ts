import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { WeatherComponent } from './weather.component';
import { WeatherService } from './weather.service';
import { WeatherRoutingModule } from './weather-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    WeatherRoutingModule,
  ],
  providers: [WeatherService],
  declarations: [WeatherComponent]
})
export class WeatherModule { }
