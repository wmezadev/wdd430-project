import { Component, OnInit } from '@angular/core';
import { UrlShortenerService } from '../url-shortener.service';
import { Subscription } from 'rxjs';
import { Url } from '../Url.model';
@Component({
  selector: 'app-url-list',
  templateUrl: './url-list.component.html',
  styleUrls: ['./url-list.component.css'],
})
export class UrlListComponent implements OnInit {
  urls: Url[] = [];
  subscription: Subscription = new Subscription();

  constructor(private urlService: UrlShortenerService) {}

  ngOnInit() {
    this.subscription = this.urlService.urlListChangedEvent.subscribe((urls: Url[]) => {
      this.urls = urls;
    });
  }
}
