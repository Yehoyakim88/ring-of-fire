export class Game {
    // public players : string[] = ['Hans', 'Peter', 'Freddy'];     
    public players : string[] = [];     // public variable only for Array of type string
    public player_images : string[] = [];
    public stack : string[] = [];
    public playedCards : string[] = [];
    public currentPlayer : number = 0;
    public pickCardAnimation = false;
    public currentCard : string = '';


    constructor() {
        for (let i = 1; i < 14; i++) {
            this.stack.push('spade_' + i);
            this.stack.push('hearts_' + i);
            this.stack.push('clubs_' + i);      // RingOfFire/src/assets/img/cards/clubs_i.png
            this.stack.push('diamonds_' + i);    
        }

        shuffle(this.stack);
    }


    // synchronize members with database via JSON 
    public toJSON() {
        return {
            players: this.players,
            player_images: this.player_images,
            stack: this.stack,
            playedCards: this.playedCards,
            currentPlayer: this.currentPlayer,
            pickCardAnimation: this.pickCardAnimation,
            currentCard: this.currentCard
        };
    }
}


function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }