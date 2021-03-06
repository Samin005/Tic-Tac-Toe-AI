import {Component, OnInit} from '@angular/core';
import {GameService} from './game.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(public gameService: GameService) {
  }

  ngOnInit(): void {
    if (!this.gameService.gameStarted && !this.gameService.alreadyInitialized) {
      Swal.fire({title: 'Getting things ready...'}).finally();
      Swal.showLoading();
      this.gameService.initialize().subscribe(response => {
        this.gameService.modes = Object.keys(response.modes) as any;
        this.gameService.modeDetails = Object.values(response.modes);
        this.gameService.modeDetail = this.gameService.modeDetails[0];
        this.gameService.updateTypedOptions(true);
        this.gameService.alreadyInitialized = true;
        if (Swal.isVisible()) {
          Swal.close();
        }
      }, error => {
        this.gameService.showInternetError(error).then(() => {
          this.ngOnInit();
        });
      });
    }
  }

  displayModeDetails(option: any): void {
    this.gameService.playButtonTapSound();
    this.gameService.currentModeIndex = option.value;
    this.gameService.modeDetail = this.gameService.modeDetails[this.gameService.currentModeIndex];
    this.gameService.updateTypedOptions(true);
  }

  startGame(): void {
    this.gameService.playButtonTapSound();
    this.gameService.winnerCellIndexes = [];
    this.gameService.clearBoard({
      current_mode_index: this.gameService.currentModeIndex
    }).subscribe(response => {
      this.gameService.updateBoard(response);
      this.gameService.gameStarted = true;
    }, error => {
      this.gameService.showInternetError(error).then(() => this.startGame());
    });
  }

  quitGame(): void {
    this.gameService.playButtonTapSound();
    this.gameService.gameStarted = false;
  }
}
