import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Weather {
  constructor() {}

  getCurrentWeatherByCity(city: string) {
  }

  getForecastByCity(city: string) {
  }

  getCurrentWeatherByLocation(lat: number, lon: number) {
  }

  getForecastByLocation(lat: number, lon: number) {
  }
}
