import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { StartScreenComponent } from './start-screen/start-screen.component';

const routes: Routes = [
  { path: '', component: StartScreenComponent },
  //            : tells the router that a variable follows, in this case 'id'
  { path: 'game/:id', component: GameComponent}   // path must not start with a / !!!
];


// The forRoot() method creates an NgModule that contains all the directives, 
// the given routes, and the Router service itself. [https://angular.io/api/router/RouterModule]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
