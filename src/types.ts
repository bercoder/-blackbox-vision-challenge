export interface IQuestion {
  category: string;
  type: 'multiple' | 'boolean';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  correct_answer: string;
  incorrect_answers: Array<string>;
}

export type Status = 'LOADING' | 'INITIAL' | 'PLAYING' | 'FINISHED' | 'ERROR';
