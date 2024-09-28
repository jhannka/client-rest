import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {SweetAlertHelper} from "../../../utils/helpers/sweet-alert-helper.service";
import {Store} from "@ngxs/store";
import {Logout} from "../../../redux/auth/auth.actions";
import * as moment from "moment";
import {AuthState} from "../../../redux/auth/auth.state";
import {IUser} from "../../../core/interfaces/user.interfaces";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();

  viewSidebar: boolean | undefined;

  user: IUser | undefined;

  constructor(
    private store: Store,
    private sweetAlertHelper: SweetAlertHelper,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.store.select(AuthState.getInfoUser)
      .pipe(takeUntil(this.destroy))
      .subscribe((res) => {
        if (res) {
          this.user = res;
        }
      })
  }

  logout() {
    this.sweetAlertHelper.createCustomAlert({
      title: '¿Seguro que desea cerrar sesión?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((res) => {
      if (res.value) {
        this.store.dispatch(new Logout);
        this.router.navigate(['/auth']);
      }
    });
  }

  sidebarView() {
    //this.store.dispatch( new SidebarView( !this.viewSidebar ) );
  }


  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

}
