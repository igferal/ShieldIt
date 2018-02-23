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

  private roomDoc: AngularFirestoreDocument<Room>;

  public roomId: string;

  constructor(
    public dataBaseService: DatabaseService,
    public route: ActivatedRoute
  ) {}

  public shieldGame(game: Game) {
    game.shielded = true;
    game.killed = false;
    this.roomDoc.update(this.room);
  }

  public killGame(game: Game) {
    game.killed = true;
    game.shielded = false;
    this.roomDoc.update(this.room);
  }

  ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get("id");
    if (this.roomId) {
      this.roomDoc = this.dataBaseService.findRoom(this.roomId);
      this.roomDoc.valueChanges().subscribe(room => (this.room = room),
    err => console.log("There was an error");
    );
    }
  }
}
