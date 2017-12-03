import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {HttpModule, Http, XHRBackend, RequestOptions} from '@angular/http';
import {FormsModule} from '@angular/forms';
import { RouterModule,Routes } from '@angular/router'

import { AppComponent } from './app.component';
import {getDataService} from './get-data.service';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {httpFactory} from './httpFactory';
import { AllUserListComponent } from './all-user-list/all-user-list.component';
import { HomeComponent } from './home/home.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'all-users-list', component: AllUserListComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'user-profile', component: UserProfileComponent }

];


@NgModule({
  declarations: [
    AppComponent,
    AllUserListComponent,
    HomeComponent,
    AddUserComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [{provide: LocationStrategy, useClass:HashLocationStrategy}, { provide: Http, useFactory: httpFactory, deps:[XHRBackend, RequestOptions]}, getDataService ],
  bootstrap: [AppComponent]
})
export class AppModule { };


