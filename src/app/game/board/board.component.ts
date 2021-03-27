import {Component, OnInit} from '@angular/core';
import {GameService} from '../game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor(public gameService: GameService) {
  }

  ngOnInit(): void {
  }

  btnClick(btnID: number): void {
    // const btn = document.getElementById('' + btnID) as HTMLElement;
    // console.log(btnID);
    // btn.textContent = 'X';
    this.gameService.makeMove({
      move_index: btnID
    }).subscribe(response => {
      this.gameService.updateBoard(response);
      if (this.gameService.isGameOver && this.gameService.gameStatusText !== 'Game tied!') {
        this.gameService.winnerCellIndexes = response.winnerCellIndexes;
        console.log(this.gameService.gameStatusText);
      }
    });
  }

  resetBoard(): void {
    this.gameService.winnerCellIndexes = [];
    this.gameService.resetBoard().subscribe(response => {
      this.gameService.updateBoard(response);
    });
    // this.gameService.board = new Array(this.gameService.boardSize);
  }
}
