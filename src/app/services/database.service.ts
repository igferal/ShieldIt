import { Room } from "./../model/room";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { rootRenderNodes } from "@angular/core/src/view";

@Injectable()
export class DatabaseService {
  constructor(private db: AngularFirestore) {}

  public insertRoom(room: Room) {
    return this.db.collection<Room>("rooms").add(Object.assign({}, room));
  }

  public getRoom(id: string) {
    return this.db.collection("rooms").valueChanges();
  }
}
