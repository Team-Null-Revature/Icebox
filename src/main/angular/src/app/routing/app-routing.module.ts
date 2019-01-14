import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileComponent } from 'src/app/files/file/file.component';
import { AllFilesComponent } from 'src/app/files/all-files/all-files.component';
import { HomeComponent } from '../home/home.component';

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
        path: 'files/:id',
        component: FileComponent
    },
    {
        path: 'files',
        component: AllFilesComponent
    },
    {
        path: 'files/:sharestr',
        component: FileComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
