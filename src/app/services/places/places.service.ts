import {Injectable} from '@angular/core';
import {MainQuote} from '../../models/weather.model';
import {StorageService} from '../storage/storage.service';
import {ReplaySubject} from "rxjs";

export interface Place {
  latitude: number;
  longitude: number;
  name: string;
  homepage: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public detail: MainQuote = {
    sentence: "Sentence",
    character: {
      name: "Character name",
      slug: "Character race",
      house: {
        name: "House name",
        slug: "Family tree"
      }
    }
  };

  private privatePlaces: Place[] = [
    {
      latitude: 28.6472799,
      longitude: 28.6472799,
      name: 'Dehli, India',
      homepage: true
    },
    {
      latitude: -5.7759362,
      longitude: 106.1174957,
      name: 'Jakarta, Indonesia',
      homepage: false
    },
    {
      latitude: 51.5287718,
      longitude: -0.2416815,
      name: 'London, UK',
      homepage: false
    },
    {
      latitude: 40.6976701,
      longitude: -74.2598666,
      name: 'New York, USA',
      homepage: false
    },
    {
      latitude: 48.8589507,
      longitude: 2.2770202,
      name: 'Paris, France',
      homepage: false
    },
    {
      latitude: 37.757815,
      longitude: -122.5076401,
      name: 'San Francisco, USA',
      homepage: false
    }
  ];

  private privateServiceSubject = new ReplaySubject<Place[]>(1);

  constructor(
    private storageService: StorageService
  ) {
    this.init();
  }

  get places$() {
    return this.privateServiceSubject.asObservable();
  }

  /**
   * Init places from storage
   */
  async init() {
    let places = await this.storageService.getData('places');
    if (!places) {
      places = this.privatePlaces;
    }
    this.privateServiceSubject.next(places);
  }

  /**
   * Set active on home
   *
   * @param index
   * @param active
   */
  async setHomepage(index: number, active: boolean) {
    this.privatePlaces[index].homepage = active;
    await this.storageService.setData('places', this.privatePlaces);
    this.privateServiceSubject.next(this.privatePlaces);
  }

}
