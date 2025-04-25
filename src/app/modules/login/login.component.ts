import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../shared/services/auth.service';
import { LoginModel } from '../../shared/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
  ],
})
export class LoginComponent {
  @HostListener('document:keydown.enter', ['$event']) 
  onKeydownHandler(event: KeyboardEvent) {
    if (this.form.valid) {
      this.login();
    }
  }

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    localStorage.removeItem('auth_token');
  }

  login() {
    const data = {
      nome: this.form.value.name?.trim(),
      password: this.form.value.password,
    } as LoginModel;
    this.authService.login(data).subscribe((resp) => {
      localStorage.setItem('auth_token', resp.token);
      localStorage.setItem('user', JSON.stringify(resp.user));
      this.toastr.success('Login realizado com sucesso!');
      this.router.navigate(['/students']);
    });
  }
}
