import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: any;
  let toastrServiceMock: any;
  let routerMock: any;

  beforeEach(async () => { 
    authServiceMock = {
      login: jest.fn().mockReturnValue(of({ token: 'test-token', user: {} }))
    };
    
    toastrServiceMock = {
      success: jest.fn()
    };
    
    routerMock = {
      navigate: jest.fn()
    };
 
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn()
      },
      writable: true
    });

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock },
        { provide: Router, useValue: routerMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar com formulário inválido', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('deve validar o formulário quando os campos são preenchidos corretamente', () => {
    component.form.controls['name'].setValue('usuario');
    component.form.controls['password'].setValue('senha123');
    expect(component.form.valid).toBeTruthy();
  });

  it('deve desabilitar o botão quando o formulário é inválido', () => {
    component.form.controls['name'].setValue('');
    component.form.controls['password'].setValue('');
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('deve habilitar o botão quando o formulário é válido', () => {
    component.form.controls['name'].setValue('usuario');
    component.form.controls['password'].setValue('senha123');
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeFalsy();
  });
});
