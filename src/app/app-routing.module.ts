import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewPostComponent } from './review-post/review-post.component';
import { MainComponent } from './main/main.component';
import { GedConversionComponent } from './ged-conversion/ged-conversion.component';
import { RequestForConsultingComponent } from './request-for-consulting/request-for-consulting.component';
import { ManagementComponent } from './management/management.component';
import { IntroduceConsultantComponent } from './introduce-consultant/introduce-consultant.component';
import { IntroduceMyUniComponent } from './introduce-my-uni/introduce-my-uni.component';
import { GedConsultingComponent } from './ged-consulting/ged-consulting.component';
import { EssayConsultingComponent} from './essay-consulting/essay-consulting.component';
import { CoverLetterConsultingComponent } from './cover-letter-consulting/cover-letter-consulting.component';
import { InterviewConsultingComponent } from './interview-consulting/interview-consulting.component';
import { YoutubeMaterialsComponent} from './youtube-materials/youtube-materials.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'reviews', component: ReviewsComponent },
  { path: 'review/post', component: ReviewPostComponent },
  { path: 'ged/conversion', component: GedConversionComponent },
  { path: 'request/consulting', component: RequestForConsultingComponent },
  { path: 'admin1', component: ManagementComponent},
  { path: 'ged/consulting', component: GedConsultingComponent },
  { path: 'consulting/essay', component: EssayConsultingComponent },
  { path: 'consulting/cover/letter', component: CoverLetterConsultingComponent },
  { path: 'consulting/interview', component: InterviewConsultingComponent },
  { path: 'introduce/my/uni', component: IntroduceMyUniComponent },
  { path: 'introduce/consultant', component: IntroduceConsultantComponent },
  { path: 'materials', component: YoutubeMaterialsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
