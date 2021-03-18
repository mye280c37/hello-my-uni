import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReviewsComponent } from './reviews/reviews.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'reviews', component: ReviewsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
