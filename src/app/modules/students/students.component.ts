import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { StudentModel } from '../../shared/models/student.model';
import { StudentService } from '../../shared/services/student.service';
import { EditDialogComponent } from './dialogs/edit/edit-dialog.component';
import { NewStudentComponent } from './dialogs/new-student/new-student.component';

@Component({
  selector: 'app-students',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    EditDialogComponent,
    NewStudentComponent,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  templateUrl: './students.component.html',
  providers: [provideNgxMask()],
})
export class StudentsComponent implements OnInit, AfterViewInit, OnDestroy {
  studentControl = new FormControl('', [Validators.required]);
  _destroy$ = new Subject<void>();
  students: StudentModel[] = [];

  readonly dialog = inject(MatDialog);

  constructor(private _studentService: StudentService) {}

  ngOnInit(): void {
    this._getAllStudents();
  }

  ngAfterViewInit(): void {
    this.studentControl.valueChanges
      .pipe(takeUntil(this._destroy$), debounceTime(300))
      .subscribe((value) => {
        if (!value) {
          this._getAllStudents();
          return;
        }

        this._studentService
          .getStudentByName(value as string)
          .subscribe((resp) => {
            this.students = resp;
          });
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  openEditDialog(student: StudentModel) {
    this.dialog.open(EditDialogComponent, {
      data: student,
      width: '600px',
      height: '650px',
    });
  }

  openDeleteDialog(student: StudentModel) {
    Swal.fire({
      title: 'Tem certeza que deseja excluir o aluno?',
      text: 'Essa ação não pode ser desfeita',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir',
    }).then((result) => {
      if (result.isConfirmed) {
        this._studentService.deleteStudent(student.codAluno).subscribe(() => {
          this._getAllStudents();
        });
      }
    });
  }
  openNewStudentDialog() {
    this.dialog.open(NewStudentComponent, {
      width: '600px',
      height: '700px',
    });
  }
  private _getAllStudents() {
    this._studentService.getAllStudents().subscribe((resp) => {
      this.students = resp;
    });
  }
}
