import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {AppPageComponent} from './app-page/app-page.component';
import {HeaderComponent} from './login-page/header/header.component';
import {LoginRegisterFormComponent} from './login-page/login-register-form/login-register-form.component';
import {CoordsFormComponent} from './app-page/coords-form/coords-form.component';
import {PlotComponent} from './app-page/plot/plot.component';
import {LogoutButtonComponent} from './app-page/logout-button/logout-button.component';
import {ResultsTableComponent} from './app-page/results-table/results-table.component';
import {FormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {RouterOutlet, Routes} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AppPageComponent,
    HeaderComponent,
    LoginRegisterFormComponent,
    CoordsFormComponent,
    PlotComponent,
    LogoutButtonComponent,
    ResultsTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterOutlet
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
