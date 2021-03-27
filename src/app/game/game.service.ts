import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import Typed from 'typed.js';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  rootURL = 'http://samin005.pythonanywhere.com/tic-tac-toe-ai/';
  // mode info
  modes = [];
  currentModeIndex = 0;
  modeDetails = [];
  modeDetail = '';
  gameStarted = false;
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
  board = new Array(this.boardSize);
  // game info
  gameStatusText = '';
  isGameOver = false;
  winnerCellIndexes: number[];

  constructor(private http: HttpClient) {
    this.winnerCellIndexes = [];
  }

  initialize(): Observable<any> {
    return this.http.get(this.rootURL + 'init/');
  }

  startGame(body: object): Observable<any> {
    return this.http.post(this.rootURL + 'start-game/', body);
  }

  makeMove(body: object): Observable<any> {
    return this.http.post(this.rootURL + 'make-move/', body);
  }

  resetBoard(): Observable<any> {
    return this.http.get(this.rootURL + 'reset-board/');
  }

  updateBoard(response: any): void {
    this.board = response.board;
    this.gameStatusText = response.gameStatusText;
    this.isGameOver = response.isGameOver;
  }

  updateTypedOptions(distroy: boolean): void {
    if (distroy) {
      this.typed.destroy();
    }
    this.typedOptions.strings = [this.modeDetail];
    this.typed = new Typed('#typedText', this.typedOptions);
    this.typed.start();
  }
}
