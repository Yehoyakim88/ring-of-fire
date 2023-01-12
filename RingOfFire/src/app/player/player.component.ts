import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {

  // input variables 'name' and 'playerActive' 
  // that can be used in player.component.html
  @Input() name;
  @Input() playerActive : boolean = false;
  @Input() image = '1.webp';
}
