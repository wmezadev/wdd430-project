import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlCreateComponent } from './url-shortener/url-create/url-create.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: UrlCreateComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
