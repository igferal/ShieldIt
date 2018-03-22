import { CopyDialog } from './dialog/copy.dialog';
import { Prefab } from "./../../model/prefab";
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
  public name: string = "Mi sala";
  public games: Game[] = [];
  public prefabs: Prefab[];
  public separatorKeysCodes = [ENTER, COMMA];
  public visible: boolean = true;
  public selectable: boolean = true;
  public removable: boolean = true;
  public addOnBlur: boolean = true;
  public currentPrefab: string = "Ninguno";

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

  public openDialog(id: string): void {
    let dialogRef = this.dialog.open(CopyDialog, {
      autoFocus: true,
      data: { id: id,
          goto : true
      },
      width: "300px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.router.navigate(["findRoom", result]);
      }
    });
  }

  public add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    if ((value || "").trim()) {
      this.games.push(Object.assign({}, new Game(value.trim(), false, false)));
    }

    if (input) {
      input.value = "";
    }
  }

  public loadPrefab(prefab: Prefab) {
    if (this.name === "Mi sala") {
      this.name = prefab.name;
    }

    this.games = [];
    prefab.names.sort().forEach(name => {
      this.games.push(Object.assign({}, new Game(name, false, false)));
    });
  }

  public clearGames() {
    this.games = [];
  }
  public remove(game: any): void {
    let index = this.games.indexOf(game);

    if (index >= 0) {
      this.games.splice(index, 1);
    }
  }

  ngOnInit() {


    this.databaseService
      .getPrefabs()
      .subscribe(prefabs => {
        this.prefabs = prefabs;
      });
  }
}

