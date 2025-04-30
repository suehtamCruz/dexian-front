import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { StudentModel } from '../models/student.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  getAllStudents(): Observable<StudentModel[]> {
    return this.http.get<StudentModel[]>(`${environment.apiUrl}/students`);
  }

  getStudentByName(name: string): Observable<StudentModel[]> {
    const params = new HttpParams().set('name', name);
    return this.http.get<StudentModel[]>(
      `${environment.apiUrl}/students/find-by-name`,
      {
        params,
      }
    );
  }

  createStudent(newStudent: StudentModel) {
    return this.http.post<StudentModel>(
      `${environment.apiUrl}/students`,
      newStudent
    );
  }

  updateStudent(student: StudentModel): Observable<StudentModel> {
    return this.http.put<StudentModel>(
      `${environment.apiUrl}/students/${student.id}`,
      student
    );
  }

  deleteStudent(idAluno: number): Observable<StudentModel> {
    return this.http.delete<StudentModel>(
      `${environment.apiUrl}/students/${idAluno}`
    );
  }
}
