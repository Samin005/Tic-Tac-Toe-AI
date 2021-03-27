import {AfterViewInit, Component, OnInit} from '@angular/core';
import {GameService} from '../game.service';

@Component({
  selector: 'app-typedjs-model-detail',
  templateUrl: './typedjs-model-detail.component.html',
  styleUrls: ['./typedjs-model-detail.component.css']
})
export class TypedjsModelDetailComponent implements OnInit, AfterViewInit {

  constructor(public gameService: GameService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.gameService.updateTypedOptions(false);
  }

}
