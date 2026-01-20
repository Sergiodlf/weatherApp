import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonSelect, IonSelectOption, IonInput, IonButton } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonSelect, IonSelectOption, IonInput, IonButton, FormsModule],
})
export class HomePage {

  locationType: string = '';
  cityName: string = '';

  constructor() {}

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
  }

  getForecast() {
  }
}
