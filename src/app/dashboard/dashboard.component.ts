import { Component } from '@angular/core';
import { UrlShortenerService } from '../url-shortener/url-shortener.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private urlService: UrlShortenerService) {}

  ngOnInit() {
    this.urlService.getUrls();
  }
}
