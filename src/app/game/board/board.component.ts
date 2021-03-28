import {Component, OnInit} from '@angular/core';
import {GameService} from '../game.service';
import Swal from 'sweetalert2';

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
      move_index: btnID,
      board: this.gameService.board,
      current_player: this.gameService.currentPlayer,
      current_mode_index: this.gameService.currentModeIndex,
      is_game_over: this.gameService.isGameOver,
      game_status_text: this.gameService.gameStatusText,
      winner_cell_indexes: this.gameService.winnerCellIndexes
    }).subscribe(response => {
      this.gameService.updateBoard(response);
      if (this.gameService.isGameOver && this.gameService.gameStatusText !== 'Game tied!') {
        this.gameService.winnerCellIndexes = response.winnerCellIndexes;
      }
    }, error => {
      Swal.fire({
        icon: 'error',
        title: error.status,
        text: error.statusText
      }).finally();
    });
  }

  resetBoard(): void {
    this.gameService.winnerCellIndexes = [];
    this.gameService.clearBoard({
      current_mode_index: this.gameService.currentModeIndex
    }).subscribe(response => {
      this.gameService.updateBoard(response);
    }, error => {
      Swal.fire({
        icon: 'error',
        title: error.status,
        text: error.statusText
      }).finally();
    });
  }
}
