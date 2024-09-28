import {CanActivate, Router} from '@angular/router';
import {Store} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {AuthState} from "../../redux/auth/auth.state";


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store,
    private router: Router,
  ) {
  }


  canActivate() {
    const isAuthenticated = this.store.selectSnapshot(AuthState.isAuthenticated);
    if (!isAuthenticated) {
      this.router.navigate(['/auth']);
    }
    return isAuthenticated;
  }
}
