import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import Typed from 'typed.js';
import {retry} from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  // rootURL = 'http://127.0.0.1:8000/tic-tac-toe-ai/';
  rootURL = 'http://samin005.pythonanywhere.com/tic-tac-toe-ai/';
  // mode info
  modes = [];
  currentModeIndex = 0;
  modeDetails = [];
  modeDetail = '';
  gameStarted = false;
  alreadyInitialized = false;
  typedOptions = {
    strings: [this.modeDetail],
    typeSpeed: 15,
    showCursor: true,
    cursorChar: '_',
    loop: false
  };
  typed!: any;
  // board info
  boardSize = 9;
  // game info
  board = new Array(this.boardSize);
  currentPlayer = '';
  gameStatusText = '';
  isGameOver = false;
  winnerCellIndexes: number[];

  constructor(private http: HttpClient) {
    this.winnerCellIndexes = [];
  }

  initialize(): Observable<any> {
    return this.http.get(this.rootURL + 'init/')
      .pipe(
        retry(3)
      );
  }

  clearBoard(body: object): Observable<any> {
    return this.http.post(this.rootURL + 'clear-board/', body);
  }

  makeMove(body: object): Observable<any> {
    return this.http.post(this.rootURL + 'make-move/', body);
  }

  updateBoard(response: any): void {
    this.board = response.board;
    this.currentPlayer = response.currentPlayer;
    this.gameStatusText = response.gameStatusText;
    this.isGameOver = response.isGameOver;
  }

  updateTypedOptions(destroy: boolean): void {
    if (destroy) {
      this.typed.destroy();
    }
    this.typedOptions.strings = [this.modeDetail];
    this.typed = new Typed('#typedText', this.typedOptions);
    this.typed.start();
  }

  showInternetError(error: any): Promise<any> {
    return Swal.fire({
      icon: 'error',
      title: error.statusText,
      text: 'Are you connected to the internet?',
      confirmButtonText: '<i class="fas fa-sync-alt"></i> Retry'
    });
  }

  fetchLeaderboard(): Observable<any> {
    return this.http.get(this.rootURL + 'leaderboard/');
  }

  playButtonTapSound(): void {
    const sound = document.getElementById('button-tap-sound') as any;
    sound.play();
  }

  playGameWonSound(): void {
    const sound = document.getElementById('game-won-sound') as any;
    sound.play();
  }
}
