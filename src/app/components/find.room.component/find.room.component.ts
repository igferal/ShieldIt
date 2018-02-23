import { Game } from "./../../model/game";
import { Room } from "./../../model/room";
import { DatabaseService } from "./../../services/database.service";
import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NotifierService } from "angular-notifier";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "findRoom",
  templateUrl: "./find.room.component.html",
  styleUrls: ["./find.room.component.css"],
  providers : [DatabaseService]
})
export class FindRoomComponent implements OnInit {
  public name: string;

  public roomId: string;

  constructor(
    public notifierService: NotifierService,
    public activeRoute: ActivatedRoute,
    public router: Router,
    public databaseService: DatabaseService
  ) {}

  public findRoom() {
    if (this.name === null || this.roomId === null) {
      this.notifierService.notify("error", "Introduce los datos necesarios");
    }else{
         this.databaseService.addPlayerToRoom(this.roomId, this.name);
         this.router.navigate(["game", this.roomId]);
    }
 
  }

  public ngOnInit() {
    this.roomId = this.activeRoute.snapshot.paramMap.get("id");
  }
}
