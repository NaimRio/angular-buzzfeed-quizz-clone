import { Component, OnInit, Renderer2 } from '@angular/core';
import { shuffle } from "lodash";
import { QuizzService } from '../../services/quizz.service';
// import quizz_questions from "../../../assets/data/quizz_questions.json";
import quizz_questions from "../../../assets/data/quizz_famoso.json";
import { Type } from '@angular/compiler';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})

export class QuizzComponent implements OnInit {

  title: string = ""

  questions: any
  questionSelected: any

  answers: string[] = []
  answerSelected: any = { msg: '', img: '' }

  questionIndex: number = 0
  questionMaxIndex: number = 0

  questionResults: object = {}

  finished: boolean = false


  reloadComponent: boolean = true
  // foto_resultado: string = ""

  constructor(private renderer: Renderer2, private quizzService: QuizzService) { }

  loadQuizz(filename: string) {
    // this.resetarPagina(); 

    import(`../../../assets/data/${filename}`)
      .then((quizz) => {
        this.setupQuizz(quizz.default);
      })
      .catch((error) => {
        console.error(`Erro ao carregar o arquivo JSON: ${error}`);
      });
  }

  setupQuizz(quizz: any) {
    if (quizz) {
      this.finished = false;
      this.title = quizz.title;
      this.questions = shuffle(quizz.questions);
      this.questionSelected = this.questions[this.questionIndex];
      this.questions.forEach((question: any) => {
        question.options = this.shuffleArray(question.options);
      });
      this.questionResults = quizz.results
      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
    }
  }

  resetarPagina() {
    this.renderer.setProperty(window, 'location.href', '/');
    window.location.reload();
  }

  ngOnInit(): void {
    this.quizzService.quizzSelected.subscribe((filename: string) => {
      this.loadQuizz(filename);
    });

    if (quizz_questions) {
      this.finished = false
      this.title = quizz_questions.title

      this.questions = shuffle(quizz_questions.questions);
      // this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questions.forEach((question: any) => {
        question.options = this.shuffleArray(question.options);
      });
      this.questionResults = quizz_questions.results
      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length

      // console.log(this.questionIndex)
      // console.log(this.questionMaxIndex)
    }

  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  playerChoose(value: string) {
    this.answers.push(value)
    this.nextStep()

  }

  async nextStep() {
    this.questionIndex += 1

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    } else {
      const finalAnswer: string = await this.checkResult(this.answers)
      this.finished = true

      this.answerSelected = this.questionResults[finalAnswer as keyof typeof this.questionResults]
      // this.foto_resultado = this.questionResults[finalAnswer as keyof typeof this.questionResults].img
      // this.foto_resultado = this.questionResults.[finalAnswer as keyof typeof this.questionResults].img
    }
  }

  async checkResult(anwsers: string[]) {

    const result = anwsers.reduce((previous, current, i, arr) => {
      if (
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length
      ) {
        return previous
      } else {
        return current
      }
    })

    return result
  }


}
