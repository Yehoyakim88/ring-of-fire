import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {

  constructor(private router: Router) {
    console.log('constructor of StartComponent called!');
  }


  // newGame() is called when user clicks on the image of the StartScreenComponent
  newGame() {
    // Start game
    // the route '/game' is specified inside app-routing.module.ts line 8 without the / .
    // 
    this.router.navigateByUrl('/game');
  }

}
