import {Component, ElementRef, ViewChild} from '@angular/core';
import {AppPageComponent} from "../app-page.component";
import {HttpClient} from "@angular/common/http";
import {compareNumbers} from "@angular/compiler-cli/src/version_helpers";

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent {
  appPage: AppPageComponent;
  http: HttpClient;
  size = {w: 300, h: 300};
  cell = {w: 30, h: 30};
  canvas: HTMLCanvasElement | null | undefined;
  context: CanvasRenderingContext2D | null | undefined;

  coordsToCanvas(pnt: { x: number, y: number }): any {
    return {
      x: (this.size.w / 2.0) + (pnt.x) * (this.cell.w), y: (this.size.h / 2.0) - (pnt.y) * (this.cell.h)
    }
  }

  constructor(http: HttpClient, appPage: AppPageComponent) {
    this.appPage = appPage;
    this.http = http;
  }

  ngAfterViewInit(): void {
    this.canvas = document.getElementsByTagName("canvas").item(0);
    if (this.canvas)
      this.context = this.canvas.getContext("2d");
    this.draw();
    setInterval(this.draw, 100);
  }

  clear(): void {
    if (this.context) {
      this.context.fillStyle = "#FDF4E3";
      this.context.fillRect(0, 0, this.size.w, this.size.h);
    }
  }

  drawGrid(): void {
    if (this.context) {
      this.context.fillStyle = "gray";
      for (let x = this.cell.w; x <= this.size.w; x += this.cell.w)
        this.context.fillRect(x, 0, 1, this.size.h);
      for (let y = this.cell.h; y <= this.size.h; y += this.cell.h)
        this.context.fillRect(0, y, this.size.w, 1);
      this.context.fillStyle = "black";
      this.context.fillRect(this.size.w / 2.0 - 1, 0, 2, this.size.h);
      this.context.fillRect(0, this.size.h / 2.0 - 1, this.size.w, 2);
    }
  }

  drawArea(): void {
    if (this.context && this.appPage.check(this.appPage.currPoint.r)) {
      this.context.fillStyle = "blue";
      this.context.beginPath();
      this.context.moveTo((this.size.w / 2.0), (this.size.h / 2.0) - (this.appPage.currPoint.r) * this.cell.h);
      this.context.lineTo((this.size.w / 2.0) + (this.appPage.currPoint.r) * this.cell.w, (this.size.h / 2.0));
      this.context.lineTo((this.size.w / 2.0) + (this.appPage.currPoint.r) * this.cell.w, (this.size.h / 2.0) + (this.appPage.currPoint.r / 2.0) * (this.cell.h));
      this.context.lineTo((this.size.w / 2.0), (this.size.h / 2.0) + (this.appPage.currPoint.r / 2.0) * (this.cell.h));
      this.context.fill();
      this.context.beginPath();
      this.context.moveTo((this.size.w / 2.0), (this.size.h / 2.0));
      if (this.appPage.currPoint.r >= 0)
        this.context.arc((this.size.w / 2.0), (this.size.h / 2.0), (this.cell.w) * (Math.abs(this.appPage.currPoint.r)), Math.PI / 2.0, Math.PI, false);
      else this.context.arc((this.size.w / 2.0), (this.size.h / 2.0), (this.cell.w) * (Math.abs(this.appPage.currPoint.r)), 1.5 * Math.PI, 2.0 * Math.PI, false);
      this.context.fill();
    }
  }

  drawPoints(): void {
    if (this.context) {
      for (let item of this.appPage.points) {
        let coords = this.coordsToCanvas({x: item.x, y: item.y})
        this.context.fillStyle = (this.appPage.getResult(item.x, item.y, this.appPage.currPoint.r)) ? "green" : "red";
        this.context.beginPath();
        this.context.arc(coords.x, coords.y, this.cell.w / 6.0, 0, 2 * Math.PI);
        this.context.fill();
      }
    }
  }

  draw(): void {
    this.clear();
    this.drawArea();
    this.drawGrid();
    this.drawPoints();
  }

  windowToCanvas(_x: number, _y: number): { x: number, y: number } {
    if (!this.canvas) return {x: 0, y: 0};
    let boundingClientRect = this.canvas.getBoundingClientRect();
    return {
      x: _x - boundingClientRect.left * (this.canvas.width / boundingClientRect.width),
      y: _y - boundingClientRect.top * (this.canvas.height / boundingClientRect.height)
    };
  }

  windowToCoords(x: number, y: number): { x: number, y: number } {
    let coords = this.windowToCanvas(x, y);
    return {x: (coords.x - (this.size.w / 2.0)) / (this.cell.w), y: ((this.size.h / 2.0) - coords.y) / (this.cell.h)};
  }

  hit(e: MouseEvent): void {
    let coords = this.windowToCoords(e.clientX, e.clientY);
    this.appPage.currPoint.x = parseFloat(this.appPage.fix(coords.x));
    this.appPage.currPoint.y = parseFloat(this.appPage.fix(coords.y));
    this.http.post("http://localhost:22400/add_point", this.appPage.currPoint, {withCredentials: true}).subscribe({
      next: (data: any) => {
        this.appPage.updatePoints();
        this.draw();
      },
      error: error => {
        console.log(error);
      }
    });
  }
}
