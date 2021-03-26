import {Component, OnInit} from '@angular/core';
import {GameService} from './game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(public gameService: GameService) {
  }

  ngOnInit(): void {
    this.gameService.initialize().subscribe(response => {
      this.gameService.modes = Object.keys(response.modes) as any;
      this.gameService.modeDetails = Object.values(response.modes);
      this.gameService.modeDetail = this.gameService.modeDetails[0];
    });
  }

  displayModeDetails(option: any): void {
    this.gameService.selectedModeIndex = option.value;
    this.gameService.modeDetail = this.gameService.modeDetails[this.gameService.selectedModeIndex];
  }

  startGame(): void {
    this.gameService.gameStarted = true;
  }

  quitGame(): void {
    this.gameService.gameStarted = false;
  }
}
