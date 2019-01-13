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

@NgModule({
  declarations: [
    AppComponent,
    FileComponent,
    EditFileComponent,
    TagComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
      FileService,
      UrlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
