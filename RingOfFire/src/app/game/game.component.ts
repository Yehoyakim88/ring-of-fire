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
  game : Game;
  currentCard : string = '';

  constructor(public dialog: MatDialog) {

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


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name : string) => {
      console.log('The dialog was closed', name);
      this.game.players.push(name);
    });
  }
}
