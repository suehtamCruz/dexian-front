import { Routes } from '@angular/router';
import { SchoolComponent } from './modules/schools/school.component';
import { StudentsComponent } from './modules/students/students.component';
import { UsersComponent } from './modules/users/users.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './modules/login/login.component';

export const routes: Routes = [
  {
    path: 'schools',
    canActivate: [AuthGuard],
    component: SchoolComponent,
  },
  {
    path: 'students',
    canActivate: [AuthGuard],
    component: StudentsComponent,
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    component: UsersComponent,
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: UsersComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    canActivate: [AuthGuard],
    component: NotFoundComponent,
  },
];
