import { Router } from "@angular/router";
import { DatabaseService } from "./../../services/database.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  animations: []
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  public isALastGameAvailable() {
    return localStorage.getItem("lastroom");
  }

  public loadLastGame() {
    let previous = localStorage.getItem("lastroom");

    if (previous) {
      this.router.navigateByUrl(`game/${previous}`);
    }
  }


  ngOnInit() {}
}
