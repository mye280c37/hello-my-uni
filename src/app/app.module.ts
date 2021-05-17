import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSearch, faCookieBite, faBars } from '@fortawesome/free-solid-svg-icons';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    // Add multiple icons to the library
    library.addIcons(faSearch, faCookieBite, faBars);
  }
}

