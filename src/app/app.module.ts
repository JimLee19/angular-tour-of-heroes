import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HighlightDirective } from './directive/highlight.directive';
import { UnlessDirective } from './directive/unless.directive';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HttpConfigInterceptor } from './interceptors/httpconfig.interceptor';
import { MessagesComponent } from './messages/messages.component';
import { HeroFormComponent } from './hero-form/hero-form.component';
import { AppRoutingModule } from './app-routing.module';
import { ForbiddenNameDirective } from './directive/forbidden-name.directive';
import { IdentityRevealedValidatorDirective } from './directive/identity-revealed-validator.directive';
import { MessageService } from './services/message.service';
import { HeroService } from './services/hero.service';
import { InMemoryDataService } from './services/in-memory-data.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    HighlightDirective,
    UnlessDirective,
    HeroFormComponent,
    ForbiddenNameDirective,
    IdentityRevealedValidatorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 300 }),
  ],
  providers: [MessageService, HeroService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
