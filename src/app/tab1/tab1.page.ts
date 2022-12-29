import {Component} from '@angular/core';
import {ApiService} from '../services/api/api.service';
import {Observable} from 'rxjs';
import {MainQuote} from '../models/weather.model';
import {ModalController} from '@ionic/angular';
import {SettingsPage} from '../pages/settings/settings.page';
import {PlacesService} from '../services/places/places.service';
import {StorageService} from '../services/storage/storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  /**
   * Custom observable array
   */
  quote$: Observable<MainQuote>[] = [];

  constructor(
    // get custom Service from DI
    private apiService: ApiService,
    private modalCtrl: ModalController,
    private placesService: PlacesService,
    private storageService: StorageService
  ) {
    this.initWeather();
  }

  /**
   * Click event
   */
  openSettings() {
    this.openModal();
  }

  /**
   * Open Ionic modal
   */
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: SettingsPage,
    });

    await modal.present();
  }

  openDetail(quote: MainQuote) {
    // set weather detail
    this.placesService.detail = quote;
  }

  deleteQuote() {
    alert("Delete");
  }

  generateQuote() {
    let newQuote = this.apiService.getQuote();
    this.quote$.push(newQuote);
    this.storageService.setData("quotes", newQuote);
  }

  /**
   * Init weather for homepage cards
   *
   * @private
   */
  private initWeather() {
    // loop all places
    this.placesService.places$.subscribe(places => {
      this.quote$ = [];
      places.forEach(place => {
        if (place.homepage) {
          this.quote$.push(this.apiService.getQuote());
        }
      });
    });
  }
}
