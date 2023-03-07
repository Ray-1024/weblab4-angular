import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppPageComponent} from "../app-page.component";

@Component({
  selector: 'app-coords-form',
  templateUrl: './coords-form.component.html',
  styleUrls: ['./coords-form.component.css']
})
export class CoordsFormComponent {
  http: HttpClient;
  appPage: AppPageComponent;

  errorMessage: string = "";

  constructor(http: HttpClient, appPage: AppPageComponent) {
    this.appPage = appPage;
    this.http = http;
  }

  checkFields(): boolean {
    this.errorMessage = "";
    if (!this.appPage.check(this.appPage.currPoint.x)) {
      if (this.appPage.currPoint.x.toString().length > 8) this.errorMessage = "Одно из полей содержит слишком много символов";
      else this.errorMessage = "Поле x не удовлетворяет условию -5 < x < 3";
      return false;
    }
    if (!this.appPage.check(this.appPage.currPoint.y)) {
      if (this.appPage.currPoint.y.toString().length > 8) this.errorMessage = "Одно из полей содержит слишком много символов";
      else this.errorMessage = "Поле y не удовлетворяет условию -5 < x < 3";
      return false;
    }
    if (!this.appPage.check(this.appPage.currPoint.r)) {
      if (this.appPage.currPoint.r.toString().length > 8) this.errorMessage = "Одно из полей содержит слишком много символов";
      else this.errorMessage = "Поле r не удовлетворяет условию -5 < x < 3";
      return false;
    }
    this.appPage.currPoint.x = this.appPage.toNumber(this.appPage.currPoint.x);
    this.appPage.currPoint.y = this.appPage.toNumber(this.appPage.currPoint.y);
    this.appPage.currPoint.r = this.appPage.toNumber(this.appPage.currPoint.r);
    return true;
  }


  hit(): void {
    if (!this.checkFields()) return;
    this.http.post("http://localhost:22400/add_point", this.appPage.currPoint, {withCredentials: true}).subscribe({
      next: (data: any) => {
        this.appPage.updatePoints();
      },
      error: error => {
        console.log(error);
      }
    });
  }

}
