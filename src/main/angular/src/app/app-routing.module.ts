import { NgModule } from '@angular/core';
import { FileComponent } from './file/file.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AllFilesComponent } from './all-files/all-files.component';
import { AllSharedComponent } from './all-shared/all-shared.component';
import { RegistrationComponent } from './registration/registration.component';

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
    path: 'home/search',
    redirectTo: '/home'
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
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
