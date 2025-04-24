import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StudentModel } from '../../../shared/models/student.model';
import { StudentService } from '../../../shared/services/student.service';

@Component({
  selector: 'edit-student-dialog',
  templateUrl: './edit-dialog.component.html',
  imports: [
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditDialogComponent {
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
  dialogRef = inject(MatDialogRef<EditDialogComponent>);

  constructor(private _studentService: StudentService) {}

  ngOnInit(): void {
    console.log(this.data);
    this.form.patchValue({
      codAluno: this.data.codAluno.toString(),
      nome: this.data.nome,
      dataNascimento: this.data.dataNascimento as string,
      cpf: this.data.cpf,
      endereco: this.data.endereco,
      celular: this.data.celular,
      codEscola: this.data.codEscola.toString(),
    });
  }

  updateStudentData() {
    const data = {
      endereco: this.form.value.endereco,
      codEscola: this.data.codEscola,
      codAluno: Number(this.form.value.codAluno),
      celular: this.form.value.celular,
    } as StudentModel;
    this._studentService.updateStudent(data).subscribe((resp) => {
      this.dialogRef.close();
    });
  }
}
