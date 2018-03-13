import { Dialog } from "./../create.room.component/create.room.component";
import { NotifierService } from "angular-notifier";
import { Game } from "./../../model/game";
import { ActivatedRoute } from "@angular/router";
import { DatabaseService } from "./../../services/database.service";
import { Component, OnInit, Inject } from "@angular/core";
import { AngularFirestoreDocument } from "angularfire2/firestore";
import { Room } from "../../model/room";
import { Observable } from "rxjs/Observable";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialog } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.css"],
  providers: [DatabaseService]
})
export class GameComponent implements OnInit {
  public room: Room;

  public player: string;

  public roomId: string;

  public hasShielded: boolean;

  private roomDoc: AngularFirestoreDocument<Room>;

  constructor(
    public dataBaseService: DatabaseService,
    public route: ActivatedRoute,
    public notifierService: NotifierService,
    public dialog: MatDialog
  ) {}

  public shieldGame(game: Game) {
    if (game.shielded) {
      this.notifierService.notify("error", "Ese juego ya tiene un escudo");
      return;
    }

    if (!game.killed) {
      this.notifierService.notify(
        "error",
        "No puedes poner un escudo a un juego vivo"
      );
      return;
    }

    if (!this.hasShielded) {
      game.shielded = true;
      game.killed = false;
      this.room.log.push(`${game.name} shielded by ${this.player}`);
      this.roomDoc.update(this.room);
      localStorage.setItem(this.roomId + "shielded","yes");
      this.hasShielded = true;
    } else {
      this.notifierService.notify("error", "Ya has gastado tu escudo");
    }
  }

  public killGame(game: Game) {
    if (!this.room.players.includes(this.player)) {
      this.notifierService.notify("error", "Usuario inválido");
      return;
    } else if (this.player !== this.room.players[0]) {
      this.notifierService.notify("error", "No es tu turno");
      return;
    } else if (game.killed) {
      this.notifierService.notify("error", "Ya esta muerto");
      return;
    } else {
      game.killed = true;
      game.shielded = false;
      this.room.log.push(`${game.name} eliminated by ${this.player}`);
      this.changePlayer();
      this.roomDoc.update(this.room);
    }
  }

  public showCode(): void {
    let dialogRef = this.dialog.open(Dialog, {
      autoFocus: true,
      data: {
        id: this.roomId,
        goto: false
      },
      width: "300px",
      height: "180px"
    });
  }

  public cleanRoom() {
    this.room.game.forEach(game => {
      game.killed = false;
      game.shielded = false;
    });
    this.room.log = [];
    this.roomDoc.update(this.room);
  }

  public showLog() {
    let dialogRef = this.dialog.open(LogDialog, {
      autoFocus: true,
      data: {
        log: this.room.log
      },
      width: "400px",
      height: "400px"
    });
  }

  private changePlayer() {
    let player = this.room.players.shift();
    this.room.players.push(player);
  }

  private checkValidPlayer() {}

  ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get("id");
    this.player = this.route.snapshot.paramMap.get("user");

    this.hasShielded = localStorage.getItem(this.roomId + "shielded") === "yes";

    if (this.roomId) {
      this.roomDoc = this.dataBaseService.findRoom(this.roomId);
      this.roomDoc.valueChanges().subscribe(
        room => {
          this.room = room;
        },
        err => console.log("There was an error")
      );
    }
  }
}

@Component({
  selector: "dialog-id",
  templateUrl: "./logDialog/log.dialog.html",
  styleUrls: ["./logDialog/log.dialog.css"]
})
export class LogDialog {
  constructor(
    public notifierService: NotifierService,
    public dialogRef: MatDialogRef<LogDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  copied() {
    this.notifierService.notify("success", "Texto copiado");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
