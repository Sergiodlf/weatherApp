import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonSelect, IonSelectOption, IonInput, IonButton, IonText } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { Weather } from '../services/weather';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonSelect, IonSelectOption, IonInput, IonButton, IonText, FormsModule],
})
export class HomePage {

  locationType: string = '';
  cityName: string = '';
  showFormError: boolean = false;

  constructor(private weatherService: Weather) {}

  isFormValid(): boolean {
    if (!this.locationType) {
      return false;
    }

    if (this.locationType === 'city' && !this.cityName.trim()) {
      return false;
    }

    return true;
  }

  getCurrentWeather() {
    if (!this.isFormValid()){
      this.showFormError = true;
      return;
    }

    this.showFormError = false;

    if (this.locationType === 'city') {
      this.weatherService.getCurrentWeatherByCity(this.cityName);
    } else {
      // this.weatherService.getCurrentWeatherByLocation(40.7128, -74.0060); // Ejemplo de coordenadas
    }
  }

  getForecast() {
    if (!this.isFormValid()){
      this.showFormError = true;
      return;
    }

    this.showFormError = false;

    if (this.locationType === 'city') {
      this.weatherService.getForecastByCity(this.cityName);
    } else {
      // this.weatherService.getCurrentWeatherByLocation(40.7128, -74.0060); // Ejemplo de coordenadas
    }
  }
}
