import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {MainQuote} from '../../models/quote.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  /**
   * Get quote from API
   *
   */
  getQuote(): Promise<MainQuote> {
    return this.http.get<MainQuote>(environment.api.baseUrl).toPromise();
  }
}
