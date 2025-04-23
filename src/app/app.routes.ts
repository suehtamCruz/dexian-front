import { Routes } from '@angular/router';  
import { SchoolComponent } from './modules/schools/school.component';
import { StudentsComponent } from './modules/students/students.component';
import { UsersComponent } from './modules/users/users.component';

export const routes: Routes = [
  {
    path: 'schools',
    component: SchoolComponent,
  },
  {
    path: 'students',
    component: StudentsComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
];