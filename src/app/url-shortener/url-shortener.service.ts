import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Url } from './Url.model';

@Injectable({
  providedIn: 'root',
})
export class UrlShortenerService {
  urls: Url[] = [];
  selectedUrl: Url | null = null;
  private apiUrl = 'http://localhost:3000/api/urls';
  lastUrlChangedEvent = new Subject<Url>();
  selectedUrlChangedEvent = new Subject<Url | null>();
  urlListChangedEvent = new Subject<Url[]>();

  constructor(private http: HttpClient) {
    this.urls = [];
  }

  shortenUrl(originalUrl: string) {
    if (!originalUrl) {
      return;
    }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post<{ message: string; data: Url }>(this.apiUrl, { originalUrl }, { headers }).subscribe({
      next: (response) => {
        this.urls.push(response.data);
        this.lastUrlChangedEvent.next(response.data);
        this.sortAndUpdateUrls();
      },
      error: (error: any) => {
        console.error('Error adding URL:', error);
      },
    });
  }

  resetUrlClicks(url: Url) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .put<{ message: string; data: Url }>(`${this.apiUrl}/${url.id}`, { clicksCounter: 0 }, { headers })
      .subscribe({
        next: (response) => {
          this.selectedUrl = response.data;
          this.selectedUrlChangedEvent.next(this.selectedUrl);
        },
        error: (error: any) => {
          console.error('Error adding URL:', error);
        },
      });
  }

  getUrls() {
    this.http.get<{ message: string; data: Url[] }>(this.apiUrl).subscribe({
      next: (response) => {
        this.urls = response.data;
        this.sortAndUpdateUrls();
      },
    });
  }

  getUrl(id: string) {
    if (id) {
      this.http.get<{ message: string; data: Url }>(`${this.apiUrl}/${id}`).subscribe({
        next: (response) => {
          this.selectedUrl = response.data;
          this.selectedUrlChangedEvent.next(this.selectedUrl);
        },
        error: (error: any) => {
          console.error('An error occurred:', error);
        },
      });
    }
  }

  deleteUrl(url: Url): void {
    this.http.delete<{ message: string; url: Url }>(`${this.apiUrl}/${url.id}`).subscribe({
      next: (response) => {
        this.selectedUrl = null;
        this.selectedUrlChangedEvent.next(this.selectedUrl);
      },
      error: (error: any) => {
        console.error('An error occurred:', error);
      },
    });
  }

  sortAndUpdateUrls(): void {
    // Sort the urls array by createdAt in descending order
    this.urls.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    // Update service event
    this.urlListChangedEvent.next(this.urls.slice());
  }
}
