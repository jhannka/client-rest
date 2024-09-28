import {Injectable} from '@angular/core';
import {State, Action, StateContext, Selector} from '@ngxs/store';
import {IDepartment} from "../../core/interfaces/department";
import {DepartmentService} from "../../services/department/department.service";
import {tap} from "rxjs";
import {
  DepartmentCreateAction, DepartmentDeleteAction,
  DepartmentGetAction,
  DepartmentShowAction,
  DepartmentUpdateAction, ResetDepartmentAction
} from "./department.actions";
import {ResetUserStateAction} from "../user/user.actions";

interface DepartmentStateModel {
  items: IDepartment[];
  show: IDepartment | null
}

const defaults = {
  items: [],
  show: null
};

@State<DepartmentStateModel>({
  name: 'department',
  defaults
})
@Injectable()
export class DepartmentState {

  @Selector()
  static get(state: DepartmentStateModel) {
    return state.items;
  }

  @Selector()
  static show(state: DepartmentStateModel) {
    return state.show;
  }

  constructor(private departmentService: DepartmentService) {
  }

  @Action(DepartmentGetAction)
  get(ctx: StateContext<DepartmentStateModel>) {
    return this.departmentService.get().pipe(
      tap(res => {
        ctx.patchState({
          items: res.data
        })
      })
    );
  }

  @Action(DepartmentShowAction)
  show(ctx: StateContext<DepartmentStateModel>, {id}: DepartmentShowAction) {
    return this.departmentService.show(id).pipe(
      tap(res => {
        ctx.patchState({
          show: res.data
        })
      })
    );
  }

  @Action(DepartmentCreateAction)
  create(ctx: StateContext<DepartmentStateModel>, {data}: DepartmentCreateAction) {
    return this.departmentService.create(data);
  }

  @Action(DepartmentUpdateAction)
  update(ctx: StateContext<DepartmentStateModel>, {data}: DepartmentUpdateAction) {
    return this.departmentService.update(data);
  }

  @Action(DepartmentDeleteAction)
  delete(ctx: StateContext<DepartmentStateModel>, {id}: DepartmentDeleteAction) {
    return this.departmentService.destroy(id);
  }

  @Action(ResetDepartmentAction)
  resetState(ctx: StateContext<DepartmentStateModel>) {
    const currentState = ctx.getState();
    ctx.setState({
      ...currentState,
      show: null
    });
  }
}
