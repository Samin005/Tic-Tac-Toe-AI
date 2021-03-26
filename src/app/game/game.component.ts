import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  gameStarted: boolean;

  constructor() {
    this.gameStarted = false;
  }

  ngOnInit(): void {
  }

  startGame(): void {
    this.gameStarted = true;
  }

  quitGame(): void {
    this.gameStarted = false;
  }
}
