import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlShortenerService } from '../url-shortener.service';
import { Url } from '../Url.model';
import { Subscription } from 'rxjs';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-url-item',
  templateUrl: './url-item.component.html',
  styleUrls: ['./url-item.component.css'],
})
export class UrlItemComponent implements OnInit {
  url!: Url;
  subscription: Subscription = new Subscription();
  faTrash = faTrash;
  faRotateLeft = faRotateLeft;

  constructor(
    private urlService: UrlShortenerService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(async (params) => {
      const id = params['id'];
      this.urlService.getUrl(id);
    });
    this.subscription = this.urlService.selectedUrlChangedEvent.subscribe((url) => {
      if (url === null) {
        this.router.navigate(['/dashboard/urls']);
      } else {
        this.url = url;
      }
    });
  }

  onResetClicks() {
    if (this.url) {
      this.urlService.resetUrlClicks(this.url);
    }
  }

  onDeleteUrl() {
    if (this.url) {
      this.urlService.deleteUrl(this.url);
    }
  }
}
