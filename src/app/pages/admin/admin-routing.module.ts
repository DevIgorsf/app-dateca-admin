import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfessorsComponent } from './professors/professors.component';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { CreateProfessorComponent } from './professors/create-professor/create-professor.component';
import { UpdateProfessorComponent } from './professors/update-professor/update-professor.component';
import { CreateCourseComponent } from './course/create-course/create-course.component';
import { UpdateCourseComponent } from './course/update-course/update-course.component';
import { QuestionComponent } from './question/question.component';
import { CreateQuestionComponent } from './question/create-question/create-question.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'professor',
        component: ProfessorsComponent,
      },
      {
        path: 'professor/adicionar-professor',
        component: CreateProfessorComponent,
      },
      {
        path: 'professor/editar-professor/:id',
        component: UpdateProfessorComponent,
      },
      {
        path: 'materia',
        component: CourseComponent,
      },
      {
        path: 'materia/adicionar-materia',
        component: CreateCourseComponent,
      },
      {
        path: 'materia/editar-materia/:id',
        component: UpdateCourseComponent,
      },
      {
        path: 'questao',
        component: QuestionComponent,
      },
      {
        path: 'questao/adicionar-questao',
        component: CreateQuestionComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
