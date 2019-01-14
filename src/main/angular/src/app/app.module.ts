import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserServiceService } from './shared/user-service.service';
import { AppRoutingModule } from './app-routing.module'
import { FolderComponent } from './folder/folder.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    FolderComponent,
    AppComponent,
    UploadComponent,
    LoginComponent,
    NavBarComponent,
    HomeComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
