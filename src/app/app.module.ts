import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { ScullyLibModule } from '@scullyio/ng-lib';

@NgModule({
  declarations: [AppComponent, CrisisListComponent, HeroesListComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'crisis-list', component: CrisisListComponent },
      { path: 'heroes-list', component: HeroesListComponent },
    ]),
    ScullyLibModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
