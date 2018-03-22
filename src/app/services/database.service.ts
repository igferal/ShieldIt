import { Prefab } from "./../model/prefab";
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

  public findRoom(id: string) {
    return this.db.doc<Room>(`rooms/${id}`);
  }

  public getPrefabs() {
    return this.db.collection<Prefab>("prefabs").valueChanges();
  }

  public buildPrefab() {
    this.db
      .collection<Prefab>("prefabs")
      .add(
        Object.assign(
          {},
          new Prefab("Games to come", [
            "God of War",
            "Red Dead Redemption II",
            "Call of Duty Black Ops IIII",
            "Fifa 19",
            "Battlefiend ",
            "Minit",
            "Mario Tennis Aces",
            "Smash 2018",
            "Detroit : Become Human",
            "The last of us II",
            "Days Gone",
            "Spiderman Insomniac",
            "Below",
            "KRZ episode 5",
            "Crackdown III",
            "Anthem",
            "Forza Horizon IV"



          ])
        )
      );
  }

  public addPlayerToRoom(idRoom: string, playerName: string) {
    let room = this.db.doc<Room>(`rooms/${idRoom}`).valueChanges();
    let suscription = room.subscribe(room => {
      if (!room.players.includes(playerName)) {
        console.log("Usario introducido");
        room.players.push(playerName);
        this.db.doc<Room>(`rooms/${idRoom}`).update(room);
        suscription.unsubscribe();
      }
    });
  }
}
