export class Game {
    public players : string[] = [];     // oeffentliche Variable, in das nur Array von strings rein duerfen
    public stack : string[] = [];
    public playedCards : string[] = [];
    public CurrentPlayer : number = 0;
}