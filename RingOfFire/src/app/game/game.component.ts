import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  game : Game;
  currentCard : string = '';

  constructor() {

  }


  // ngOnit wird einmalig aufgerufen, sobald die Angular-App geladen wurde
  ngOnInit(): void {
    this.newGame();
  }


  newGame() {
    this.game = new Game();
    console.log('this.game ', this.game);
  }


  takeCard() {
    if(!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      
      this.pickCardAnimation = true;
      // this.game.playedCards.push(this.currentCard);
      console.log('New drawn card is ', this.currentCard);
      console.log(this.game);


      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000);
    }
  }
}
