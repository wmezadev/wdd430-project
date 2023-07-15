import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlShortenerService } from '../url-shortener.service';
import { Url } from '../Url.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-url-item',
  templateUrl: './url-item.component.html',
  styleUrls: ['./url-item.component.css'],
})
export class UrlItemComponent implements OnInit {
  url!: Url | null;
  subscription: Subscription = new Subscription();

  constructor(
    private urlService: UrlShortenerService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(async (params) => {
      const id = params['id'];
      this.urlService.getUrl(id);
    });
    this.subscription = this.urlService.selectedUrlChangedEvent.subscribe((url: Url) => {
      this.url = url;
    });
  }

  async onResetClicks() {
    if (this.url) {
      this.urlService.resetUrlClicks(this.url);
    }
  }
}
