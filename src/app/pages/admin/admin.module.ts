import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfessorsComponent } from './professors/professors.component';
import { AdminComponent } from './admin.component';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { SidebarComponent } from 'src/app/shared/sidebar/sidebar.component';
import { CreateProfessorComponent } from './professors/create-professor/create-professor.component';
import { CourseComponent } from './course/course.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'src/app/shared/message/message.module';
import { UpdateProfessorComponent } from './professors/update-professor/update-professor.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CreateCourseComponent } from './course/create-course/create-course.component';
import { UpdateCourseComponent } from './course/update-course/update-course.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { QuestionComponent } from './question/question.component';
import { CreateQuestionComponent } from './question/create-question/create-question.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { CardComponent } from 'src/app/shared/card/card.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { FormTextFieldComponent } from 'src/app/shared/form-text-field/form-text-field.component';
import { MatRadioModule } from '@angular/material/radio';
import { RankingComponent } from './ranking/ranking.component';
import { ProfileComponent } from './profile/profile.component';
import { EnadeComponent } from './enade/enade.component';
import { CreateQuestionWithImageComponent } from './question/create-question-with-image/create-question-with-image.component';
import { CreateEnadeWithImageComponent } from './enade-image/create-enade-with-image/create-enade-with-image.component';
import { CreateEnadeComponent } from './enade/create-enade/create-enade.component';
import { EnadeImageComponent } from './enade-image/enade-image.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProfessorsComponent,
    CreateProfessorComponent,
    CourseComponent,
    NavbarComponent,
    SidebarComponent,
    CardComponent,
    AdminComponent,
    FormTextFieldComponent,
    UpdateProfessorComponent,
    CreateCourseComponent,
    UpdateCourseComponent,
    QuestionComponent,
    CreateQuestionComponent,
    RankingComponent,
    ProfileComponent,
    EnadeComponent,
    CreateQuestionWithImageComponent,
    CreateEnadeWithImageComponent,
    CreateEnadeComponent,
    EnadeImageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MessageModule,
    MatFormFieldModule,
    NgFor,
    MatAutocompleteModule,
    MatCardModule,
    MatSelectModule,
    MatChipsModule,
    MatGridListModule,
    MatRadioModule,
    MatIconModule,
    MatListModule,
    AsyncPipe
  ],
  exports: [AdminComponent],
})
export class AdminModule { }
