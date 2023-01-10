import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {
  pickCardAnimation = false;
  game : Game;                                // Variable game of type Game from game.ts
  currentCard : string = '';

  constructor(public dialog: MatDialog) {

  }


  // ngOnit will be called once the Angular-App has finished loading
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
      console.log('New drawn card is ', this.currentCard);
      console.log('Game is ', this.game);

      this.game.currentPlayer++;
      // Zeile 44 verhindert, dass this.game.currentPlayer größer als this.game.players.length wird
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;


      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        console.log('this.game.playedCards: ', this.game.playedCards);
        this.pickCardAnimation = false;
      }, 1000);
    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name : string) => {
      console.log('The dialog was closed', name);
      if( name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}
