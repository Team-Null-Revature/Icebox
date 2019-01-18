import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { FolderComponent } from './folder/folder.component';
import { FileComponent } from 'src/app/files/file/file.component';
import { AllFilesComponent } from 'src/app/files/all-files/all-files.component';
import { AllSharedComponent } from 'src/app/files/all-shared/all-shared.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'home/folder/:folderId',
        component: HomeComponent
    },
    {
        path: 'home/search/:searchStr',
        component: HomeComponent
    },
    {
        path: 'register',
        component: RegistrationComponent
    },
    {
        path: 'files/:id',
        component: FileComponent
    },
    {
        path: 'files',
        component: AllFilesComponent
    },
    {
        path: 'shared/:sharestr',
        component: FileComponent
    },
    {
        path: 'shared',
        component: AllSharedComponent
    },
    {
      path: 'folder',
      component: FolderComponent
    },
    {
      path: 'login',
      component: LoginComponent
    }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
