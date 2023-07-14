import { Component } from '@angular/core';

@Component({
  selector: 'app-url-create',
  templateUrl: './url-create.component.html',
  styleUrls: ['./url-create.component.css']
})
export class UrlCreateComponent {
  fullUrl!: string;
  shortenedUrl!: string;

  submitForm() {
    // Here, you can implement the logic to submit the full URL and get the shortened URL
    // This is just a placeholder code
    this.shortenedUrl = 'https://short.ly/abcd123';
  }
}
