import {DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule, RouterOutlet} from "@angular/router";
import {NgxsModule} from "@ngxs/store";
import {AuthState} from "./redux/auth/auth.state";
import {LoadingState} from "./redux/loading/loading.state";
import {environment} from "../environments/environment";
import {NgxsStoragePluginModule} from "@ngxs/storage-plugin";
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";
import {AuthGuard} from "./utils/guards/auth.guard";
import {NoAuthGuard} from "./utils/guards/notauth.guard";
import {AuthInterceptor} from "./utils/interceptors/auth.interceptor";
import {LicenseManager} from "ag-grid-enterprise";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AgGridModule} from "ag-grid-angular";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSelectModule} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";
import {MAT_DATE_LOCALE} from "@angular/material/core";


LicenseManager.setLicenseKey('');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    NgxsModule.forRoot([
      AuthState,
      LoadingState,
    ], {developmentMode: !environment.production}),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({
      key: ['auth.token', 'auth.user'],
    }),
    BrowserAnimationsModule,
    RouterOutlet,
    MatDialogModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    AgGridModule,
  ],
  providers: [
    AuthGuard,
    NoAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: 'es-CO' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'COP' },
    { provide: MAT_DATE_LOCALE, useValue: 'es-CO' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
