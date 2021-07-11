import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSearch, faBars, faAngleRight, faAngleLeft, faTimes, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReviewsComponent } from './reviews/reviews.component';
import { MainComponent } from './main/main.component';
import { GedConsultingComponent } from './ged-consulting/ged-consulting.component';
import { GedConversionComponent } from './ged-conversion/ged-conversion.component';
import { HeaderComponent } from './main/header/header.component';
import { ReviewPostComponent } from './review-post/review-post.component';
import { RequestForConsultingComponent } from './request-for-consulting/request-for-consulting.component';
import { ManagementComponent } from './management/management.component';
import { ConsultingReqInfoComponent } from './management/consulting-req-info/consulting-req-info.component';
import { UniversityInfoComponent } from './management/university-info/university-info.component';
import { EssayConsultingComponent } from './essay-consulting/essay-consulting.component';
import { IntroduceConsultantComponent } from './introduce-consultant/introduce-consultant.component';
import { IntroduceMyUniComponent } from './introduce-my-uni/introduce-my-uni.component';
import { YoutubeMaterialsComponent } from './youtube-materials/youtube-materials.component';
import { ReviewDetailComponent } from './reviews/review-detail/review-detail.component';
import { ReviewListComponent } from './reviews/review-list/review-list.component';
import { CoverLetterConsultingComponent } from './cover-letter-consulting/cover-letter-consulting.component';
import { InterviewConsultingComponent } from './interview-consulting/interview-consulting.component';
import { EssayPostComponent } from './essay-post/essay-post.component';
import { ConsultingDateComponent } from './management/consulting-date/consulting-date.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ReviewsComponent,
    MainComponent,
    GedConsultingComponent,
    GedConversionComponent,
    HeaderComponent,
    ReviewPostComponent,
    RequestForConsultingComponent,
    ManagementComponent,
    ConsultingReqInfoComponent,
    UniversityInfoComponent,
    EssayConsultingComponent,
    IntroduceConsultantComponent,
    IntroduceMyUniComponent,
    YoutubeMaterialsComponent,
    ReviewDetailComponent,
    ReviewListComponent,
    CoverLetterConsultingComponent,
    InterviewConsultingComponent,
    EssayPostComponent,
    ConsultingDateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    // Add multiple icons to the library
    library.addIcons(faSearch, faBars, faAngleRight, faAngleLeft, faTimes, faPlusCircle);
  }
}

