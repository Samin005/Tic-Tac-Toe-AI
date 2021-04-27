import {Component, OnInit} from '@angular/core';
import {GameService} from '../game/game.service';
import {Router} from '@angular/router';
import {SocialAuthService} from 'angularx-social-login';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  leaderboard$: Observable<any>;
  constructor(private router: Router,
              public socialAuthService: SocialAuthService,
              public authService: AuthService,
              private gameService: GameService) {
    this.leaderboard$ = this.gameService.fetchLeaderboard();
  }

  ngOnInit(): void {
    // this.socialAuthService.authState.subscribe(user => {
    //   if (user != null){
    //     this.showLeaderboard();
    //   }
    // });
  }

  navigateToGame(): void {
    this.router.navigate(['']).catch(error => console.log(error));
  }

  showLeaderboard(): void {
    this.leaderboard$.subscribe(response => {
      console.log(response);
    });
  }
}
