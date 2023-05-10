import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: HomeComponent
  },
  {
    path: 'alumnos',
    loadChildren: () => import('./features/students/students.module').then((m) => m.StudentsModule)
  },
  {
    path: 'cursos',
    loadChildren: () => import('./features/courses/courses.module').then((m) => m.CoursesModule)
  },
  {
    path: 'inscripciones',
    loadChildren: () => import('./features/enrollments/enrollments.module').then((m) => m.EnrollmentsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
