import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Url } from './Url.model';

@Injectable({
  providedIn: 'root',
})
export class UrlShortenerService {
  urls: Url[] = [];
  private apiUrl = 'http://localhost:3000/api/urls';
  lastUrlChangedEvent = new Subject<Url>();
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
    if (!url) {
      return;
    }
    const index = this.urls.findIndex((d) => d.id === url.id);
    if (index === -1) {
      return;
    }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .put<{ message: string; data: Url }>(`${this.apiUrl}/${url.id}`, { clicksCounter: 0 }, { headers })
      .subscribe({
        next: (response) => {
          this.urls[index] = response.data;
          this.sortAndUpdateUrls();
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
      error: (error: any) => {
        console.error('An error occurred:', error);
      },
    });
  }

  async getUrl(id: string): Promise<Url | null> {
    try {
      const response = await this.http.get<{ message: string; data: Url }>(`${this.apiUrl}/${id}`).toPromise();
      return response?.data || null;
    } catch (error) {
      console.error('An error occurred:', error);
      return null;
    }
  }

  deleteUrl(url: Url): void {
    if (!url) {
      return;
    }
    const index = this.urls.findIndex((d) => d.id === url.id);
    if (index === -1) {
      return;
    }
    this.http.delete<{ message: string; url: Url }>(`${this.apiUrl}/${url.id}`).subscribe((response) => {
      this.urls.splice(index, 1);
      this.sortAndUpdateUrls();
    });
  }

  sortAndUpdateUrls(): void {
    // Sort the urls array by createdAt in descending order
    this.urls.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    // Update service event
    this.urlListChangedEvent.next(this.urls.slice());
  }
}
