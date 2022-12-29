import {Component, OnInit} from '@angular/core';
import {PlacesService} from '../../services/places/places.service';
import {MainQuote} from "../../models/weather.model";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  quote: MainQuote;

  constructor(
    private placesService: PlacesService
  ) {
  }

  ngOnInit() {
    this.quote = this.placesService.detail;
  }

}
