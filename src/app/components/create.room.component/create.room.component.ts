import { Router } from "@angular/router";
import { Game } from "./../../model/game";
import { Room } from "./../../model/room";
import { DatabaseService } from "./../../services/database.service";
import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NotifierService } from "angular-notifier";
import { ENTER, COMMA } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";

@Component({
  selector: "createGame",
  templateUrl: "./create.room.component.html",
  styleUrls: ["./create.room.component.css"],
  providers: [DatabaseService]
})
export class CreateRoomComponent implements OnInit {
  public name: string;
  public games: Game[] = [];
  public separatorKeysCodes = [ENTER, COMMA];
  public visible: boolean = true;
  public selectable: boolean = true;
  public removable: boolean = true;
  public addOnBlur: boolean = true;

  constructor(
    public databaseService: DatabaseService,
    public dialog: MatDialog,
    public notifierService: NotifierService,
    public router: Router
  ) {}

  public newGame() {
    let room = this.createRoom();
    this.databaseService.insertRoom(room).then(res => this.openDialog(res.id));
  }

  private createRoom(): Room {
    return new Room(this.name, [], this.games);
  }

  openDialog(id: string): void {
    let dialogRef = this.dialog.open(Dialog, {
      autoFocus: true,
      data: { id: id },
      width: "300px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.router.navigate(["findRoom", result]);
      }
    });
  }

  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    if ((value || "").trim()) {
      this.games.push(Object.assign({}, new Game(value.trim(), false, false)));
    }

    if (input) {
      input.value = "";
    }
  }

  remove(game: any): void {
    let index = this.games.indexOf(game);

    if (index >= 0) {
      this.games.splice(index, 1);
    }
  }

  ngOnInit() {}
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
