import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import Typed from 'typed.js';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  rootURL = 'http://127.0.0.1:8000/tic-tac-toe-ai/';
  // rootURL = 'http://samin005.pythonanywhere.com/tic-tac-toe-ai/';
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
    return this.http.get(this.rootURL + 'init/');
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

  updateTypedOptions(distroy: boolean): void {
    if (distroy) {
      this.typed.destroy();
    }
    this.typedOptions.strings = [this.modeDetail];
    this.typed = new Typed('#typedText', this.typedOptions);
    this.typed.start();
  }
}
