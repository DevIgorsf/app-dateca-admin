import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfessorsComponent } from './professors/professors.component';
import { AdminComponent } from './admin.component';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { SidebarComponent } from 'src/app/shared/sidebar/sidebar.component';
import { CreateProfessorComponent } from './professors/create-professor/create-professor.component';
import { CourseComponent } from './course/course.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageComponent } from 'src/app/shared/message/message.component';
import { MessageModule } from 'src/app/shared/message/message.module';
import { UpdateProfessorComponent } from './professors/update-professor/update-professor.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProfessorsComponent,
    CreateProfessorComponent,
    CourseComponent,
    NavbarComponent,
    SidebarComponent,
    AdminComponent,
    UpdateProfessorComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MessageModule
  ],
  exports: [AdminComponent],
})
export class AdminModule { }
