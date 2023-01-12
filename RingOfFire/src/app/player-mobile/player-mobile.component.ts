import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player-mobile',
  templateUrl: './player-mobile.component.html',
  styleUrls: ['./player-mobile.component.scss']
})
export class PlayerMobileComponent {

  // input variables 'name' and 'playerActive' 
  // that can be used in player-mobile.component.html
  @Input() name;
  @Input() image = '1.webp';
  @Input() playerActive : boolean = false;

}
