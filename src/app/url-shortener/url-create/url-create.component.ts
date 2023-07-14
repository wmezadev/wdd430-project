import { Component, OnInit } from '@angular/core';
import { UrlShortenerService } from '../url-shortener.service';
import { Subscription } from 'rxjs';
import { Url } from '../Url.model';
@Component({
  selector: 'app-url-create',
  templateUrl: './url-create.component.html',
  styleUrls: ['./url-create.component.css']
})
export class UrlCreateComponent {
  fullUrl!: string;
  shortenedUrl!: string;
  subscription: Subscription = new Subscription();

  constructor(private urlService: UrlShortenerService) { }

  ngOnInit() {
    this.subscription = this.urlService.lastUrlChangedEvent.subscribe(
      (url: Url) => {
        this.shortenedUrl = url.shortUrl;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  submitForm() {
    // Here, you can implement the logic to submit the full URL and get the shortened URL
    // This is just a placeholder code
    this.urlService.shortenUrl(this.fullUrl);
  }
}
