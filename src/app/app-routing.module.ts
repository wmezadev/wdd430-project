import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlCreateComponent } from './url-shortener/url-create/url-create.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UrlItemComponent } from './url-shortener/url-item/url-item.component';
import { UrlListComponent } from './url-shortener/url-list/url-list.component';

const routes: Routes = [
  {
    path: '',
    component: UrlCreateComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'urls',
        component: UrlListComponent,
      },
      {
        path: 'urls/:id',
        component: UrlItemComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
