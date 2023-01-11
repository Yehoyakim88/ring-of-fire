import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {

  constructor(private firestore: AngularFirestore, private router: Router) {
    console.log('constructor of StartComponent called!');
  }


  // newGame() is called when user clicks on the image of the StartScreenComponent
  newGame() {
    // Start game
    let game = new Game();


    this
      .firestore
      .collection('games')
      .add(game.toJSON())
      .then((gameInfo: any) => {
        // console.log('gameInfo: ', gameInfo);
        console.log('New Game ID: ', gameInfo.id);
        this.router.navigateByUrl('/game/' + gameInfo.id);  // add a new Game with a unique ID
      });
    
  }

}
