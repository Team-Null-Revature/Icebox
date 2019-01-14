import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';

import {LoginComponent} from './login/login.component';
import {RouterModule} from '@angular/router';

import { UploadComponent } from './upload/upload.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserServiceService } from './shared/user-service.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, 
    UploadComponent,
    NavBarComponent,
    HomeComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
<<<<<<< HEAD
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

=======
    AppRoutingModule,
    FormsModule,
    HttpClientModule
>>>>>>> 3ccb284df044657e1dfb869ee9f5b51cc7cfc26b
  ],
  providers: [UserServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
