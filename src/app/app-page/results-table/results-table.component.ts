import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppPageComponent} from "../app-page.component";

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.css']
})
export class ResultsTableComponent {
  http: HttpClient;

  appPage: AppPageComponent;

  constructor(http: HttpClient, appPage: AppPageComponent) {
    this.appPage = appPage;
    this.http = http;
    this.update();
  }

  public update(): void {
    this.appPage.updatePoints();
  }
}
