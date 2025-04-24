import {
  AfterViewInit,
  OnDestroy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../shared/services/student.service';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { StudentModel } from '../../shared/models/student.model';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditDialogComponent } from './dialogs/edit-dialog.component';
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
  ],
  templateUrl: './students.component.html',
})
export class StudentsComponent implements OnInit, AfterViewInit, OnDestroy {
  studentControl = new FormControl('', [Validators.required]);
  _destroy$ = new Subject<void>();
  students: StudentModel[] = [];

  readonly dialog = inject(MatDialog);

  constructor(private _studentService: StudentService) {}

  ngOnInit(): void {
    this._studentService.getAllStudents().subscribe((resp) => {
      this.students = resp;
    });
  }

  ngAfterViewInit(): void {
    this.studentControl.valueChanges
      .pipe(takeUntil(this._destroy$), debounceTime(300))
      .subscribe((value) => {
        if (!value) return;

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
}
