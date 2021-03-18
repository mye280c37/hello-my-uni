import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReviewsComponent } from './reviews/reviews.component';
import { MainComponent } from './main/main.component';
import { GedConsultingComponent } from './ged-consulting/ged-consulting.component';
import { GedConversionComponent } from './ged-conversion/ged-conversion.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ReviewsComponent,
    MainComponent,
    GedConsultingComponent,
    GedConversionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

