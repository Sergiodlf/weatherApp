import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonList,
  IonThumbnail,
  IonBackButton,
  IonButtons,
  IonText,
} from '@ionic/angular/standalone';
import { Weather } from '../../services/weather';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonList,
    IonThumbnail,
    IonBackButton,
    IonButtons,
    TranslateModule,
    IonText,
  ],
})
export class ResultsPage {
  type: 'current' | 'forecast' = 'current';
  city = '';
  mode: 'city' | 'location' = 'city';
  lat!: number;
  lon!: number;

  currentWeather: any = null;
  forecast: any[] = [];

  constructor(private weatherService: Weather) {
    const nav = history.state;
    this.type = nav.type;
    this.mode = nav.mode;
    this.city = nav.city;
    this.lat = nav.lat;
    this.lon = nav.lon;
  }

  // Cargar datos al entrar en la página
  ionViewWillEnter() {
    if (this.type === 'current') {
      this.loadCurrent();
    } else {
      this.loadForecast();
    }
  }

  // Cargar información actual
  loadCurrent() {
    if (this.mode === 'city') {
      this.weatherService
        .getCurrentWeatherByCity(this.city)
        .subscribe((data) => (this.currentWeather = data));
    } else {
      this.weatherService
        .getCurrentWeatherByLocation(this.lat, this.lon)
        .subscribe(
          (data) =>
            (this.currentWeather = {
              temp: data.main.temp,
              wind: data.wind.speed,
              rain: data.rain?.['1h'] ?? 0,
              icon: data.weather[0].icon,
              description: data.weather[0].description,
            }),
        );
    }
  }

  // Cargar pronóstico
  loadForecast() {
    if (this.mode === 'city') {
      this.weatherService
        .getForecastByCity(this.city)
        .subscribe((data) => (this.forecast = data));
    } else {
      this.weatherService
        .getForecastByLocation(this.lat, this.lon)
        .subscribe((data) => {
          this.forecast = data.list.map((item: any) => ({
            date: item.dt_txt,
            temp: item.main.temp,
            wind: item.wind.speed,
            rain: item.rain?.['3h'] ?? 0,
            icon: item.weather[0].icon,
            description: item.weather[0].description,
          }));
        });
    }
  }
}
