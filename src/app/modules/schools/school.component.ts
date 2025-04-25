import { EditSchoolComponent } from './modals/edit-school/edit-school.component';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SchoolService } from '../../shared/services/school.service';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { SchoolModel } from '../../shared/models/school.model';
import { NewSchoolComponent } from './modals/new-school/new-school.component';
import { NgxMaskPipe } from 'ngx-mask';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-school',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    NgxMaskPipe,
    EditSchoolComponent,
    NewSchoolComponent,
  ],
  templateUrl: './school.component.html',
})
export class SchoolComponent implements OnInit, AfterViewInit, OnDestroy {
  schoolControl = new FormControl('', [Validators.required]);
  _destroy$ = new Subject<void>();
  schools: SchoolModel[] = [];

  constructor(
    private _schoolService: SchoolService,
    private dialog: MatDialog
  ) {}

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  ngOnInit(): void {
    this._getAllSchools();
  }

  ngAfterViewInit(): void {
    this.schoolControl.valueChanges
      .pipe(takeUntil(this._destroy$), debounceTime(300))
      .subscribe((value) => {
        if (!value) {
          this._getAllSchools();
          return;
        }

        this._schoolService
          .getSchoolByDesc(value as string)
          .subscribe((resp) => {
            this.schools = resp;
          });
      });
  }

  private _getAllSchools() {
    this._schoolService.getAllSchools().subscribe((resp) => {
      this.schools = resp;
    });
  }

  openDeleteDialog(school: SchoolModel) {
    Swal.fire({
      title: 'Tem certeza que deseja excluir a escola?',
      text: 'Essa ação não pode ser desfeita',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "Não, manter escola",
      confirmButtonText: 'Sim, excluir',
    }).then((result) => {
      if (result.isConfirmed) {
        this._schoolService.deleteSchool(school.iCodEscola).subscribe(() => {
          this._getAllSchools();
        });
      }
    });
  }

  addSchool() {
    const dialogRef = this.dialog.open(NewSchoolComponent, {
      width: '300px',
      height: '350px',
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        this._getAllSchools();
      });
  }

  openEditDialog(school: SchoolModel) {
    const dialogRef = this.dialog.open(EditSchoolComponent, {
      data: school,
      width: '300px',
      height: '350px',
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        this._getAllSchools();
      });
  }
}
