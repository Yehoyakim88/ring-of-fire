import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent implements OnInit {

  construtor() {

  }


ngOnInit(): void {
  
}


  name: string = '';


  onNoClick() {

  }
}
