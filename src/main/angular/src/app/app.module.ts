import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { FileComponent } from './files/file/file.component';
import { FileService } from 'src/app/files/shared/file.service';
import { UrlService } from './url.service';
import { EditFileComponent } from 'src/app/files/edit-file/edit-file.component';
import { TagComponent } from 'src/app/files/tag/tag.component';
import { UploadComponent } from './upload/upload.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { CommentComponent } from 'src/app/files/comment/comment.component';
import { AllFilesComponent } from './files/all-files/all-files.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserServiceService } from './shared/user-service.service';
import { FolderComponent } from './folder/folder.component';
import { LoginComponent } from './login/login.component';

@NgModule({
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
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
      FileService,
      UrlService,
      UserServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
