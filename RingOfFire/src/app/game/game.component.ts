import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

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
  gameOver: boolean = false;
  

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
        this.game.player_images = game.player_images;
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
    if(this.game.stack.length == 0) {
      this.gameOver = true;
    }
    else if(!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;   // prevent this.game.currentPlayer to become bigger than this.game.players.length
      this.saveGame();
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
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
        this.game.player_images.push('1.webp');
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


  editPlayer(playerId : number) {
    console.log('Edit player ', playerId);

    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change : string) => {
      if(change) {
        if(change == 'DELETE') {
          this.game.players.splice(playerId, 1);
          this.game.player_images.splice(playerId, 1);
        }
        else {
          console.log('Received change ', change);
          this.game.player_images[playerId] = change;
        }
        this.saveGame();
      }
    });
  }
}
