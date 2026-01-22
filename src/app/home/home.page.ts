import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonButton,
  IonText,
  IonButtons
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { Weather } from '../services/weather';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonInput,
    IonButton,
    IonText,
    IonButtons,
    FormsModule,
    TranslateModule,
  ],
})
export class HomePage {
  locationType: string = '';
  cityName: string = '';
  showFormError: boolean = false;
  sinUbicacion: boolean = false;
  currentWeather: any | null = null;
  forecast: any[] = [];

  constructor(
    private appComponent: AppComponent,
    private weatherService: Weather,
    private router: Router,
  ) {}

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
    this.sinUbicacion = false;

    if (!this.isFormValid()) {
      this.showFormError = true;
      return;
    }

    this.showFormError = false;

    if (this.locationType === 'city') {
      this.router.navigate(['/results'], {
        state: {
          type: 'current',
          mode: 'city',
          city: this.cityName,
        },
      });
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.router.navigate(['/results'], {
            state: {
              type: 'current',
              mode: 'location',
              lat: position.coords.latitude,
              lon: position.coords.longitude,
              city: ' tu ubicación actual',
            },
          });
        },
        () => {
          this.sinUbicacion = true;
        },
      );
    }
  }

  getForecast() {
    this.sinUbicacion = false;

    if (!this.isFormValid()) {
      this.showFormError = true;
      return;
    }

    this.showFormError = false;

    if (this.locationType === 'city') {
      this.router.navigate(['/results'], {
        state: {
          type: 'forecast',
          mode: 'city',
          city: this.cityName,
        },
      });
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.router.navigate(['/results'], {
            state: {
              type: 'forecast',
              mode: 'location',
              lat: position.coords.latitude,
              lon: position.coords.longitude,
              city: ' tu ubicación actual',
            },
          });
        },
        () => {
          this.sinUbicacion = true;
        },
      );
    }
  }

  onLocationTypeChange() {
    this.showFormError = false;
    this.sinUbicacion = false;

    // Limpiar ciudad al cambiar opción
    if (this.locationType !== 'city') {
      this.cityName = '';
    }
  }

  changeLanguage(lang: 'es' | 'en') {
    this.appComponent.loadLanguage(lang);
  }
}
