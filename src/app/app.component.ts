import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLogged: boolean = false;
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
    this.checkStatus();
  }


  public checkStatus(): void {
    this.http.get("http://localhost:22400/isLogged", {withCredentials: true}).subscribe({
      next: (data: any) => {
        this.isLogged = (data.result === "OK");
      },
      error: error => {
        console.log(error)
      }
    });
  }
}
