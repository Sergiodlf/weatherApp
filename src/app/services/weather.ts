import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { WeatherData } from '../models/weather';
import { Observable, switchMap, map } from 'rxjs';

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
  getCurrentWeatherByCity(city: string): Observable<any> {
    return this.getCoordinatesByCity(city).pipe(
      switchMap((geo) => {
        if (!geo.length) {
          throw new Error('Ciudad no encontrada');
        }
        const { lat, lon } = geo[0];
        return this.getCurrent(lat, lon);
      }),
      map((data) => ({
        temp: data.main.temp,
        wind: data.wind.speed,
        rain: data.rain?.['1h'] ?? 0,
        icon: data.weather[0].icon,
        description: data.weather[0].description,
      })),
    );
  }

  getForecastByCity(city: string): Observable<any[]> {
    return this.getCoordinatesByCity(city).pipe(
      switchMap((geo) => {
        if (!geo.length) {
          throw new Error('Ciudad no encontrada');
        }
        const { lat, lon } = geo[0];
        return this.getForecast(lat, lon);
      }),
      map((data) =>
        data.list.map((item: any) => ({
          date: item.dt_txt,
          temp: item.main.temp,
          wind: item.wind.speed,
          rain: item.rain?.['3h'] ?? 0,
          icon: item.weather[0].icon,
          description: item.weather[0].description,
        })),
      ),
    );
  }
}
