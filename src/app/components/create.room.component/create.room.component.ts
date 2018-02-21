import { Game } from "./../../model/game";
import { Room } from "./../../model/room";
import { DatabaseService } from "./../../services/database.service";
import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NotifierService } from "angular-notifier";

@Component({
  selector: "createGame",
  templateUrl: "./create.room.component.html",
  styleUrls: ["./create.room.component.css"],
  providers: [DatabaseService]
})
export class CreateRoomComponent implements OnInit {
  public name: string;

  public games: string;

  constructor(
    public databaseService: DatabaseService,
    public dialog: MatDialog,
    public notifierService: NotifierService
  ) {}

  public newGame() {
    let room = this.createRoom();
    this.databaseService.insertRoom(room).then(res => this.openDialog(res.id));
  }

  private createRoom(): Room {
    let gamesArray = [];
    this.games.split(",").forEach(game => {
      gamesArray.push(Object.assign({}, new Game(game, false, false)));
    });
    return new Room(this.name, [], gamesArray);
  }

  openDialog(id: string): void {
    let dialogRef = this.dialog.open(Dialog, {
      autoFocus: true,
      data: { id: id },
      width: "300px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }

  ngOnInit() {
    this.databaseService.getRoom("rooms").subscribe(res => {
      console.log(res);
    });
  }
}

@Component({
  selector: "dialog-id",
  templateUrl: "./dialog/dialog.html",
  styleUrls: ["./dialog/dialog.css"]
})
export class Dialog {
  constructor(
    public notifierService: NotifierService,
    public dialogRef: MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  copied() {
    this.notifierService.notify("success", "Texto copiado");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
