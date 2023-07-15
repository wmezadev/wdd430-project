import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlShortenerService } from '../url-shortener.service';
import { Url } from '../Url.model';
@Component({
  selector: 'app-url-item',
  templateUrl: './url-item.component.html',
  styleUrls: ['./url-item.component.css'],
})
export class UrlItemComponent implements OnInit {
  url!: Url | null;
  constructor(
    private urlShortenerService: UrlShortenerService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(async (params) => {
      const id = params['id'];
      this.url = await this.urlShortenerService.getUrl(id);
      console.log(this.url);
    });
  }
}
