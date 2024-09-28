import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentComponent } from './department/department.component';
import {DepartmentRoutingModule} from "./department-routing.module";
import {AgGridAngular} from "ag-grid-angular";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { DepartmentManagementComponent } from './department-management/department-management.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";



@NgModule({
  declarations: [
    DepartmentComponent,
    DepartmentManagementComponent
  ],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    AgGridAngular,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class DepartmentModule { }
