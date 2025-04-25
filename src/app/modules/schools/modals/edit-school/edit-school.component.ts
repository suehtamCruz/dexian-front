import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
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
import { NgxMaskDirective } from 'ngx-mask';
import { NewSchoolModel, SchoolModel } from '../../../../shared/models/school.model';
import { SchoolService } from '../../../../shared/services/school.service';

@Component({
  selector: 'edit-school-dialog',
  templateUrl: './edit-school.component.html',
  imports: [
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMaskDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditSchoolComponent implements OnInit {
  form = new FormGroup({
    descricao: new FormControl('', [Validators.required]),
    codEscola: new FormControl('', [Validators.required]),
  });
  dialogRef = inject(MatDialogRef<EditSchoolComponent>);
  data = inject<SchoolModel>(MAT_DIALOG_DATA);
  private _schoolService = inject(SchoolService);

  ngOnInit(): void {
    this.form.patchValue({
      codEscola: this.data.iCodEscola.toString(),
      descricao: this.data.sDescricao,
    });
  }

  updateSchool() {
    const data = {
      description: this.form.value.descricao,
      code: Number(this.form.value.codEscola),
    } as NewSchoolModel;
    this._schoolService.updateSchool(data).subscribe(() => {
      this.dialogRef.close();
    });
  }
}