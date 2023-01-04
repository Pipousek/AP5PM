import {Component, OnInit} from '@angular/core';
import {QuotesService} from '../../services/quotes/quotes.service';
import {MainQuote} from "../../models/quote.model";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  quote: MainQuote;

  constructor(
    private quotesService: QuotesService
  ) {
  }

  ngOnInit() {
    this.quote = this.quotesService.detail;
  }

}
