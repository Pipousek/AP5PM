import {Injectable} from '@angular/core';
import {MainQuote} from '../../models/quote.model';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  public detail: MainQuote = {
    sentence: "Sentence",
    character: {
      name: "Character name",
      slug: "Character nickname",
      house: {
        name: "Family name",
        slug: "Family nickname"
      }
    }
  };
}
