import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-app-page',
  templateUrl: './app-page.component.html',
  styleUrls: ['./app-page.component.css']
})
export class AppPageComponent {
  points: { x: number, y: number }[] = [];
  currPoint = {x: 0, y: 0, r: 0};
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  updatePoints(): void {
    this.http.get("http://localhost:22400/points", {withCredentials: true}).subscribe({
      next: (data: any) => {
        this.points = data;
      },
      error: error => {
        console.log(error)
      }
    });
  }

  fix(val: any): string {
    let value = val.toString().trim().replace(',', '.');
    if (value.length > 8) value = value.substring(0, 8);
    return value;
  }

  toNumber(val: any): any {
    if (val.toString().length > 8) return NaN;
    val = this.fix(val);
    let value = parseFloat(val);
    return (isFinite(value) && isFinite(val)) ? value : NaN;
  }

  check(val: any): any {
    let value = this.toNumber(val);
    if (isNaN(value)) return false;
    return value > -5.0 && value < 3.0;
  }

  getResult(x: number, y: number, r: number): any {
    if (!this.check(r)) return false;
    if (r < 0) {
      r = -r;
      x = -x;
      y = -y;
    }
    return ((x >= -r) && (x <= 0.0) && (y <= 0.0) && (y * y <= r * r - x * x)) ||
      ((x >= 0.0) && (x <= r) && (y >= 0.0) && (y <= r - x)) ||
      ((x >= 0.0) && (x <= r) && (y <= 0.0) && (y >= -r / 2.0));
  }
}
