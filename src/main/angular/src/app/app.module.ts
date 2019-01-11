import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { FolderComponent } from './folder/folder.component';
=======
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {RouterModule} from '@angular/router';
>>>>>>> 07c787b841fc3ddc1cb0512226ea06713e216452

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    FolderComponent
=======
    LoginComponent, 
    HomeComponent
>>>>>>> 07c787b841fc3ddc1cb0512226ea06713e216452
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
