import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslationObject } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(
    private translate: TranslateService,
    private http: HttpClient
  ) {
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');

    this.loadLanguage('es');
  }

  loadLanguage(lang: 'es' | 'en') {
    this.http.get<TranslationObject>(`/assets/i18n/${lang}.json`)
      .subscribe(translations => {
        this.translate.setTranslation(lang, translations, true);
        this.translate.use(lang);
      });
  }
}
