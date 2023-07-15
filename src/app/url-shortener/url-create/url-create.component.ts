import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UrlShortenerService } from '../url-shortener.service';
import { Subscription } from 'rxjs';
import { Url } from '../Url.model';
@Component({
  selector: 'app-url-create',
  templateUrl: './url-create.component.html',
  styleUrls: ['./url-create.component.css'],
})
export class UrlCreateComponent implements OnInit {
  longUrl!: string;
  shortenedUrl!: string;
  subscription: Subscription = new Subscription();
  myForm!: FormGroup;

  constructor(
    private urlService: UrlShortenerService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.subscription = this.urlService.lastUrlChangedEvent.subscribe((url: Url) => {
      this.shortenedUrl = url.shortUrl;
    });
    this.myForm = this.formBuilder.group({
      longUrl: new FormControl('', [Validators.required, this.validateLink]),
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.myForm.get(fieldName);
    return Boolean(field?.invalid && (field?.dirty || field?.touched));
  }

  getValidationMessage(fieldName: string): string {
    const field = this.myForm.get(fieldName);

    if (field?.hasError('required')) {
      return 'This field is required';
    }
    if (field?.hasError('invalidLink')) {
      return 'Invalid link format';
    }

    return '';
  }

  validateLink(control: any): { [key: string]: boolean } | null {
    const linkPattern = /^(http|https):\/\/[^ "]+$/;

    if (control.value && !linkPattern.test(control.value)) {
      return { invalidLink: true };
    }

    return null;
  }

  submitForm() {
    if (this.myForm.valid) {
      // Submit longUrl
      this.urlService.shortenUrl(this.myForm.value.longUrl);
    } else {
      // Mark fields as touched to trigger validation messages
      this.myForm.markAllAsTouched();
    }
  }
}
