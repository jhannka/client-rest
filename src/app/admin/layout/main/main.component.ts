import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {Store} from "@ngxs/store";


interface SideNavTogg {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();

  title = 'sidenav';

  isSideNavCollapsed = false;
  screenWidth = 0;
  opened = true;

  constructor(
    private store: Store
  ) {

  }

  ngOnInit(): void {
  }

  onToggleSideNav(data: SideNavTogg): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
