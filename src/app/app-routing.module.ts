import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewPostComponent } from './review-post/review-post.component';
import { MainComponent } from './main/main.component';
import { GedConsultingComponent } from './ged-consulting/ged-consulting.component';
import { GedConversionComponent } from './ged-conversion/ged-conversion.component';
import { RequestForConsultingComponent } from './request-for-consulting/request-for-consulting.component';
import { ManagementComponent } from './management/management.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'reviews', component: ReviewsComponent },
  { path: 'review/post', component: ReviewPostComponent },
  { path: 'ged/consulting', component: GedConsultingComponent },
  { path: 'ged/conversion', component: GedConversionComponent },
  { path: 'request/consulting', component: RequestForConsultingComponent },
  { path: 'admin', component: ManagementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
