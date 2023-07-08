import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfessorsComponent } from './professors/professors.component';
import { AdminComponent } from './admin.component';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { SidebarComponent } from 'src/app/shared/sidebar/sidebar.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProfessorsComponent,
    NavbarComponent,
    SidebarComponent,
    AdminComponent
  ],
  imports: [
    CommonModule, AdminRoutingModule
  ],
  exports: [AdminComponent],
})
export class AdminModule { }
