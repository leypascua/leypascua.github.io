export type QuestionType = 'multiple-choice' | 'numeric' | 'text' | 'markdown';

export interface Choice {
  value: string;
  text: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  required: boolean;
  choices?: Choice[];
  allowMultiple?: boolean;
  minValue?: number;
  maxValue?: number;
}

export interface Page {
  id: string;
  title: string;
  content?: string;
  questions: Question[];
  layout?: 'side-by-side' | 'stacked';
  submit?: boolean;
  submitRemarks?: string;
}

export interface Answer {
  questionId: string;
  value: string | string[] | number;
}