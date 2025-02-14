import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DepartmentComponent} from "./department/department.component";


const routes: Routes = [
  {
    path: '',
    component: DepartmentComponent,
    data: {
      title: 'Areas',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule {
}
