import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CONSTANT} from "../../app.constants";
import {IResponse} from "../../core/interfaces/response.interface";
import {IResetPassword, IUser} from "../../core/interfaces/user.interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = CONSTANT.USER.URL.BASE;

  constructor(private http: HttpClient) {
  }

  get(): Observable<IResponse<IUser[]>> {
    return this.http.get<IResponse<IUser[]>>(this.url);
  }

  show(id: number): Observable<IResponse<IUser>> {
    const url = `${this.url}/${id}`;
    return this.http.get<IResponse<IUser>>(url);
  }

  create(user: IUser): Observable<IResponse<IUser>> {
    return this.http.post<IResponse<IUser>>(this.url, user);
  }

  update(user: IUser): Observable<IResponse<IUser>> {
    const {id, ...dataWitouhId} = user;
    const url = `${this.url}/${id}`;
    return this.http.put<IResponse<IUser>>(url, dataWitouhId);
  }

  destroy(id: number) {
    const url = `${this.url}/${id}`;
    return this.http.delete(url);
  }

  resetPassword(data: IResetPassword) {
    const {id, ...dataWitouhId} = data;
    const url = `${CONSTANT.USER.URL.RESET_PASSWORD}/${id}`;
    return this.http.put(url, dataWitouhId);
  }
}
