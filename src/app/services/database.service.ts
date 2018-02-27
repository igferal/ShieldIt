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
          new Prefab("Pokemon videogames", [
            "Pokemon Verde/Rojo/Amarillo",
            "Pokemon Oro/Plata/Cristal",
            "Pokemon Rubi/Zafiro/Esmeralda",
            "Pokemon Diamante,Perla Platino",
            "Pokemon Blanco/ Negro",
            "Pokemon Blanco 2 / Negro 2",
            "Pokemon X / Y",
            "Pokemon Sol/Luna/UltraSol/Ultraluna",
            "Pokemon Stadium/ Stadium2",
            "Pokemon Battle Revolution",
            "Pokemon XD",
            "Pokemon Coloseum"
          ])
        )
      );
  }

  public addPlayerToRoom(idRoom: string, playerName: string) {
    let room = this.db.doc<Room>(`rooms/${idRoom}`).valueChanges();
    let suscription = room.subscribe(room => {
      if (!room.players.includes(playerName)) {
        room.players.push(playerName);
        this.db.doc<Room>(`rooms/${idRoom}`).update(room);
        suscription.unsubscribe();
      }
    });
  }
}
