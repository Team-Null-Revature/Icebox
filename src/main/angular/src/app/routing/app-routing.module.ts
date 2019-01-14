import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileComponent } from 'src/app/files/file/file.component';
import { AllFilesComponent } from 'src/app/files/all-files/all-files.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
    },
    {
        path: 'files:/id',
        component: FileComponent
    },
    {
        path: 'files',
        component: AllFilesComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
