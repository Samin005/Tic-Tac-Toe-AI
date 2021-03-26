import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  boardSize = 9;
  board = new Array(this.boardSize);

  constructor() {
  }

  ngOnInit(): void {
  }

  btnClick(btnID: number): void {
    // const btn = document.getElementById('' + btnID) as HTMLElement;
    // console.log(btnID);
    // btn.textContent = 'X';
    this.board[btnID] = 'X';
  }

  resetBoard(): void {
    this.board = new Array(this.boardSize);
  }
}
