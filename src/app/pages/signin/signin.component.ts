import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  login = '';
  senha = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  logIn() {
    this.authService.autenticar(this.login, this.senha).subscribe(
      () => {
        this.router.navigate(['admin/dashboard']);
      },
      (error) => {
        alert('Login ou senha inválido');
        console.log(error);
      }
    );
  }
}
