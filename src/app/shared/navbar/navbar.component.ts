import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/auth/user.service';
import { ProfessorService } from 'src/app/service/professor/professor.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  user$ = this.userService.retornaUsuario();
  professor: any;

  constructor(
    private userService: UserService, 
    private router: Router,
    private professorService: ProfessorService,
    ) {}

  ngOnInit(): void {
    this.professorService.getPerfil().subscribe((professor) => {
        this.professor = professor;
    });
  
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['']);
  }

}
