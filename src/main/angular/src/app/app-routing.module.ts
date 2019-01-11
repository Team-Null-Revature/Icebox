import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {
    path: '',
    //redirectTo: '/home',
    component: RegistrationComponent,
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: RegistrationComponent
  }

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
