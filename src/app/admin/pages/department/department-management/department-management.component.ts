import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngxs/store";
import {SweetAlertHelper} from "../../../../utils/helpers/sweet-alert-helper.service";
import {MatDialogRef} from "@angular/material/dialog";
import {
  DepartmentCreateAction,
  DepartmentUpdateAction, ResetDepartmentAction
} from "../../../../redux/department/department.actions";
import {DepartmentState} from "../../../../redux/department/department.state";

@Component({
  selector: 'app-department-management',
  templateUrl: './department-management.component.html',
  styleUrls: ['./department-management.component.css']
})
export class DepartmentManagementComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();

  formData!: FormGroup;


  constructor(
    private store: Store,
    private fb: FormBuilder,
    private sweetAlertHelper: SweetAlertHelper,
    public dialogRef: MatDialogRef<DepartmentManagementComponent>,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.store.select(DepartmentState.show)
      .pipe(takeUntil(this.destroy))
      .subscribe((res) => {
        if (res) {
          this.formData.patchValue({
            code: res.code,
            lead: res.lead,
            names: res.names,
            id: res.id
          });
        }
      });
  }

  createForm() {
    this.formData = this.fb.group({
      id: [null],
      code: [null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(2),
      ]],
      names: [null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]],
      lead: [null, [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(7),
      ]],
    });
  }

  onCancel(saved: boolean) {
    this.dialogRef.close({saved});
  }


  onSave() {
    const dataForm = this.formData.getRawValue();
    const action = dataForm.id ? new DepartmentUpdateAction(dataForm) : new DepartmentCreateAction(dataForm);

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
    this.store.dispatch(ResetDepartmentAction);
  }
}
