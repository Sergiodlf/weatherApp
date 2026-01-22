import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonList, IonThumbnail, IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { Weather } from '../../services/weather';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonList, IonThumbnail, IonBackButton, IonButtons]
})
export class ResultsPage {

  type: 'current' | 'forecast' = 'current';
  city = '';

  currentWeather: any = null;
  forecast: any[] = [];

  constructor(private weatherService: Weather) {
    const nav = history.state;
    this.type = nav.type;
    this.city = nav.city;
  }

  ionViewWillEnter() {
    if (this.type === 'current') {
      this.loadCurrent();
    } else {
      this.loadForecast();
    }
  }

  loadCurrent() {
    this.weatherService.getCurrentWeatherByCity(this.city)
      .subscribe(data => this.currentWeather = data);
  }

  loadForecast() {
    this.weatherService.getForecastByCity(this.city)
      .subscribe(data => this.forecast = data);
  }
}
