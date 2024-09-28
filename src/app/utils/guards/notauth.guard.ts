import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Store} from '@ngxs/store';
import {AuthState} from "../../redux/auth/auth.state";


@Injectable()
export class NoAuthGuard implements CanActivate {
  constructor(
    private store: Store,
    private router: Router,
  ) {
  }

  canActivate() {
    const isAuthenticated = !this.store.selectSnapshot(AuthState.isAuthenticated);
    if (!isAuthenticated) {
      this.router.navigate(['/admin']);
    }
    return isAuthenticated;
  }
}
