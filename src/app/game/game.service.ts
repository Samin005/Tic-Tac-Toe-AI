import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

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

  constructor(private http: HttpClient) {
  }

  initialize(): Observable<any> {
    return this.http.get(this.rootURL + 'init/');
  }
}
