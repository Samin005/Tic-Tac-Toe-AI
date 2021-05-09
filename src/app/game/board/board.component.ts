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

  btnClick(btnID: number, showLoading: boolean): void {
    // const btn = document.getElementById('' + btnID) as HTMLElement;
    // console.log(btnID);
    // btn.textContent = 'X';
    if (showLoading){
      Swal.fire({title: 'Retrying...'}).finally();
      Swal.showLoading();
    }
    this.gameService.playButtonTapSound();
    this.gameService.makeMove({
      move_index: btnID,
      board: this.gameService.board,
      current_player: this.gameService.currentPlayer,
      current_mode_index: this.gameService.currentModeIndex,
      is_game_over: this.gameService.isGameOver,
      game_status_text: this.gameService.gameStatusText,
      winner_cell_indexes: this.gameService.winnerCellIndexes
    }).subscribe(response => {
      if (Swal.isVisible()) {
        Swal.close();
      }
      this.gameService.updateBoard(response);
      if (this.gameService.isGameOver && this.gameService.gameStatusText !== 'Game tied!') {
        this.gameService.winnerCellIndexes = response.winnerCellIndexes;
        this.gameService.playGameWonSound();
      }
    }, error => {
      this.gameService.showInternetError(error).then(() => {
        this.btnClick(btnID, true);
      });
    });
  }

  resetBoard(): void {
    this.gameService.playButtonTapSound();
    this.gameService.winnerCellIndexes = [];
    this.gameService.clearBoard({
      current_mode_index: this.gameService.currentModeIndex
    }).subscribe(response => {
      this.gameService.updateBoard(response);
    }, error => {
      this.gameService.showInternetError(error).then(() => this.resetBoard());
    });
  }
}
