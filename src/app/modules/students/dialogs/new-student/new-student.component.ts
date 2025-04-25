import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudentModel } from '../../../../shared/models/student.model';
import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentService } from '../../../../shared/services/student.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask()],
})
export class NewStudentComponent {
  form = new FormGroup({
    nome: new FormControl(''),
    codAluno: new FormControl(''),
    dataNascimento: new FormControl(''),
    cpf: new FormControl(''),
    endereco: new FormControl(''),
    celular: new FormControl(''),
    codEscola: new FormControl(''),
  });

  data = inject<StudentModel>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<NewStudentComponent>);

  constructor(
    private _studentService: StudentService,
    private toastr: ToastrService
  ) {}

  createStudent() {
    const dateString = this.form.value.dataNascimento || '';
    let dataNascimento: Date | string = '';

    if (dateString) {
      const day = dateString.substring(0, 2);
      const month = dateString.substring(3, 5);
      const year = dateString.substring(6, 10);

      if (day && month && year) {
        dataNascimento = new Date(Number(year), Number(month) - 1, Number(day));
      }
    }
    const data = {
      celular: this.form.value.celular,
      cpf: this.form.value.cpf,
      dataNascimento: dataNascimento,
      endereco: this.form.value.endereco,
      nome: this.form.value.nome,
      codAluno: Number(this.form.value.codAluno?.trim()),
      codEscola: Number(this.form.value.codEscola),
    } as StudentModel;

    this._studentService.createStudent(data).subscribe(() => {
      this.toastr.success('Aluno criado com sucesso');
      this.dialogRef.close();
    });
  }
}
