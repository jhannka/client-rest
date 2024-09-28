import {NgModule} from '@angular/core';
import {NavbarComponent} from "./navbar/navbar.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {MainComponent} from "./main/main.component";
import {CommonModule} from "@angular/common";
import {MatSidenavModule} from "@angular/material/sidenav";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatLegacyListModule} from "@angular/material/legacy-list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    MainComponent
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    RouterLink,
    MatLegacyListModule,
    MatExpansionModule,
    MatButtonModule,
    MatTooltipModule,
    RouterLinkActive,
    MatSidenavModule,
    RouterOutlet,

  ]
})
export class LayoutModule {
}
