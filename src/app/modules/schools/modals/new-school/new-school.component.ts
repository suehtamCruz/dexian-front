import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNgxMask } from 'ngx-mask';
import { NewSchoolModel, SchoolModel } from '../../../../shared/models/school.model';
import { SchoolService } from '../../../../shared/services/school.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'new-school-dialog',
  templateUrl: './new-school.component.html',
  imports: [
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNgxMask()],
})
export class NewSchoolComponent {
  form = new FormGroup({
    descricao: new FormControl('', [Validators.required]),
    codEscola: new FormControl('', [Validators.required]),
  });
  dialogRef = inject(MatDialogRef<NewSchoolComponent>);

  constructor(private _schoolService: SchoolService, private toastrService: ToastrService) {}

  createSchool() {
    const data = {
      description: this.form.value.descricao,
      code: Number(this.form.value.codEscola),
    } as NewSchoolModel;
    this._schoolService.createSchool(data).subscribe(() => {
      this.toastrService.success('Escola criada com sucesso');
      this.dialogRef.close();
    });
  }
}
