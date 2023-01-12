import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {
  // pickCardAnimation = false; // cut out and moved to
  // currentCard : string = ''; // cut out and moved to
  game : Game;                                // Variable game of type Game from game.ts
  gameId: string;
  

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, 
    public dialog: MatDialog) {

  }


  // ngOnit will be called once the Angular-App has finished loading
  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((parameters) => {
      console.log('this.route.params: ', parameters['id']);
      this.gameId = parameters['id'];
      
      this
      .firestore
      .collection('games')
      .doc(this.gameId)                     // from collection get specific document with given id
      .valueChanges()
      .subscribe((game:any) => {            // 'any' so that no error is thrown
        console.log('Game update ', game);
        // update from database
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.stack = game.stack;
        this.game.pickCardAnimation = game.pickCardAnimation;
        this.game.currentCard = game.currentCard;
      });
    });
  }


  newGame() {
    this.game = new Game();
    console.log('this.game ', this.game);
  }


  takeCard() {
    if(!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop();
      
      this.game.pickCardAnimation = true;
      console.log('New drawn card is ', this.game.currentCard);
      console.log('Game is ', this.game);
      this.saveGame();

      this.game.currentPlayer++;
      // Zeile 44 verhindert, dass this.game.currentPlayer größer als this.game.players.length wird
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;


      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        console.log('this.game.playedCards: ', this.game.playedCards);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000);
    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name : string) => {
      console.log('The dialog was closed', name);
      if( name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }


  saveGame(){
    this
      .firestore
      .collection('games')
      .doc(this.gameId)
      .update(this.game.toJSON());   
  }
}
