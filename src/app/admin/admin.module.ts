import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {LayoutModule} from "./layout/layout.module";
import {NgxsModule} from "@ngxs/store";
import {UserState} from "../redux/user/user.state";
import {DepartmentState} from "../redux/department/department.state";


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxsModule.forFeature([
      UserState,
      DepartmentState
    ]),
    LayoutModule
  ]
})
export class AdminModule {
}
