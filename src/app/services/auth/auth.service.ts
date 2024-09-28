import {Injectable} from '@angular/core';
import {ILoginData, IToken} from "../../core/interfaces/auth.interfaces";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CONSTANT} from "../../app.constants";
import {IResponse} from "../../core/interfaces/response.interface";
import {IUser} from "../../core/interfaces/user.interfaces";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  login(data: ILoginData): Observable<IToken> {


    //const body = JSON.stringify(user);
    const url = CONSTANT.AUTH.URL.LOGIN;

    return this.http.post<IToken>(url, data);
  }

  getInfouser(): Observable<IUser> {
    const url = `${CONSTANT.AUTH.URL.INFOUSER}`;
    return this.http.get<IUser>(url);
  }
}
