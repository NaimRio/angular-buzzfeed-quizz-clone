import { Component, OnInit } from '@angular/core';
import { QuizzService } from '../../services/quizz.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {

  constructor(private quizzService: QuizzService) { }

  ngOnInit(): void {
  }

  loadQuizz(filename: string) {
    this.quizzService.loadQuizz(filename);
  }

}