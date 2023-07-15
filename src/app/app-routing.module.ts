import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlListComponent } from './url-shortener/url-list/url-list.component';
import { UrlCreateComponent } from './url-shortener/url-create/url-create.component';

const routes: Routes = [
  {
    path: '',
    component: UrlCreateComponent,
  },
  {
    path: 'dashboard',
    component: UrlListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
