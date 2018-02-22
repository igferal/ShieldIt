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
  providers : [DatabaseService]
})
export class GameComponent implements OnInit {
  public room: Observable<Room>;

  public roomId: string;

  constructor(
    public dataBaseService: DatabaseService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get("id");
    if (this.roomId) {
      this.room = this.dataBaseService.findRoom(this.roomId).valueChanges();
      console.log(this.room);
    }
  }
}
