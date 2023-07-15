import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UrlCreateComponent } from './url-shortener/url-create/url-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { UrlListComponent } from './url-shortener/url-list/url-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UrlItemComponent } from './url-shortener/url-item/url-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    UrlCreateComponent,
    HeaderComponent,
    UrlListComponent,
    DashboardComponent,
    UrlItemComponent,
    HomeComponent,
    FooterComponent,
  ],
  imports: [AppRoutingModule, BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
