import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {MainQuote} from '../../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  /**
   * Get weather from API
   *
   */
  getQuote(): Observable<MainQuote> {
    return this.http.get<MainQuote>(environment.api.baseUrl);
  }
}
