import {Injectable} from '@angular/core';
import {CONSTANT} from "../../app.constants";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../../core/interfaces/response.interface";
import {IDepartment} from "../../core/interfaces/department";


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private url = CONSTANT.DEPARTMENT.URL.BASE;

  constructor(private http: HttpClient) {
  }

  get(): Observable<IResponse<IDepartment[]>> {
    return this.http.get<IResponse<IDepartment[]>>(this.url);
  }

  show(id: number): Observable<IResponse<IDepartment>> {
    const url = `${this.url}/${id}`;
    return this.http.get<IResponse<IDepartment>>(url);
  }

  create(data: IDepartment): Observable<IResponse<IDepartment>> {
    const {id, ...dataWitouhId} = data;
    return this.http.post<IResponse<IDepartment>>(this.url, dataWitouhId);
  }

  update(data: IDepartment): Observable<IResponse<IDepartment>> {
    const {id, ...dataWitouhId} = data;
    const url = `${this.url}/${id}`;
    return this.http.put<IResponse<IDepartment>>(url, dataWitouhId);
  }

  destroy(id: number) {
    const url = `${this.url}/${id}`;
    return this.http.delete(url);
  }
}
