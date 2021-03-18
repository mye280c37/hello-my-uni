import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReviewsComponent } from './reviews/reviews.component';
import { MainComponent } from './main/main.component';
import { GedConsultingComponent } from './ged-consulting/ged-consulting.component';
import { GedConversionComponent } from './ged-conversion/ged-conversion.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'reviews', component: ReviewsComponent },
  { path: 'ged/consulting', component: GedConsultingComponent },
  { path: 'ged/conversion', component: GedConversionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
