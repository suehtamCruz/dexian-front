import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewSchoolModel, SchoolModel } from '../models/school.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  constructor(private http: HttpClient) {}

  getAllSchools() {
    return this.http.get<SchoolModel[]>(`${environment.apiUrl}/school`);
  }

  getSchoolByDesc(description: string) {
    const params = new HttpParams().set('desc', description);
    return this.http.get<SchoolModel[]>(
      `${environment.apiUrl}/school/find-by-desc`,
      {
        params,
      }
    );
  }

  deleteSchool(codSchool: number) {
    return this.http.delete(`${environment.apiUrl}/school/${codSchool}`);
  }

  createSchool(school: NewSchoolModel) {
    return this.http.post<SchoolModel>(`${environment.apiUrl}/school`, school);
  }

  updateSchool(school: NewSchoolModel) {
    return this.http.put<SchoolModel>(
      `${environment.apiUrl}/school/${school.code}`,
      school
    );
  }
}
