import { Component, OnInit } from '@angular/core';
import { QuizzService } from '../../services/quizz.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private quizzService: QuizzService) { }

  ngOnInit(): void {
  }

  loadQuizz(filename: string) {
    this.quizzService.loadQuizz(filename);
  }

}