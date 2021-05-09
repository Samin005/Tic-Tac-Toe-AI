import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {GameService} from '../game/game.service';
import {SocialAuthService} from 'angularx-social-login';
import {Observable, throwError} from 'rxjs';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  leaderboard$: Observable<any>;
  public errorObject = null;

  constructor(private router: Router,
              public socialAuthService: SocialAuthService,
              public authService: AuthService,
              private gameService: GameService) {
    this.leaderboard$ = new Observable<any>();
    this.loadLeaderboard();
  }

  ngOnInit(): void {
  }

  loadLeaderboard(): void {
    this.leaderboard$ = this.gameService.fetchLeaderboard()
      .pipe(catchError(error => {
        this.errorObject = error;
        return throwError(error);
      }));
  }

  navigateToGame(): void {
    this.gameService.playButtonTapSound();
    this.router.navigate(['']).catch(error => console.log(error));
  }
}
