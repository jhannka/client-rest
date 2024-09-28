import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {navbarData} from "./nav-data";
import {AuthState} from "../../../redux/auth/auth.state";
import {Subject, takeUntil} from "rxjs";
import {Store} from "@ngxs/store";


interface SideNavTogg {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  @Output() onToggleSideNav: EventEmitter<SideNavTogg> = new EventEmitter();
  collapsed = false;

  navData = navbarData;
  rol = '';

  constructor(
    private store: Store
  ) {
  }

  ngOnInit(): void {
    this.store.select(AuthState.getInfoUser)
      .pipe(takeUntil(this.destroy))
      .subscribe(res => {
        if (res?.roles) {
          this.rol = res.roles[0].name;
        }
      })
  }

  onPermission(data: any) {
    if (data === '') {
      return true;
    }
    return this.rol === data;
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
