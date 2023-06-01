import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {

  quizzSelected = new EventEmitter<string>();

  constructor() { }

  loadQuizz(filename: string) {
    this.quizzSelected.emit(filename);
  }
}