import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Weather {
  private geoUrl = 'https://api.openweathermap.org/geo/1.0/direct';

  constructor(private http: HttpClient) {}

  getCoordinatesByCity(city: string) {
    const url = `${this.geoUrl}?q=${city}&limit=1&appid=${environment.openWeatherApiKey}`;
    return this.http.get<any[]>(url);
  }

  getCurrentWeatherByCity(city: string) {
    console.log('Llamando Geocoding API para:', city);

    this.getCoordinatesByCity(city).subscribe({
      next: (data) => {
        if (data.length === 0) {
          console.log('No se encontraron resultados');
          return;
        }

        const lat = data[0].lat;
        const lon = data[0].lon;

        console.log('Coordenadas obtenidas:', lat, lon);
      },
      error: (error) => {
        console.error('Error en Geocoding API', error);
      },
    });
  }

  getForecastByCity(city: string) {
    console.log('Geocoding para forecast:', city);

    this.getCoordinatesByCity(city).subscribe({
      next: (data) => {
        if (data.length === 0) {
          console.log('No se encontraron resultados');
          return;
        }

        const lat = data[0].lat;
        const lon = data[0].lon;

        console.log('Coordenadas obtenidas:', lat, lon);
      },
      error: (error) => {
        console.error('Error en Geocoding API', error);
      },
    });
  }
}
