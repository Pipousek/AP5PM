import {Component} from '@angular/core';
import {ApiService} from '../services/api/api.service';
import {MainQuote} from '../models/quote.model';
import {QuotesService} from '../services/quotes/quotes.service';
import {StorageService} from '../services/storage/storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  /**
   * Custom array
   */
  quotes: MainQuote[] = [];

  constructor(
    // get custom Service from DI
    private apiService: ApiService,
    private quotesService: QuotesService,
    private storageService: StorageService
  ) {
    this.initQuotes();
  }

  openDetail(quote: MainQuote) {
    this.quotesService.detail = quote;
  }

  deleteQuote(quote) {
    let index = this.quotes.indexOf(quote);
    if(index > -1) {
      this.quotes.splice(index, 1);
    }
    this.storageService.setData("quotes", this.quotes);
  }

  async generateQuote() {
    const newQuote = await this.apiService.getQuote();
    console.log(newQuote);
    console.log(newQuote);
    this.quotes.push(newQuote);
    this.storageService.setData("quotes", this.quotes);
  }

  private async initQuotes() {
    let quotes = await this.storageService.getData("quotes")
    if(quotes && quotes.length != 0) {
      this.quotes = quotes;
    }
    else {
      this.quotes.push(await this.apiService.getQuote());
      this.storageService.setData("quotes", this.quotes);
    }
  }
}
