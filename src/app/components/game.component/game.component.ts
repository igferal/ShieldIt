import { NotifierService } from "angular-notifier";
import { Game } from "./../../model/game";
import { ActivatedRoute } from "@angular/router";
import { DatabaseService } from "./../../services/database.service";
import { Component, OnInit } from "@angular/core";
import { AngularFirestoreDocument } from "angularfire2/firestore";
import { Room } from "../../model/room";
import { Observable } from "rxjs/Observable";

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

  public hasShielded: boolean = false;

  private roomDoc: AngularFirestoreDocument<Room>;

  constructor(
    public dataBaseService: DatabaseService,
    public route: ActivatedRoute,
    public notifierService: NotifierService
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
      this.roomDoc.update(this.room);
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
      this.changePlayer();
      this.roomDoc.update(this.room);
    }
  }

  public cleanRoom() {
    this.room.game.forEach(game => {
      game.killed = false;
      game.shielded = false;
    });
    this.roomDoc.update(this.room);
  }

  private changePlayer() {
    let player = this.room.players.shift();
    this.room.players.push(player);
  }

  private checkValidPlayer() {}

  ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get("id");
    this.player = this.route.snapshot.paramMap.get("user");

    if (this.roomId) {
      this.roomDoc = this.dataBaseService.findRoom(this.roomId);
      this.roomDoc.valueChanges().subscribe(
        room => {
          this.room = room;
          if (this.player === "clinrum") {
            this.cleanRoom();
          }
        },
        err => console.log("There was an error")
      );
    }
  }
}
