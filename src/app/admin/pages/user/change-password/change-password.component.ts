import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {Store} from "@ngxs/store";
import {ResetPasswordStateAction, ResetUserStateAction} from "../../../../redux/user/user.actions";
import {Subject, takeUntil} from "rxjs";
import {SweetAlertHelper} from "../../../../utils/helpers/sweet-alert-helper.service";
import {AuthState} from "../../../../redux/auth/auth.state";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();

  formData!: FormGroup;
  userId: number = 0;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    private sweetAlertHelper: SweetAlertHelper,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.store.select(AuthState.getInfoUser)
      .pipe(takeUntil(this.destroy))
      .subscribe(res => {
        if (res) {
          this.userId = res.id
        }
      })
  }

  createForm() {
    this.formData = this.fb.group({
        password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W)/)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator
      }
    );
  }

  passwordMatchValidator(control: AbstractControl) {
    return control.get('password')?.value === control.get('confirmPassword')?.value
      ? null
      : {mismatch: true};
  }

  onSave() {
    const dataForm = this.formData.getRawValue();
    this.store.dispatch(new ResetPasswordStateAction({id: this.userId, password: dataForm.password}))
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: () => {
          this.sweetAlertHelper.createCustomAlert({
            text: 'Registro actualizado correctamente',
            icon: 'success'
          });
          this.onCancel(true);
        }
      });
  }

  get passwordControl() {
    return this.formData.get('password');
  }


  onCancel(saved: boolean) {
    this.dialogRef.close({saved});
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
    this.store.dispatch(ResetUserStateAction);
  }
}
