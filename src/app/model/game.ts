export class Game {
  constructor(
    public name: string,
    public killed: boolean,
    public shielded: boolean,
    public animation = 'inactive'
  ) {}
}
