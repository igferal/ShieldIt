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
          new Prefab("Sagas", [
            "Alone in the dark",
            "Animal Crossing",
            "Annapurna",
            "Assins",
            "Baldurs Gate",
            "Batman",
            "Battlefield",
            "Bayonetta",
            "Beyond good  and Evil",
            "BioShock",
            "Burnout",
            "Call of Duty",
            "Castlevania",
            "Chronicles Trigger",
            "Crash",
            "Crazy Taxi",
            "Cuphead",
            "Danganronpa",
            "Darkest dungeon",
            "Darksiders",
            "Dead or Alive - Volleyball",
            "Desde Ir Alive",
            "Destiny",
            "Deus Ex",
            "Devil May cray",
            "Diablo",
            "Dishonored",
            "Donkey Kong",
            "Doom",
            "Dota",
            "Down if War",
            "Dragón Age",
            "Dragón Ball",
            "Dragón Quest",
            "Dungeon Keeper",
            "Fallout",
            "Fifa",
            "Final Fantasy",
            "Fire Emblem",
            "Forza",
            "GRANTUrismo",
            "Gears",
            "God of War",
            "Golden Sun",
            "Gta",
            "Guitar Hero",
            "Halo",
            "Halt Life",
            "Heartstone",
            "Hellblade",
            "Hitman",
            "Ice Climbers",
            "Imagina ser",
            "Injustice",
            "Jack and Daxter",
            "Jonathan Blow",
            "Katamari",
            "Kid Ikarus",
            "Kingdom Hearts",
            "Kirby",
            "Larry",
            "Last of Us",
            "Legacy of Kane",
            "Legend of héroes",
            "Lemmings",
            "Mario",
            "Mario Kart",
            "Masa Effect",
            "Max Payne",
            "Medievil",
            "MegaMan",
            "Metal Gear",
            "Metro",
            "Minecraft",
            "Monkey Island",
            "Monster Hunter",
            "Mortal Kombat",
            "Narutos",
            "Nba2k",
            "Need for Speed",
            "Ninja Gaiden",
            "Nintendogs",
            "Nioh",
            "Outlast",
            "Overlord",
            "PUBG",
            "Pacman",
            "Pacman",
            "Persona",
            "Pokemon",
            "Portal",
            "Prey",
            "Prince Of Persia",
            "Ratchet",
            "Rayman",
            "Rayman",
            "Read Dead",
            "Resident Evil",
            "Señor Anillos",
            "Shadow Of Mordor",
            "Silent Hill",
            "Sim City",
            "Sims",
            "Skyrim",
            "Smash",
            "Sonic",
            "SoulsBorne",
            "Space Invaders",
            "Splatoon",
            "Splinter cell",
            "Spyro",
            "Starcraft",
            "Street fighter",
            "Super seducer",
            "System Shock",
            "Tales of",
            "Team Ico",
            "Tekken",
            "Tenchu",
            "Tetris",
            "Tomb Raider",
            "Tony Hawk",
            "Torrente",
            "Total War",
            "Turok",
            "Uncharted",
            "Watchdogs",
            "Witcher",
            "Wolfenstein",
            "World of Warcraft",
            "Xenoblade",
            "Yoshi",
            "Zelda"
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
