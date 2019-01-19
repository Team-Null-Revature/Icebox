import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TagComponent } from './tag/tag.component';
import { BytesPipe } from './shared/pipes/bytes.pipe';
import { FileComponent } from './file/file.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { TagService } from './shared/services/tag.service';
import { UploadComponent } from './upload/upload.component';
import { FolderComponent } from './folder/folder.component';
import { FileService } from './shared/services/file.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CommentComponent } from './comment/comment.component';
import { FolderService } from './shared/services/folder.service';
import { DownloadComponent } from './download/download.component';
import { UserServiceService } from './shared/services/user.service';
import { EditFileComponent } from './edit-file/edit-file.component';
import { AllFilesComponent } from './all-files/all-files.component';
import { DirectoryComponent } from './directory/directory.component';
import { AllSharedComponent } from './all-shared/all-shared.component';
import { RegistrationComponent } from './registration/registration.component';
import { ApiInterceptorService } from './shared/services/api-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    TagComponent,
    HomeComponent,
    FileComponent,
    LoginComponent,
    NavBarComponent,
    UploadComponent,
    FolderComponent,
    CommentComponent,
    AllFilesComponent,
    DownloadComponent,
    EditFileComponent,
    DirectoryComponent,
    AllSharedComponent,
    RegistrationComponent,
    BytesPipe
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
  providers: [
    DatePipe,
    TagService,
    FileService,
    FolderService,
    DirectoryComponent,
    UserServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
