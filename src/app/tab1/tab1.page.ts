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

  /**
   * Opens detail page of selected quote
   * 
   * @param quote Selected quote
   */
  openDetail(quote: MainQuote) {
    this.quotesService.detail = quote;
  }

  /**
   * Delete a selected @quote
   * 
   * @param quote Quote to delete
   * @index Index of quote to delete
   */
  deleteQuote(quote) {
    let index = this.quotes.indexOf(quote);
    if(index > -1) {
      this.quotes.splice(index, 1);
    }
    this.storageService.setData("quotes", this.quotes);
  }

  /**
   * Generates a new Quote, push it to array @quotes
   * and store it to local storage using storageService
   * 
   * @newQuote Const where new quote from API is stored
   */
  async generateQuote() {
    const newQuote = await this.apiService.getQuote();
    this.quotes.push(newQuote);
    this.storageService.setData("quotes", this.quotes);

    // Use for debugging
    //console.log(newQuote);
    //console.log(newQuote);
  }

  /**
   * Initialization at the start
   * Load local storage into variable @quotes
   * If @quotes is empty, generate new quote from API,
   * push it into array @quotes and store it into local storage
   * 
   * @quotes Array with quotes
   */
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
