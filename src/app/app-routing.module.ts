import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GameComponent} from './game/game.component';
import {LeaderboardComponent} from './leaderboard/leaderboard.component';

const routes: Routes = [
  {path: '', component: GameComponent},
  {path: 'leaderboard', component: LeaderboardComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
