import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {RouterModule} from '@angular/router';
=======
import { UploadComponent } from './upload/upload.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
>>>>>>> 1a111595e7bb08bf56d552501a1ceb3b43911bcf

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    LoginComponent, 
=======
    UploadComponent,
    NavBarComponent,
>>>>>>> 1a111595e7bb08bf56d552501a1ceb3b43911bcf
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: '',
        component: HomeComponent
      }
    ])

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
