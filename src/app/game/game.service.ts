import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import Typed from 'typed.js';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  rootURL = 'http://127.0.0.1:8000/tic-tac-toe-ai/';
  modes = [];
  selectedModeIndex = 0;
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

  constructor(private http: HttpClient) {
  }

  initialize(): Observable<any> {
    return this.http.get(this.rootURL + 'init/');
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
