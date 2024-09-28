import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {SweetAlertHelper} from "../../../../utils/helpers/sweet-alert-helper.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngxs/store";
import {Subject, takeUntil} from "rxjs";
import {UserState} from "../../../../redux/user/user.state";
import {ResetUserStateAction, UserAddAction, UserUpdateAction} from "../../../../redux/user/user.actions";
import {DepartmentState} from "../../../../redux/department/department.state";
import {IDepartment} from "../../../../core/interfaces/department";
import {DepartmentGetAction} from "../../../../redux/department/department.actions";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();

  formData!: FormGroup;
  department: IDepartment[] = [];


  constructor(
    private store: Store,
    private fb: FormBuilder,
    private sweetAlertHelper: SweetAlertHelper,
    public dialogRef: MatDialogRef<UserManagementComponent>,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.loadDepartment();
    this.loadData();
  }

  createForm() {
    this.formData = this.fb.group({
      id: [null],
      names: [null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]],
      last_name: [null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]],
      birth_date: [null, Validators.required],
      email: [null, [
        Validators.required,
        Validators.email,
        Validators.maxLength(50),
      ]],
      identification_card: [null, [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(7),
      ]],
      department_id: [null, [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
      ]],
      salary: [null, [
        Validators.required,
        Validators.min(10000),
        Validators.max(10000000),
      ]],
      password: [null, [
        Validators.minLength(8),
        Validators.maxLength(20),
      ]],
    });
  }

  onCancel(saved: boolean) {
    this.dialogRef.close({saved});
  }


  loadDepartment() {
    this.store.dispatch(new DepartmentGetAction);
    this.store.select(DepartmentState.get)
      .pipe(takeUntil(this.destroy))
      .subscribe((res) => {
        if (res) {
          this.department = res;
        }
      });
  }

  loadData() {
    this.store.select(UserState.show)
      .pipe(takeUntil(this.destroy))
      .subscribe((res) => {
        if (res) {
          this.formData.patchValue({
            names: res.names,
            last_name: res.last_name,
            birth_date: res.birth_date,
            email: res.email,
            identification_card: res.identification_card,
            department_id: String(res.department_id),
            salary: res.salary
          });
        }
      });
  }

  onSave() {
    const dataForm = this.formData.getRawValue();

    const birthDate = new Date(dataForm.birth_date);
    dataForm.birth_date = birthDate.toISOString().split('T')[0];

    const action = dataForm.id ? new UserUpdateAction(dataForm) : new UserAddAction(dataForm);

    this.store.dispatch(action)
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: () => {
          const successMessage = dataForm.id ? 'Registro actualizado correctamente' : 'Registro creado correctamente';
          this.sweetAlertHelper.createCustomAlert({
            text: successMessage,
            icon: 'success'
          });
          this.onCancel(true);
        }
      });
  }

  get isFormValid() {
    return this.formData.valid;
  }

  get title() {
    return this.formData.get('id')?.value ? 'Editar' : 'Nuevo';
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
    this.store.dispatch(ResetUserStateAction);
  }

}
