import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {InfoUser, Login, Logout} from './auth.actions';
import {AuthService} from "../../services/auth/auth.service";
import {tap} from "rxjs";
import {IUser} from "../../core/interfaces/user.interfaces";


interface AuthStateModel {
  token: string | null;
  user: IUser | null;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    user: null
  }
})
@Injectable()
export class AuthState {

  @Selector()
  static token(state: AuthStateModel): string | null {
    return state.token;
  }


  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
  }

  @Selector()
  static getInfoUser(state: AuthStateModel) {
    return state.user;
  }

  constructor(
    private authService: AuthService,
    private store: Store
  ) {
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    return this.authService.login(action.payload).pipe(
      tap({
        next: (result: { token: string }) => {
          this.handleLoginSuccess(ctx, result);
        },
        error: (error: any) => {
          this.handleLoginError(ctx);
        },
      })
    );
  }

  private handleLoginSuccess(ctx: StateContext<AuthStateModel>, result: { token: string }) {
    ctx.patchState({
      token: result.token,
    });
    this.store.dispatch(new InfoUser());
  }

  private handleLoginError(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      token: null,
    });
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      token: null,
      user: null
    });
  }

  @Action(InfoUser)
  getInfoUser(ctx: StateContext<AuthStateModel>) {
    return this.authService.getInfouser().pipe(
      tap(res => {
        ctx.patchState({
          user: res
        })
      })
    );
  }

}
