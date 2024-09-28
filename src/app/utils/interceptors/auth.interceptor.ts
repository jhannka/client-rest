import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, finalize, Observable} from 'rxjs';
import {Store} from "@ngxs/store";
import {AuthState} from "../../redux/auth/auth.state";
import {StartLoadingAction, StopLoadingAction} from "../../redux/loading/loading.actions";
import {SweetAlertHelper} from "../helpers/sweet-alert-helper.service";
import {Logout} from "../../redux/auth/auth.actions";
import {IError} from "../../core/interfaces/response.interface";
import {Router} from "@angular/router";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private store: Store,
    private sweetAlertHelper: SweetAlertHelper,
    private router: Router
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.store.dispatch(new StartLoadingAction());
    const token: any = this.store.selectSnapshot(AuthState.token);

    let headers = this.buildHeaders(request, token);

    const updatedRequest = request.clone({headers: headers});

    return next.handle(updatedRequest).pipe(
      catchError(error => {
        this.handleError(error);
        throw error;
      }),
      finalize(() => this.store.dispatch(new StopLoadingAction()))
    );
  }

  private buildHeaders(request: HttpRequest<any>, token: any): HttpHeaders {
    let baseHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Content-Type', 'application/json')
      .append('Accept', 'application/json');


    return token ? baseHeaders.append('Authorization', `Bearer ${token}`) : baseHeaders;
  }


  private handleError(error: any) {
    this.store.dispatch(new StopLoadingAction());

    if (error.error.error === '') {
      this.handleTokenError();
    } else {
      this.handleUnexpectedError(error.error.error);
    }

  }

  private handleTokenError() {
    this.store.dispatch(new Logout());
    this.router.navigate(['/auth']);
  }

  private handleUnexpectedError(error: string) {
    this.sweetAlertHelper.createCustomAlert({
      title: 'Ocurrió algo inesperado',
      text: error,
      icon: 'error'
    });
  }

}

