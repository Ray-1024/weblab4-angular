import {Component} from '@angular/core';
import {AppComponent} from "../../app.component";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.css']
})
export class LogoutButtonComponent {

  app: AppComponent;
  http: HttpClient;

  constructor(http: HttpClient, app: AppComponent) {
    this.app = app;
    this.http = http;
  }

  logout(): void {
    this.http.get("http://localhost:22400/logout", {withCredentials: true}).subscribe({
      next: (data: any) => {
        this.app.checkStatus();
      },
      error: error => {
        console.log(error)
      }
    });
  }
}
