import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { WeatherData } from '../models/weather';

@Injectable({
  providedIn: 'root',
})
export class Weather {
  private geoUrl = 'https://api.openweathermap.org/geo/1.0/direct';
  private forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
  private currentUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  // ---------- GEOCODING ----------
  private getCoordinatesByCity(city: string) {
    const url = `${this.geoUrl}?q=${city}&limit=1&appid=${environment.openWeatherApiKey}`;
    return this.http.get<any[]>(url);
  }

  // ---------- CURRENT ----------
  private getCurrent(lat: number, lon: number) {
    const url = `${this.currentUrl}?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${environment.openWeatherApiKey}`;
    return this.http.get<any>(url);
  }

  // ---------- FORECAST ----------
  private getForecast(lat: number, lon: number) {
    const url = `${this.forecastUrl}?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${environment.openWeatherApiKey}`;
    return this.http.get<any>(url);
  }

  // ---------- PUBLIC ----------
  getCurrentWeatherByCity(city: string) {
    this.getCoordinatesByCity(city).subscribe({
      next: (geo) => {
        if (!geo.length) {
          console.log('Ciudad no encontrada');
          return;
        }

        const { lat, lon, name } = geo[0];

        this.getCurrent(lat, lon).subscribe({
          next: (data) => {
            const weather: WeatherData = {
              date: new Date().toISOString(),
              temp: data.main.temp,
              wind: data.wind.speed,
              rain: data.rain?.['1h'] ?? 0,
              icon: data.weather[0].icon,
              description: data.weather[0].description,
            };

            console.log('Tiempo actual:', weather);
          },
        });
      },
    });
  }

  getForecastByCity(city: string) {
    this.getCoordinatesByCity(city).subscribe({
      next: (geo) => {
        if (!geo.length) {
          console.log('Ciudad no encontrada');
          return;
        }

        const { lat, lon } = geo[0];

        this.getForecast(lat, lon).subscribe({
          next: (data) => {
            const forecast: WeatherData[] = data.list.map((item: any) => ({
              date: item.dt_txt,
              temp: item.main.temp,
              wind: item.wind.speed,
              rain: item.rain?.['3h'] ?? 0,
              icon: item.weather[0].icon,
              description: item.weather[0].description,
            }));

            console.log('Forecast 5 días:', forecast);
          },
        });
      },
    });
  }
}
