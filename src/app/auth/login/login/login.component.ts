import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Store} from "@ngxs/store";
import {Subject, takeUntil} from "rxjs";
import {Login} from "../../../redux/auth/auth.actions";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();

  formLogin!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
  ) {
    this.createForm();
  }


  createForm() {
    this.formLogin = this.fb.group({
      email: [null, [Validators.required, Validators.email, Validators.minLength(4)]],
      password: [null, [Validators.required, Validators.minLength(3)]]
    });
  }


  login() {
    const dataForm = this.formLogin.value;
    this.store.dispatch(new Login(dataForm))
      .pipe(takeUntil(this.destroy))
      .subscribe((res) => {
        if (res) {
          this.router.navigate(['/admin/home']);
        }
      });
  }

  get isFormValid() {
    return this.formLogin.valid;
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
