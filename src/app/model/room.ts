import { Game } from "./game";
export class Room {
  constructor(
    public name: string,
    public players: string[],
    public game: Game[],
    ref ?
  ) {}
}
