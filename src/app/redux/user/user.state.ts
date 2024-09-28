import {Injectable} from '@angular/core';
import {State, Action, StateContext, Selector} from '@ngxs/store';
import {IUser} from "../../core/interfaces/user.interfaces";
import {UserService} from "../../services/user/user.service";
import {
  ResetPasswordStateAction,
  ResetUserStateAction,
  UserAddAction,
  UserDeleteAction,
  UserGetAction,
  UserShowAction,
  UserUpdateAction
} from "./user.actions";
import {tap} from "rxjs";

interface UserStateModel {
  users: IUser[];
  user: IUser | null
}

const defaults = {
  users: [],
  user: null
};

@State<UserStateModel>({
  name: 'user',
  defaults
})
@Injectable()
export class UserState {


  @Selector()
  static get(state: UserStateModel) {
    return state.users;
  }

  @Selector()
  static show(state: UserStateModel) {
    return state.user;
  }

  constructor(
    private userService: UserService
  ) {
  }

  @Action(UserGetAction)
  get(ctx: StateContext<UserStateModel>) {
    return this.userService.get().pipe(
      tap(res => {
        ctx.patchState({
          users: res.data
        })
      })
    );
  }

  @Action(UserShowAction)
  show(ctx: StateContext<UserStateModel>, {id}: UserShowAction) {
    return this.userService.show(id).pipe(
      tap(res => {
        ctx.patchState({
          user: res.data
        })
      })
    );
  }

  @Action(UserAddAction)
  create(ctx: StateContext<UserStateModel>, {data}: UserAddAction) {
    return this.userService.create(data).pipe(
      tap(res => {
        ctx.patchState({})
      })
    );
  }

  @Action(UserUpdateAction)
  update(ctx: StateContext<UserStateModel>, {data}: UserUpdateAction) {
    return this.userService.update(data).pipe(
      tap(res => {
        ctx.patchState({})
      })
    );
  }

  @Action(UserDeleteAction)
  delete(ctx: StateContext<UserStateModel>, {id}: UserDeleteAction) {
    return this.userService.destroy(id).pipe(
      tap(res => {
        ctx.patchState({})
      })
    );
  }

  @Action(ResetUserStateAction)
  resetState(ctx: StateContext<ResetUserStateAction>) {
    const currentState = ctx.getState();
    ctx.setState({
      ...currentState,
      user: null
    });

  }

  @Action(ResetPasswordStateAction)
  resetPassword(ctx: StateContext<UserStateModel>, {data}: ResetPasswordStateAction) {
    return this.userService.resetPassword(data).pipe(
      tap(res => {
        ctx.patchState({})
      })
    );
  }

}
