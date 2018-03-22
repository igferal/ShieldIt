import { CopyDialog } from './../create.room.component/dialog/copy.dialog';
import { slideLeft, slideRight } from "./../../animations/card.swipe";
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
import { trigger, keyframes, animate, transition } from "@angular/animations";
import * as cardSwipe from "../../animations/card.swipe";
import { LogDialog } from './logDialog/log.dialog';

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.css"],
  providers: [DatabaseService],
  animations: [
    trigger("cardAnimator", [
      transition(
        "* => swipeLeft",
        animate(500, keyframes(cardSwipe.slideLeft))
      ),
      transition(
        "* => swipeRight",
        animate(500, keyframes(cardSwipe.slideRight))
      )
    ])
  ]
})
export class GameComponent implements OnInit {
  public room: Room;

  public player: string;

  public roomId: string;

  public hasShielded: boolean;

  private roomDoc: AngularFirestoreDocument<Room>;

  public animationState: string;

  constructor(
    public dataBaseService: DatabaseService,
    public route: ActivatedRoute,
    public notifierService: NotifierService,
    public dialog: MatDialog
  ) {}

  public startAnimation(state: string, game: Game) {
    if (!this.animationState) {
      game.animation = state;
    }
  }

  public resetAnimationState() {
    this.animationState = "";
  }

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
      this.startAnimation("swipeLeft", game);
      setTimeout(() => {
        game.shielded = true;
        game.killed = false;
        game.animation = 'inative';
        this.room.log.push(`${game.name} shielded by ${this.player}`);
        localStorage.setItem(this.roomId + "shielded", "yes");
        this.hasShielded = true;
        this.room.killCount--;
        this.resetAnimationState();
        this.roomDoc.update(this.room);
      }, 500);
    } else {
      this.notifierService.notify("error", "Ya has gastado tu escudo");
    }
  }

  public killGame(game: Game, event: Event) {
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
      this.startAnimation("swipeRight", game);
      setTimeout(() => {
        game.animation = 'inative';
        this.room.killCount++;
        game.shielded = false;
        this.room.log.push(
          `${this.room.game.length - this.room.killCount}-${
            game.name
          } eliminated by ${this.player}`
        );
        game.killed = true;
        this.changePlayer();
        this.resetAnimationState();
        this.roomDoc.update(this.room);
      }, 500);
    }
  }

  public showCode(): void {
    let dialogRef = this.dialog.open(CopyDialog, {
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
    this.room.killCount = 0;
    localStorage.removeItem(this.roomId + "shielded");
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
    localStorage.setItem("lastroom", `${this.roomId}/${this.player}`);

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

