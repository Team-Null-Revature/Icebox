import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FileComponent } from './files/file/file.component';
import { FileService } from 'src/app/files/shared/file.service';
import { EditFileComponent } from 'src/app/files/edit-file/edit-file.component';
import { TagComponent } from 'src/app/files/tag/tag.component';
import { UploadComponent } from './upload/upload.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { CommentComponent } from 'src/app/files/comment/comment.component';
import { AllFilesComponent } from './files/all-files/all-files.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserServiceService } from './shared/user-service.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptorService } from './services/api-interceptor.service';
import { FolderComponent } from './folder/folder.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AddTagComponent } from './add-tag/add-tag.component';

@NgModule({
<<<<<<< HEAD
  declarations: [
    AppComponent,
    LoginComponent, 
    UploadComponent,
    NavBarComponent,
    HomeComponent,
    RegistrationComponent,
    AddTagComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserServiceService],
  bootstrap: [AppComponent]
=======
    declarations: [
        FolderComponent,
        AppComponent,
        FileComponent,
        EditFileComponent,
        TagComponent,
        UploadComponent,
        LoginComponent,
        NavBarComponent,
        HomeComponent,
        CommentComponent,
        AllFilesComponent,
        RegistrationComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    providers: [
        FileService,
        UserServiceService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiInterceptorService,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
>>>>>>> 6a77fc9a2c24d91aa0fc69f125f6843b00c31e2d
})
export class AppModule { }
