import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-login-register-form',
  templateUrl: './login-register-form.component.html',
  styleUrls: ['./login-register-form.component.css']
})
export class LoginRegisterFormComponent {
  http: HttpClient;

  user = {username: "", password: ""};
  errorMessage = "";
  appComponent: AppComponent;

  constructor(http: HttpClient, appComponent: AppComponent) {
    this.http = http;
    this.appComponent = appComponent;
  }

  action(actionName: string): void {
    this.http.post("http://localhost:22400/" + actionName, this.user, {withCredentials: true}).subscribe({
      next: (data: any) => {
        if (data.result === "OK") {
          this.errorMessage = "";
          this.appComponent.checkStatus();
        } else {
          this.errorMessage = data.result;
        }
      },
      error: error => console.log(error)
    });
  }
}
